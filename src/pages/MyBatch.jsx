import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Trophy, Lock } from 'lucide-react';
import { useAiBatchStore } from '../store/aiBatchStore';
import {
  SUBJECTS, getStudyDayNumber, studyDayToDate, getScheduleForDay,
  S1_SEQUENCE, S2_SEQUENCE, S3_SEQUENCE, S5_SEQUENCE,
  S1_LECTURES, S2_LECTURES, S3_LECTURES, S5_LECTURES,
  DSA_STEPS, S5_START_DAY,
} from '../lib/aiBatchData';

const SUBJECT_KEYS = ['S1', 'S2', 'S3', 'S4', 'S5'];
const S_SEQUENCES  = { S1: S1_SEQUENCE, S2: S2_SEQUENCE, S3: S3_SEQUENCE, S5: S5_SEQUENCE };
const S_LECTURES   = { S1: S1_LECTURES, S2: S2_LECTURES, S3: S3_LECTURES, S5: S5_LECTURES };

export default function MyBatch() {
  const completions = useAiBatchStore(s => s.completions);
  const toggleCompletion = useAiBatchStore(s => s.toggleCompletion);
  const [expandedModules, setExpandedModules] = useState({});
  const [activeSubject, setActiveSubject] = useState('S1');

  const handleLectureToggle = (sk, lecDayNum) => {
    const date = studyDayToDate(lecDayNum);
    if (!date) return;
    const dateStr = date.toISOString().split('T')[0];
    const schedule = getScheduleForDay(lecDayNum);
    toggleCompletion(dateStr, sk, lecDayNum, schedule);
  };

  // completions = { 'YYYY-MM-DD': { S1: bool, ... } }
  // Map each date → study day number, collect which dayNums are done per subject
  const completedBySubject = useMemo(() => {
    const result = { S1: new Set(), S2: new Set(), S3: new Set(), S4: new Set(), S5: new Set() };
    for (const [dateStr, subjects] of Object.entries(completions)) {
      const dayNum = getStudyDayNumber(new Date(dateStr + 'T12:00:00'));
      if (!dayNum) continue;
      for (const sk of SUBJECT_KEYS) {
        if (subjects[sk]) result[sk].add(dayNum);
      }
    }
    return result;
  }, [completions]);

  const toggleMod = (key) =>
    setExpandedModules(prev => ({ ...prev, [key]: !prev[key] }));

  // Pre-compute S4 step boundaries (each topic ≈ 4 problems)
  const stepsWithBounds = useMemo(() => {
    let cum = 0;
    return DSA_STEPS.map(step => {
      const count = step.topics.length * 4;
      const start = cum + 1;
      cum += count;
      return { ...step, startProblem: start, endProblem: cum };
    });
  }, []);

  const s4DaysDone = completedBySubject.S4.size;
  const problemsSolved = Math.min(s4DaysDone * 2, 474);

  // Overall stats
  const totalLectures = S1_LECTURES.length + S2_LECTURES.length + S3_LECTURES.length + S5_LECTURES.length;
  const totalDone = (completedBySubject.S1.size + completedBySubject.S2.size + completedBySubject.S3.size + completedBySubject.S5.size);
  const overallPct = Math.round((totalDone / totalLectures) * 100);

  return (
    <div className="min-h-screen bg-[#F5F4F0] p-4 lg:p-6 pb-24 lg:pb-6 max-w-5xl mx-auto">

      {/* ── Hero ── */}
      <div className="bg-[#1A1A2E] rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={13} className="text-[#E07B39]" />
              <p className="text-[10px] font-bold text-white/40 font-['Space_Mono'] uppercase tracking-widest">
                Curriculum Progress
              </p>
            </div>
            <h1 className="text-2xl font-bold text-white font-['Inter'] tracking-tight mb-1">
              My Batch
            </h1>
            <p className="text-xs text-white/50 font-['Inter']">
              All modules · every lecture · your personal progress map
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-4xl font-bold font-['Space_Mono'] text-[#E07B39]">
              {overallPct}%
            </p>
            <p className="text-[10px] text-white/40 font-['Space_Mono'] uppercase">
              overall
            </p>
          </div>
        </div>

        {/* Per-subject mini bars */}
        <div className="mt-4 grid grid-cols-3 lg:grid-cols-5 gap-2">
          {SUBJECT_KEYS.map(sk => {
            const sub = SUBJECTS[sk];
            const done = sk === 'S4' ? problemsSolved : completedBySubject[sk].size;
            const total = sk === 'S4' ? 474 : S_LECTURES[sk].length;
            const pct = Math.round((done / total) * 100);
            return (
              <div key={sk} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold font-['Space_Mono'] uppercase px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: sub.color }}>
                    {sk}
                  </span>
                  <p className="text-[10px] font-bold font-['Space_Mono']" style={{ color: sub.color }}>
                    {pct}%
                  </p>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sub.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <p className="text-[9px] text-white/30 font-['Space_Mono'] mt-1">
                  {done}/{total} {sk === 'S4' ? 'probs' : 'lecs'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Subject tabs ── */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {SUBJECT_KEYS.map(sk => {
          const sub = SUBJECTS[sk];
          const done = sk === 'S4' ? problemsSolved : completedBySubject[sk].size;
          const total = sk === 'S4' ? 474 : S_LECTURES[sk]?.length ?? 0;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const isActive = activeSubject === sk;
          return (
            <button
              key={sk}
              onClick={() => setActiveSubject(sk)}
              className="flex flex-col items-start p-3 rounded-2xl border-2 transition-all text-left"
              style={{
                borderColor: isActive ? sub.color : '#E5E0D8',
                backgroundColor: isActive ? sub.color + '10' : 'white',
              }}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[9px] font-bold font-['Space_Mono'] uppercase px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: sub.color }}>
                  {sk}
                </span>
                <span className="text-[10px] font-bold font-['Space_Mono']"
                  style={{ color: isActive ? sub.color : '#9A9590' }}>
                  {pct}%
                </span>
              </div>
              <p className="text-[10px] font-bold text-[#1A1A2E] font-['Inter'] leading-tight mb-1 hidden sm:block">
                {sub.name}
              </p>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: sub.color + '25' }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: sub.color, width: `${pct}%` }} />
              </div>
              <p className="text-[9px] text-[#9A9590] font-['Space_Mono'] mt-1">
                {done}/{total}
              </p>
            </button>
          );
        })}
      </div>

      {/* ── Subject content ── */}
      <div className="flex flex-col gap-6">
        {['S1', 'S2', 'S3', 'S5'].filter(sk => sk === activeSubject).map(sk => {
          const isS5 = sk === 'S5';
          // S5 lecture day numbers are offset: S5 lecture index i → day (S5_START_DAY + i)
          const s5DayOffset = isS5 ? S5_START_DAY - 1 : 0;
          const sub = SUBJECTS[sk];
          const sequence = S_SEQUENCES[sk];
          const allLectures = S_LECTURES[sk];
          const doneSet = completedBySubject[sk];
          const totalDone = doneSet.size;
          const pct = Math.round((totalDone / allLectures.length) * 100);

          // Pre-compute startDayNum for every module
          // For S5: day numbers start at S5_START_DAY (not 1)
          let offset = s5DayOffset;
          const modsWithOffset = sequence.map(mod => {
            const start = offset + 1;
            offset += mod.lectures.length;
            return { ...mod, startDayNum: start };
          });

          return (
            <div key={sk} className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
              {/* Subject header */}
              <div className="p-5" style={{ backgroundColor: sub.bg }}>
                {isS5 && totalDone === 0 && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl border border-[#DC2626]/20 bg-red-50/60">
                    <Lock size={11} className="text-[#DC2626] shrink-0" />
                    <p className="text-[10px] font-['Inter'] text-[#DC2626]">
                      Unlocks on <span className="font-bold">Day {S5_START_DAY}</span> — when S3 Software Engineering finishes and its 12:00–13:30 slot frees up
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sub.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold font-['Space_Mono'] uppercase px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: sub.color }}>{sk}</span>
                        <p className="text-sm font-bold text-[#1A1A2E] font-['Inter']">{sub.name}</p>
                      </div>
                      <p className="text-[10px] text-[#9A9590] font-['Space_Mono']">
                        {totalDone} / {allLectures.length} lectures complete
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold font-['Space_Mono']" style={{ color: sub.color }}>{pct}%</p>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: sub.color + '25' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sub.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Module list */}
              <div className="divide-y divide-[#F5F4F0]">
                {modsWithOffset.map((mod, modIdx) => {
                  const modDone = mod.lectures.filter((_, i) =>
                    doneSet.has(mod.startDayNum + i)
                  ).length;
                  const modComplete = modDone >= mod.lectures.length;
                  const modProgress = modDone > 0 && !modComplete;
                  const expanded = !!expandedModules[`${sk}-${modIdx}`];

                  return (
                    <div key={modIdx}>
                      <button
                        onClick={() => toggleMod(`${sk}-${modIdx}`)}
                        className="w-full flex items-center gap-3 p-4 hover:bg-[#F9F8F5] transition-all text-left"
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all"
                          style={{
                            backgroundColor: modComplete ? sub.color : modProgress ? sub.color + '18' : '#F5F4F0',
                            border: modProgress ? `2px solid ${sub.color}` : '2px solid transparent',
                          }}
                        >
                          {modComplete
                            ? <Check size={13} color="white" strokeWidth={3} />
                            : <span className="text-[10px] font-bold font-['Space_Mono']"
                                style={{ color: modProgress ? sub.color : '#9A9590' }}>
                                {modIdx + 1}
                              </span>
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#1A1A2E] font-['Inter'] leading-snug">
                            {mod.module}
                          </p>
                          <p className="text-[10px] text-[#9A9590] font-['Space_Mono'] mt-0.5">
                            {modDone}/{mod.lectures.length} · {mod.source}
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <div className="w-14 h-1.5 bg-[#E5E0D8] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ backgroundColor: sub.color, width: `${(modDone / mod.lectures.length) * 100}%` }}
                            />
                          </div>
                          {expanded
                            ? <ChevronUp size={14} className="text-[#9A9590]" />
                            : <ChevronDown size={14} className="text-[#9A9590]" />
                          }
                        </div>
                      </button>

                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pl-16 space-y-0.5">
                              {mod.lectures.map((title, lecIdx) => {
                                const dayNum = mod.startDayNum + lecIdx;
                                const done = doneSet.has(dayNum);
                                return (
                                  <div
                                    key={lecIdx}
                                    onClick={() => handleLectureToggle(sk, dayNum)}
                                    className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer hover:bg-black/5"
                                    style={done ? { backgroundColor: sub.color + '0C' } : {}}
                                  >
                                    <div
                                      className="w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                                      style={done
                                        ? { backgroundColor: sub.color, borderColor: sub.color }
                                        : { borderColor: '#D5D0C8' }
                                      }
                                    >
                                      {done && <Check size={9} color="white" strokeWidth={3} />}
                                    </div>
                                    <span className="text-[9px] font-bold font-['Space_Mono'] shrink-0 mt-0.5"
                                      style={{ color: sub.color + '70' }}>
                                      {lecIdx + 1}/{mod.lectures.length}
                                    </span>
                                    <p className="text-[11px] font-['Inter'] leading-snug"
                                      style={{ color: done ? sub.color : '#3D3830' }}>
                                      {title}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* S4 — DSA */}
        {activeSubject === 'S4' && ((() => {
          const sub = SUBJECTS.S4;
          const pct = Math.round((problemsSolved / 474) * 100);
          return (
            <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
              <div className="p-5" style={{ backgroundColor: sub.bg }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sub.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold font-['Space_Mono'] uppercase px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: sub.color }}>S4</span>
                        <p className="text-sm font-bold text-[#1A1A2E] font-['Inter']">DSA — Striver A2Z</p>
                      </div>
                      <p className="text-[10px] text-[#9A9590] font-['Space_Mono']">
                        {problemsSolved} / 474 problems · {s4DaysDone} study days
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold font-['Space_Mono']" style={{ color: sub.color }}>{pct}%</p>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: sub.color + '25' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sub.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div className="divide-y divide-[#F5F4F0]">
                {stepsWithBounds.map((step, si) => {
                  const stepDone   = problemsSolved >= step.endProblem;
                  const stepActive = !stepDone && problemsSolved >= step.startProblem;
                  const reached    = stepActive ? problemsSolved - step.startProblem + 1 : 0;
                  const expanded   = !!expandedModules[`S4-${si}`];

                  return (
                    <div key={si}>
                      <button
                        onClick={() => toggleMod(`S4-${si}`)}
                        className="w-full flex items-center gap-3 p-4 hover:bg-[#FFF8F0] transition-all text-left"
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all"
                          style={{
                            backgroundColor: stepDone ? sub.color : stepActive ? sub.color + '18' : '#F5F4F0',
                            border: stepActive ? `2px solid ${sub.color}` : '2px solid transparent',
                          }}
                        >
                          {stepDone
                            ? <Check size={13} color="white" strokeWidth={3} />
                            : <span className="text-[10px] font-bold font-['Space_Mono']"
                                style={{ color: stepActive ? sub.color : '#9A9590' }}>
                                {si + 1}
                              </span>
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#1A1A2E] font-['Inter']">
                            {step.step} — {step.name}
                          </p>
                          <p className="text-[10px] text-[#9A9590] font-['Space_Mono'] mt-0.5">
                            Problems #{step.startProblem}–{step.endProblem}
                            {stepActive && ` · ${reached} reached`}
                          </p>
                        </div>

                        {expanded
                          ? <ChevronUp size={14} className="text-[#9A9590]" />
                          : <ChevronDown size={14} className="text-[#9A9590]" />
                        }
                      </button>

                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pl-16 space-y-0.5">
                              {step.topics.map((topic, ti) => {
                                const topicStart = step.startProblem + ti * 4;
                                const topicDone  = problemsSolved >= topicStart + 4;
                                const topicActive = !topicDone && problemsSolved >= topicStart;
                                return (
                                  <div
                                    key={ti}
                                    className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg transition-all"
                                    style={topicDone ? { backgroundColor: sub.color + '0C' } : {}}
                                  >
                                    <div
                                      className="w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5"
                                      style={topicDone
                                        ? { backgroundColor: sub.color, borderColor: sub.color }
                                        : topicActive
                                        ? { borderColor: sub.color }
                                        : { borderColor: '#D5D0C8' }
                                      }
                                    >
                                      {topicDone && <Check size={9} color="white" strokeWidth={3} />}
                                      {topicActive && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sub.color }} />}
                                    </div>
                                    <p className="text-[11px] font-['Inter'] leading-snug"
                                      style={{ color: topicDone ? sub.color : '#3D3830' }}>
                                      {topic}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })())}
      </div>
    </div>
  );
}

