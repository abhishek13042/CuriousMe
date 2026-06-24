import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getScheduleForDay, getStudyDayNumber, getModuleProgress } from '../lib/aiBatchData';
import { callGroq as groqCall } from '../lib/groq';
import { supabase } from '../lib/supabase';
import { saveMemory, loadMemories, MEMORY_TYPES } from '../lib/globalMemory';

// Adapter: CuriousMe's callGroq takes { messages, ... } and returns { text, error }
const callGroq = async (messages) => {
  const { text, error } = await groqCall({ messages, max_tokens: 4000, temperature: 0.8 });
  if (error) throw new Error(typeof error === 'string' ? error : 'Groq API error');
  return text || '';
};

export const useAiBatchStore = create(
  persist(
    (set, get) => ({
      // { 'YYYY-MM-DD': { S1: bool, S2: bool, S3: bool, S4: bool } }
      completions: {},
      // { 'YYYY-MM-DD': { problems, generatedAt, dayNum, contextUsed } }
      dpps: {},
      isGeneratingDpp: false,
      dppError: null,
      isHydrating: false,

      // ── Supabase hydration (call once on mount) ──────────────────
      hydrateFromSupabase: async () => {
        set({ isHydrating: true });
        try {
          const sixtyDaysAgo = new Date();
          sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
          const cutoff = sixtyDaysAgo.toISOString().split('T')[0];

          const { data: rows } = await supabase
            .from('batch_completions')
            .select('date_str, subject, completed')
            .gte('date_str', cutoff)
            .order('date_str', { ascending: false });

          if (rows?.length) {
            const completions = {};
            for (const row of rows) {
              if (!completions[row.date_str]) completions[row.date_str] = {};
              completions[row.date_str][row.subject] = row.completed;
            }
            set({ completions });
          }

          const { data: dppRows } = await supabase
            .from('batch_dpps')
            .select('date_str, day_num, problems, context_used, generated_at')
            .order('date_str', { ascending: false })
            .limit(30);

          if (dppRows?.length) {
            const dpps = {};
            for (const row of dppRows) {
              dpps[row.date_str] = {
                problems: row.problems,
                generatedAt: row.generated_at,
                dayNum: row.day_num,
                contextUsed: row.context_used,
              };
            }
            set({ dpps });
          }
        } catch (err) {
          console.error('hydrateFromSupabase error:', err);
        } finally {
          set({ isHydrating: false });
        }
      },

      // ── One-time migration from localStorage → Supabase ─────────
      migrateLocalStorageToSupabase: async () => {
        const local = get().completions;
        if (!Object.keys(local).length) return;

        const { data } = await supabase
          .from('batch_completions')
          .select('id')
          .limit(1);
        if (data?.length) return; // already migrated

        const rows = [];
        for (const [dateStr, subjects] of Object.entries(local)) {
          const dayNum = getStudyDayNumber(new Date(dateStr + 'T12:00:00'));
          if (!dayNum) continue;
          const schedule = getScheduleForDay(dayNum);
          for (const subject of ['S1', 'S2', 'S3', 'S4']) {
            rows.push({
              date_str: dateStr,
              day_num: dayNum,
              subject,
              completed: !!subjects[subject],
              lecture_title: schedule?.[subject]?.title ?? null,
              module_name: schedule?.[subject]?.module ?? null,
              lecture_index: dayNum - 1,
              completed_at: subjects[subject]
                ? new Date(dateStr + 'T14:00:00').toISOString()
                : null,
            });
          }
        }

        if (rows.length) {
          await supabase
            .from('batch_completions')
            .upsert(rows, { onConflict: 'date_str,subject' });
        }
      },

      // ── Toggle subject completion for a day ──────────────────────
      toggleCompletion: async (dateStr, subject, dayNum, schedule) => {
        const current = get().completions[dateStr]?.[subject] ?? false;
        const newValue = !current;

        // Optimistic local update (instant UI feedback)
        set(state => ({
          completions: {
            ...state.completions,
            [dateStr]: { ...(state.completions[dateStr] || {}), [subject]: newValue },
          },
        }));

        // Persist to Supabase
        const lectureData = schedule?.[subject];
        await supabase
          .from('batch_completions')
          .upsert({
            date_str: dateStr,
            day_num: dayNum ?? 1,
            subject,
            completed: newValue,
            lecture_title: lectureData?.title ?? null,
            module_name: lectureData?.module ?? null,
            lecture_index: (dayNum ?? 1) - 1,
            completed_at: newValue ? new Date().toISOString() : null,
          }, { onConflict: 'date_str,subject' });

        // Non-blocking: check if a module just got completed (S4 uses steps not modules; S5 handled separately)
        if (newValue && subject !== 'S4' && subject !== 'S5') {
          setTimeout(() => get()._checkAndSaveModuleCompletion(subject), 0);
        }
      },

      // ── Detect module completion and save to jarvis_memory ───────
      _checkAndSaveModuleCompletion: async (subject) => {
        try {
          const { data: rows } = await supabase
            .from('batch_completions')
            .select('day_num')
            .eq('subject', subject)
            .eq('completed', true)
            .order('day_num', { ascending: true });

          if (!rows?.length) return;
          const completedDayNums = rows.map(r => r.day_num);
          const progress = getModuleProgress(subject, completedDayNums);
          if (!progress?.isModuleComplete) return;

          // Avoid duplicate saves
          const existing = await loadMemories(MEMORY_TYPES.AI_TRACK, 50);
          const alreadySaved = existing.some(m =>
            m.content?.includes('Module Complete') &&
            m.content?.includes(progress.currentModule) &&
            m.content?.includes(subject)
          );
          if (alreadySaved) return;

          const subjectName = subject === 'S1' ? 'Generative AI'
            : subject === 'S2' ? 'Deep Learning'
            : 'Software Engineering';

          await saveMemory({
            type: MEMORY_TYPES.AI_TRACK,
            content: `Module Complete — ${subject} (${subjectName}): "${progress.currentModule}" — all ${progress.totalInModule} lectures done`,
            importance: 9,
            source: 'batch_module_complete',
            metadata: {
              subject,
              module: progress.currentModule,
              completedModules: progress.completedModules,
              completedAt: new Date().toISOString(),
            },
          });
        } catch (err) {
          console.error('_checkAndSaveModuleCompletion error:', err);
        }
      },

      // ── Build rich DPP context from Supabase history ─────────────
      _buildDppContext: async (dateStr) => {
        try {
          const dates = [];
          const d = new Date(dateStr + 'T12:00:00');
          for (let i = 0; i < 7; i++) {
            dates.push(d.toISOString().split('T')[0]);
            d.setDate(d.getDate() - 1);
            if (d.getDay() === 0) d.setDate(d.getDate() - 1); // skip Sunday
          }

          const { data: recentRows } = await supabase
            .from('batch_completions')
            .select('date_str, day_num, subject, lecture_title, module_name')
            .in('date_str', dates)
            .eq('completed', true)
            .order('date_str', { ascending: false });

          let recentLectures = '';
          if (recentRows?.length) {
            const byDate = {};
            for (const row of recentRows) {
              if (!byDate[row.date_str]) byDate[row.date_str] = [];
              byDate[row.date_str].push(row);
            }
            recentLectures = Object.entries(byDate)
              .map(([date, rows]) =>
                `${date} (Day ${rows[0]?.day_num}):\n` +
                rows.map(r => `  - [${r.subject}] ${r.module_name}: "${r.lecture_title}"`).join('\n')
              ).join('\n');
          }

          const moduleMemories = await loadMemories(MEMORY_TYPES.AI_TRACK, 10);
          const moduleContext = moduleMemories
            .filter(m => m.content?.includes('Module Complete'))
            .slice(0, 5)
            .map(m => `  - ${m.content}`)
            .join('\n');

          return `=== RECENT STUDY CONTEXT ===
Last 7 study days of completed lectures:
${recentLectures || '  (no recent completions recorded yet)'}

Recently completed modules:
${moduleContext || '  (none yet — keep going!)'}
=== END CONTEXT ===`;
        } catch {
          return '=== RECENT STUDY CONTEXT ===\n(context unavailable)\n=== END CONTEXT ===';
        }
      },

      // ── Generate MIT-level DPPs via Groq ─────────────────────────
      generateDpp: async (dateStr, dayNum) => {
        set({ isGeneratingDpp: true, dppError: null });
        try {
          const schedule = getScheduleForDay(dayNum);
          if (!schedule) throw new Error('No schedule for this day');

          const contextStr = await get()._buildDppContext(dateStr);

          const prompt = `You are designing Daily Practice Problems (DPPs) for Abhishek — an AI engineering student on an intensive 9-month track studying 4 subjects in parallel every Mon–Sat.

${contextStr}

TODAY — Study Day ${dayNum}:
- S1 (Generative AI, 2.5 hrs): "${schedule.S1.title}" [Module: ${schedule.S1.module}]
- S2 (Deep Learning, 2 hrs): "${schedule.S2.title}" [Module: ${schedule.S2.module}]
- S3 (Software Engineering, 1.5 hrs): "${schedule.S3.title}" [Module: ${schedule.S3.module}]
- S4 (DSA, 1 hr): "${schedule.S4.title}" [${schedule.S4.problemRange}]

Generate EXACTLY 10 problems total — 3 for S1, 3 for S2, 2 for S3, 2 for S4.
These are NOT textbook problems. The goal is to develop how Abhishek THINKS.

For S1 and S2 (3 problems each), use these types:
  Q1 — CONCEPT CHECK: A short "why does this work?" question. Requires a precise explanation, not just a definition.
  Q2 — FEYNMAN TRAP: Start from a common misconception. The student must identify the flaw and explain the correct behaviour.
  Q3 — APPLY: A realistic scenario from a startup, research lab, or engineering team. Open-ended, 15–20 min.

For S3 and S4 (2 problems each), use these types:
  Q1 — CONCEPT CHECK: Same as above.
  Q2 — BUILD IT: Requires writing/sketching something concrete (code stub, diagram, data flow). 10–15 min.

At least one problem across all 10 must bridge two subjects — set "bridge" for that problem only.

TONE: Brilliant professor who genuinely wants the student to have an "aha!" moment.

Return ONLY valid JSON (no markdown fences, no text outside the JSON):
{
  "problems": [
    {
      "subject": "S1",
      "subjectName": "Generative AI",
      "qType": "CONCEPT CHECK",
      "title": "Short title (max 8 words)",
      "scenario": "1-2 sentences of context (can be null for Q1).",
      "problem": "The actual question or challenge. 2-4 sentences.",
      "deliverable": "Exactly what to produce — one concrete sentence.",
      "bridge": null,
      "insight": "The key non-obvious thing. One sentence."
    }
  ]
}

For cross-domain problems set "bridge" to one sentence naming the second subject/concept. For all others set "bridge" to null.
Output all 10 problems in order: S1-Q1, S1-Q2, S1-Q3, S2-Q1, S2-Q2, S2-Q3, S3-Q1, S3-Q2, S4-Q1, S4-Q2.`;

          const raw = await callGroq([{ role: 'user', content: prompt }]);

          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          if (!jsonMatch) throw new Error('No valid JSON in response');
          const parsed = JSON.parse(jsonMatch[0]);
          if (!parsed.problems || !Array.isArray(parsed.problems)) {
            throw new Error('Invalid DPP format returned');
          }

          // Persist to Supabase
          await supabase
            .from('batch_dpps')
            .upsert({
              date_str: dateStr,
              day_num: dayNum,
              problems: parsed.problems,
              context_used: contextStr,
              generated_at: new Date().toISOString(),
            }, { onConflict: 'date_str' });

          set(state => ({
            dpps: {
              ...state.dpps,
              [dateStr]: {
                problems: parsed.problems,
                generatedAt: new Date().toISOString(),
                dayNum,
                contextUsed: contextStr,
              },
            },
            isGeneratingDpp: false,
          }));
        } catch (err) {
          set({ isGeneratingDpp: false, dppError: err.message });
        }
      },

      clearDppError: () => set({ dppError: null }),

      getDayCompletions: (dateStr) => {
        const c = get().completions[dateStr] || {};
        return { S1: !!c.S1, S2: !!c.S2, S3: !!c.S3, S4: !!c.S4, S5: !!c.S5 };
      },

      getAllDoneForDay: (dateStr, schedule) => {
        const c = get().completions[dateStr] || {};
        const active = ['S1', 'S2', 'S3', 'S4'].concat(schedule?.S5?.locked === false ? ['S5'] : []);
        return active.every(k => !!c[k]);
      },

      getAnyDoneForDay: (dateStr) => {
        const c = get().completions[dateStr] || {};
        return !!(c.S1 || c.S2 || c.S3 || c.S4 || c.S5);
      },

      getTotalDaysStudied: () => {
        const c = get().completions;
        return Object.values(c).filter(day => day.S1 || day.S2 || day.S3 || day.S4 || day.S5).length;
      },

      getTotalFullDays: () => {
        const c = get().completions;
        return Object.values(c).filter(day => day.S1 && day.S2 && day.S3 && day.S4).length;
      },

      getSubjectProgress: (subject, totalDays) => {
        const c = get().completions;
        const done = Object.values(c).filter(day => day[subject]).length;
        return { done, total: totalDays, percent: Math.round((done / totalDays) * 100) };
      },
    }),
    {
      name: 'ai-batch-v1',
      partialize: (state) => ({
        completions: state.completions,
        dpps: state.dpps,
      }),
    }
  )
);
