import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, subDays, addDays, startOfWeek } from 'date-fns';
import { clsx } from 'clsx';
import {
  Brain, Code2, Cpu, Zap, Check, Circle,
  BookOpen, RefreshCw, ChevronDown, ChevronUp,
  Calendar, Trophy, Target, Clock, Flame,
  AlertCircle, Play, ChevronLeft, ChevronRight,
  Lightbulb, FlaskConical, BarChart3, CalendarDays, Coffee
} from 'lucide-react';
import { useAiBatchStore } from '../store/aiBatchStore';
import {
  SUBJECTS, getStudyDayNumber, getScheduleForDay, isSunday,
  TOTAL_S1_DAYS, TOTAL_S2_DAYS, TOTAL_S3_DAYS, TOTAL_DSA_DAYS, TOTAL_S5_DAYS, S5_START_DAY,
  BATCH_START_DATE, DAILY_BLOCKS,
  getDailyVideoCount, getWeekMilestone, getMonthMilestone,
} from '../lib/aiBatchData';

const SUBJECT_ICONS = { S1: '🤖', S2: '🧠', S3: '⚙️', S4: '🎯', S5: '🏆' };
const SUBJECT_KEYS = ['S1', 'S2', 'S3', 'S4', 'S5'];
const SUBJECT_TOTALS = { S1: TOTAL_S1_DAYS, S2: TOTAL_S2_DAYS, S3: TOTAL_S3_DAYS, S4: TOTAL_DSA_DAYS, S5: TOTAL_S5_DAYS };

function todayStr() {
  return format(new Date(), 'yyyy-MM-dd');
}

function dateToStr(d) {
  return format(d, 'yyyy-MM-dd');
}

// ── Subject Card ──────────────────────────────────────
const SubjectCard = ({ subjectKey, lecture, done, onToggle, dayNum }) => {
  const [expanded, setExpanded] = useState(false);
  const sub = SUBJECTS[subjectKey];
  const isLocked = lecture?.locked === true;

  // Locked state for S5 before Day 61
  if (isLocked) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-dashed border-[#E5E0D8] bg-[#FAFAF9] p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl border-2 border-[#E5E0D8] flex items-center justify-center shrink-0">
            <span className="text-sm">🔒</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold font-['Space_Mono'] uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: sub.color + '80' }}>
                {subjectKey}
              </span>
              <span className="text-[10px] text-[#9A9590] font-['Inter']">{sub.name}</span>
            </div>
            <p className="text-sm font-bold font-['Inter'] text-[#9A9590]">
              Unlocks on Day {lecture.unlocksAt}
            </p>
            <p className="text-[10px] text-[#9A9590] font-['Space_Mono'] mt-0.5">
              When S3 Software Engineering finishes · slot 12:00–13:30 freed
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'rounded-2xl border-2 transition-all',
        done ? '' : 'bg-white border-[#E5E0D8] hover:shadow-sm'
      )}
      style={done
        ? { borderColor: sub.color + '50', backgroundColor: sub.color + '08' }
        : {}}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3">
          {/* Complete toggle */}
          <button
            onClick={onToggle}
            className="mt-0.5 w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all"
            style={done
              ? { backgroundColor: sub.color, borderColor: sub.color }
              : { borderColor: '#E5E0D8' }
            }
          >
            {done && <Check size={13} color="white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            {/* Subject label */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold font-['Space_Mono'] uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: sub.color }}>
                {subjectKey}
              </span>
              <span className="text-[10px] text-[#9A9590] font-['Space_Mono']">
                {sub.hours}h
              </span>
              <span className="text-[10px] text-[#9A9590] font-['Inter']">
                {sub.name}
              </span>
            </div>

            {/* Module + lecture position */}
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <p className="text-[10px] text-[#9A9590] font-['Space_Mono']">
                {lecture?.module}
              </p>
              {lecture?.lectureNumInModule && (
                <span className="text-[9px] font-bold font-['Space_Mono'] px-1.5 py-0.5 rounded-md"
                  style={{ backgroundColor: sub.color + '18', color: sub.color }}>
                  Lec {lecture.lectureNumInModule}/{lecture.totalLecturesInModule}
                </span>
              )}
            </div>

            {/* Lecture title */}
            <p className="text-sm font-bold font-['Inter'] leading-snug text-[#1A1A2E]">
              {lecture?.title}
            </p>

            {/* DSA problem range */}
            {subjectKey === 'S4' && lecture?.problemRange && (
              <p className="text-[10px] text-[#B45309] font-['Space_Mono'] mt-1 font-bold">
                {lecture.problemRange}
              </p>
            )}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-[#9A9590] hover:text-[#1A1A2E] transition-colors mt-0.5 shrink-0"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Source badge */}
        <div className="flex items-center gap-1.5 mt-2 pl-10">
          <span className={clsx(
            'text-[9px] font-bold font-["Space_Mono"] uppercase px-2 py-0.5 rounded-full',
            lecture?.source === 'YouTube' ? 'bg-red-50 text-red-600'
              : lecture?.source?.includes('Paid') ? 'bg-orange-50 text-orange-600'
              : lecture?.source === 'Striver A2Z' ? 'bg-amber-50 text-amber-700'
              : 'bg-slate-50 text-slate-600'
          )}>
            {lecture?.source}
          </span>
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-[#F5F4F0]">
              <div className="bg-[#F5F4F0] rounded-xl p-3">
                <p className="text-[9px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-1.5">
                  Today's Focus
                </p>
                <p className="text-xs text-[#3D3830] font-['Inter'] leading-relaxed">
                  {subjectKey === 'S4'
                    ? `Solve 2 problems from Striver A2Z: ${lecture?.title}. Focus on brute → optimal approach. Understand time & space complexity for each.`
                    : `Study "${lecture?.title}" from the ${lecture?.module} course. Take notes, code along, and connect concepts to previous sessions.`
                  }
                </p>
              </div>

              {subjectKey !== 'S4' && (
                <div className="mt-3 flex items-center gap-2">
                  <Clock size={11} className="text-[#9A9590]" />
                  <p className="text-[10px] text-[#9A9590] font-['Inter']">
                    Target: <span className="font-bold text-[#1A1A2E]">{sub.hours} hours</span> of focused study
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const QTYPE_COLORS = {
  'CONCEPT CHECK': '#6366F1',
  'BUILD IT':      '#047857',
  'FEYNMAN TRAP':  '#DC2626',
  'CONNECT':       '#7C3AED',
  'APPLY':         '#B45309',
};

// ── DPP Problem Card ──────────────────────────────────
const DppCard = ({ problem, index, totalInSubject = 5 }) => {
  const [showInsight, setShowInsight] = useState(false);
  const sub = SUBJECTS[problem.subject];
  const colors = sub ? { bg: sub.bg, color: sub.color } : { bg: '#F5F4F0', color: '#1A1A2E' };
  const qtypeColor = QTYPE_COLORS[problem.qType] || colors.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden"
    >
      {/* Color accent bar */}
      <div className="h-1" style={{ backgroundColor: colors.color }} />

      <div className="p-5">
        {/* qType + problem number */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {problem.qType && (
              <span className="text-[9px] font-bold font-['Space_Mono'] uppercase px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: qtypeColor }}>
                {problem.qType}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#9A9590] font-['Space_Mono']">
            Q{index + 1}/{totalInSubject}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#1A1A2E] font-['Inter'] mb-3">
          {problem.title}
        </h3>

        {/* Scenario */}
        <div className="rounded-xl p-3 mb-3" style={{ backgroundColor: colors.bg }}>
          <p className="text-[9px] font-bold font-['Space_Mono'] uppercase tracking-widest mb-1.5"
            style={{ color: colors.color }}>
            Scenario
          </p>
          <p className="text-xs text-[#3D3830] font-['Inter'] leading-relaxed">
            {problem.scenario}
          </p>
        </div>

        {/* Problem */}
        <div className="bg-[#1A1A2E] rounded-xl p-4 mb-3">
          <p className="text-[9px] font-bold text-white/40 font-['Space_Mono'] uppercase tracking-widest mb-1.5">
            Problem
          </p>
          <p className="text-sm text-white font-['Inter'] leading-relaxed">
            {problem.problem}
          </p>
        </div>

        {/* Deliverable */}
        {problem.deliverable && (
          <div className="flex items-start gap-2 mb-3 p-3 bg-[#F5F4F0] rounded-xl">
            <FlaskConical size={12} className="text-[#9A9590] mt-0.5 shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-1">
                Deliverable
              </p>
              <p className="text-xs text-[#3D3830] font-['Inter'] leading-relaxed">
                {problem.deliverable}
              </p>
            </div>
          </div>
        )}

        {/* Cross-domain bridge */}
        {problem.bridge && (
          <div className="flex items-start gap-2 mb-3 p-3 rounded-xl border border-[#7C3AED]/20 bg-purple-50/40">
            <Zap size={11} className="text-[#7C3AED] mt-0.5 shrink-0" />
            <div>
              <p className="text-[9px] font-bold text-[#7C3AED] font-['Space_Mono'] uppercase tracking-widest mb-1">
                Cross-Domain Bridge
              </p>
              <p className="text-xs text-[#3D3830] font-['Inter'] leading-relaxed">
                {problem.bridge}
              </p>
            </div>
          </div>
        )}

        {/* Insight reveal */}
        <button
          onClick={() => setShowInsight(s => !s)}
          className="flex items-center gap-2 text-[10px] font-bold font-['Space_Mono'] uppercase tracking-wider transition-colors"
          style={{ color: showInsight ? colors.color : '#9A9590' }}
        >
          <Lightbulb size={11} />
          {showInsight ? 'Hide Insight' : 'Reveal Key Insight'}
        </button>

        <AnimatePresence>
          {showInsight && problem.insight && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2"
            >
              <div className="flex items-start gap-2 p-3 rounded-xl border"
                style={{ backgroundColor: colors.bg, borderColor: colors.color + '30' }}>
                <Lightbulb size={12} className="shrink-0 mt-0.5" style={{ color: colors.color }} />
                <p className="text-xs font-['Inter'] leading-relaxed" style={{ color: colors.color }}>
                  {problem.insight}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ── Week Calendar Strip ───────────────────────────────
const WeekStrip = ({ selectedDate, onSelectDate, completions }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const today = new Date();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      arr.push(subDays(today, i + weekOffset * 7));
    }
    return arr;
  }, [weekOffset]);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest">
          Study Calendar
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => setWeekOffset(w => w + 1)}
            className="p-1 rounded-lg hover:bg-[#F5F4F0] transition-all text-[#9A9590]">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => setWeekOffset(0)}
            className="text-[9px] font-bold font-['Space_Mono'] px-2 py-0.5 rounded-lg hover:bg-[#F5F4F0] text-[#9A9590] transition-all">
            Today
          </button>
          <button onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
            disabled={weekOffset === 0}
            className="p-1 rounded-lg hover:bg-[#F5F4F0] transition-all text-[#9A9590] disabled:opacity-30">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const dStr = dateToStr(d);
          const isToday = dStr === dateToStr(today);
          const isSelected = dStr === dateToStr(selectedDate);
          const isSun = d.getDay() === 0;
          const c = completions[dStr] || {};
          const subjectsDone = SUBJECT_KEYS.filter(k => c[k]).length;
          const isFuture = d > today;

          return (
            <button
              key={i}
              onClick={() => !isFuture && onSelectDate(d)}
              disabled={isFuture}
              className={clsx(
                'flex flex-col items-center py-2 px-1 rounded-xl transition-all',
                isSelected ? 'bg-[#1A1A2E]' : isToday ? 'bg-[#FFF0E6]' : 'hover:bg-[#F5F4F0]',
                isFuture && 'opacity-30 cursor-not-allowed',
                isSun && !isSelected && 'opacity-50'
              )}
            >
              <p className={clsx(
                'text-[8px] font-bold font-["Space_Mono"] uppercase mb-1',
                isSelected ? 'text-white/50' : 'text-[#9A9590]'
              )}>
                {format(d, 'EEE')}
              </p>
              <p className={clsx(
                'text-sm font-bold font-["Space_Mono"] mb-1.5',
                isSelected ? 'text-white' : isToday ? 'text-[#E07B39]' : 'text-[#1A1A2E]'
              )}>
                {format(d, 'd')}
              </p>

              {/* Completion dots */}
              {!isSun && !isFuture && (
                <div className="flex gap-0.5">
                  {SUBJECT_KEYS.map(k => (
                    <div key={k}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: c[k]
                          ? SUBJECTS[k].color
                          : isSelected ? 'rgba(255,255,255,0.2)' : '#E5E0D8'
                      }}
                    />
                  ))}
                </div>
              )}
              {isSun && (
                <p className={clsx(
                  'text-[7px] font-["Space_Mono"]',
                  isSelected ? 'text-white/30' : 'text-[#9A9590]'
                )}>REST</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── Weekly Timetable ──────────────────────────────────
const BLOCK_META = {
  BREAK: { name: 'Break · move · refuel', color: '#9A9590', bg: '#F5F4F0', icon: '☕' },
  DPP:   { name: 'Daily Practice Problems', color: '#E07B39', bg: '#FFF0E6', icon: '🧪' },
};
const blockInfo = (key) => SUBJECTS[key] || BLOCK_META[key];
const studyBlocks = DAILY_BLOCKS.filter(b => SUBJECTS[b.key]); // S-blocks in clock order

const WeeklyTimetable = ({ onSelectDay, completions }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const today = new Date();
  const monday = useMemo(
    () => startOfWeek(addDays(today, weekOffset * 7), { weekStartsOn: 1 }),
    [weekOffset]
  );
  const days = useMemo(
    () => Array.from({ length: 6 }, (_, i) => addDays(monday, i)), // Mon–Sat
    [monday]
  );

  return (
    <div className="flex flex-col gap-6">

      {/* ── DAILY ROUTINE (fixed clock blocks) ── */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest">
            Daily Routine · every Mon–Sat
          </p>
          <span className="text-[10px] font-bold font-['Space_Mono'] text-[#E07B39]">
            7h focused
          </span>
        </div>
        <p className="text-xs text-[#9A9590] font-['Inter'] mb-4">
          Same time blocks each day — only the lectures change. Adjust the clock to fit your schedule.
        </p>

        <div className="space-y-1.5">
          {DAILY_BLOCKS.map((b, i) => {
            const info = blockInfo(b.key);
            const isSubject = !!SUBJECTS[b.key];
            return (
              <div key={i} className="flex items-stretch gap-3">
                {/* Time column */}
                <div className="w-[92px] shrink-0 text-right pt-1">
                  <p className="text-xs font-bold font-['Space_Mono'] text-[#1A1A2E]">{b.start}</p>
                  <p className="text-[9px] font-['Space_Mono'] text-[#9A9590]">{b.end}</p>
                </div>
                {/* Color rail */}
                <div className="w-1 rounded-full shrink-0" style={{ backgroundColor: info.color }} />
                {/* Content */}
                <div className="flex-1 min-w-0 rounded-xl p-3" style={{ backgroundColor: info.bg }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    {isSubject ? (
                      <span className="text-[9px] font-bold font-['Space_Mono'] uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: info.color }}>
                        {b.key}
                      </span>
                    ) : (
                      <span className="text-sm">{info.icon}</span>
                    )}
                    <p className="text-sm font-bold font-['Inter']" style={{ color: info.color }}>
                      {info.name}
                    </p>
                    {isSubject && (
                      <span className="text-[10px] text-[#9A9590] font-['Space_Mono']">{info.hours}h</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9A9590] font-['Inter'] mt-0.5">{b.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── THIS WEEK (lectures per day) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest">
            {weekOffset === 0 ? 'This Week' : format(monday, "'Week of' d MMM")}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setWeekOffset(w => w - 1)}
              className="p-1 rounded-lg hover:bg-[#ECEAE5] transition-all text-[#9A9590]">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setWeekOffset(0)}
              className="text-[9px] font-bold font-['Space_Mono'] px-2 py-0.5 rounded-lg hover:bg-[#ECEAE5] text-[#9A9590] transition-all">
              This Week
            </button>
            <button onClick={() => setWeekOffset(w => w + 1)}
              className="p-1 rounded-lg hover:bg-[#ECEAE5] transition-all text-[#9A9590]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {days.map((d, i) => {
            const dStr = dateToStr(d);
            const dayNum = getStudyDayNumber(d);
            const schedule = dayNum > 0 ? getScheduleForDay(dayNum) : null;
            const isToday = dStr === dateToStr(today);
            const c = completions[dStr] || {};
            const doneCount = SUBJECT_KEYS.filter(k => c[k]).length;
            const notStarted = dayNum <= 0;

            return (
              <button
                key={i}
                onClick={() => schedule && onSelectDay(d)}
                disabled={!schedule}
                className={clsx(
                  'text-left bg-white rounded-2xl border p-4 transition-all',
                  isToday ? 'border-[#E07B39] shadow-sm' : 'border-[#E5E0D8] hover:border-[#D5D0C8]',
                  !schedule && 'opacity-60 cursor-default'
                )}
              >
                {/* Day header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#1A1A2E] font-['Inter']">
                      {format(d, 'EEE')}
                    </p>
                    <p className="text-[10px] text-[#9A9590] font-['Space_Mono']">
                      {format(d, 'd MMM')}
                    </p>
                    {isToday && (
                      <span className="text-[8px] font-bold font-['Space_Mono'] uppercase px-1.5 py-0.5 bg-[#FFF0E6] text-[#E07B39] rounded-full">
                        Today
                      </span>
                    )}
                  </div>
                  {schedule && (
                    <p className="text-[10px] font-bold font-['Space_Mono']"
                      style={{ color: doneCount >= SUBJECT_KEYS.filter(k => !schedule?.[k]?.locked).length ? '#047857' : '#9A9590' }}>
                      {doneCount}/{SUBJECT_KEYS.filter(k => !schedule?.[k]?.locked).length}
                    </p>
                  )}
                </div>

                {notStarted ? (
                  <p className="text-[11px] text-[#9A9590] font-['Inter']">
                    Batch starts {format(new Date(BATCH_START_DATE), 'd MMM')} — no schedule yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest">
                      Day #{dayNum}
                    </p>
                    {studyBlocks.map(b => {
                      const lec = schedule[b.key];
                      const sub = SUBJECTS[b.key];
                      const done = !!c[b.key];
                      return (
                        <div key={b.key} className="flex items-start gap-2">
                          <span className="text-[9px] font-bold font-['Space_Mono'] text-[#9A9590] w-9 shrink-0 pt-0.5">
                            {b.start}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                            style={{ backgroundColor: done ? sub.color : sub.color + '40' }} />
                          <div className="min-w-0">
                            {/* Chapter · Lec X/N */}
                            <div className="flex items-center gap-1 flex-wrap">
                              <p className="text-[9px] font-bold font-['Space_Mono'] uppercase tracking-wider"
                                style={{ color: sub.color }}>
                                {b.key}
                              </p>
                              {b.key !== 'S4' && lec?.lectureNumInModule && (
                                <span className="text-[8px] font-bold font-['Space_Mono']"
                                  style={{ color: sub.color + 'AA' }}>
                                  Lec {lec.lectureNumInModule}/{lec.totalLecturesInModule}
                                </span>
                              )}
                              {b.key === 'S4' && lec?.problemRange && (
                                <span className="text-[8px] font-['Space_Mono'] text-[#B45309]/70">
                                  {lec.problemRange}
                                </span>
                              )}
                            </div>
                            <p className="text-[9px] text-[#9A9590] font-['Space_Mono'] truncate leading-tight">
                              {lec?.module}
                            </p>
                            <p className="text-[11px] font-['Inter'] leading-snug truncate text-[#3D3830]">
                              {done ? '✓ ' : ''}{lec?.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-[#9A9590] font-['Inter'] text-center mt-4">
          Tap any day to open its full session →
        </p>
      </div>
    </div>
  );
};

// ── Syllabus Timeline ─────────────────────────────────
const SyllabusTimeline = ({ currentDayNum }) => {
  const currentWeek = Math.ceil(currentDayNum / 6) || 1;
  const currentMonth = Math.ceil(currentDayNum / 26) || 1;

  const weekNumbers = [currentWeek - 1, currentWeek, currentWeek + 1, currentWeek + 2].filter(w => w > 0);
  const monthNumbers = [currentMonth, currentMonth + 1].filter(m => m > 0);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 mb-6">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest">
          Syllabus Timeline
        </p>
        <span className="text-[10px] font-bold font-['Space_Mono'] text-[#E07B39]">
          Week {currentWeek} · Month {currentMonth}
        </span>
      </div>
      <p className="text-xs text-[#9A9590] font-['Inter'] mb-5">
        Where you should be, week by week across all subjects.
      </p>

      {/* Weekly milestone strips per subject */}
      <div className="space-y-6">
        {['S1', 'S2', 'S3'].map(subKey => {
          const sub = SUBJECTS[subKey];
          return (
            <div key={subKey}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold font-['Space_Mono'] uppercase px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: sub.color }}>
                  {subKey}
                </span>
                <p className="text-xs font-bold text-[#1A1A2E] font-['Inter']">{sub.name}</p>
              </div>

              <div className="relative">
                <div className="absolute top-3 left-0 right-0 h-0.5 bg-[#E5E0D8] rounded-full" />
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                  {weekNumbers.map(wk => {
                    const milestone = getWeekMilestone(subKey, wk);
                    const isPast = wk < currentWeek;
                    const isCurrent = wk === currentWeek;
                    return (
                      <div key={wk} className="flex flex-col items-center min-w-[110px]">
                        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 relative z-10 bg-white"
                          style={{
                            backgroundColor: isPast || isCurrent ? sub.color : 'white',
                            borderColor: sub.color,
                          }}>
                          {isPast && <Check size={10} color="white" strokeWidth={3} />}
                          {isCurrent && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <p className="text-[9px] font-bold font-['Space_Mono'] uppercase tracking-wider mb-1 text-center"
                          style={{ color: isCurrent ? sub.color : '#9A9590' }}>
                          {isCurrent ? 'This Week' : `Week ${wk}`}
                        </p>
                        <p className="text-[9px] font-bold text-[#1A1A2E] font-['Inter'] text-center leading-tight mb-0.5 line-clamp-2">
                          {milestone.targetModule}
                        </p>
                        {milestone.lectureNumber && (
                          <p className="text-[8px] text-[#9A9590] font-['Space_Mono'] text-center">
                            Lec {milestone.lectureNumber}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* S4 DSA row */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold font-['Space_Mono'] uppercase px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: SUBJECTS.S4.color }}>
              S4
            </span>
            <p className="text-xs font-bold text-[#1A1A2E] font-['Inter']">DSA — Striver A2Z</p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {weekNumbers.map(wk => {
              const milestone = getWeekMilestone('S4', wk);
              const isCurrent = wk === currentWeek;
              return (
                <div key={wk} className="min-w-[110px] text-center">
                  <p className="text-[9px] font-bold font-['Space_Mono'] uppercase tracking-wider mb-1"
                    style={{ color: isCurrent ? SUBJECTS.S4.color : '#9A9590' }}>
                    {isCurrent ? 'This Week' : `Week ${wk}`}
                  </p>
                  <p className="text-[9px] font-bold text-[#1A1A2E] font-['Inter']">
                    Problem #{milestone.targetProblem} of 474
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Month-end targets */}
      <div className="mt-5 border-t border-[#F5F4F0] pt-4">
        <p className="text-[9px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-3">
          Month-End Targets
        </p>
        <div className="grid grid-cols-2 gap-3">
          {monthNumbers.map(mo => (
            <div key={mo} className="bg-[#F5F4F0] rounded-xl p-3">
              <p className="text-[9px] font-bold font-['Space_Mono'] uppercase text-[#E07B39] mb-2">
                {mo === currentMonth ? 'This Month' : `Month ${mo}`}
              </p>
              {['S1', 'S2', 'S3'].map(sk => {
                const m = getMonthMilestone(sk, mo);
                return (
                  <p key={sk} className="text-[9px] font-['Inter'] text-[#3D3830] leading-snug mb-1">
                    <span className="font-bold">{sk}:</span> {m.targetModule}
                  </p>
                );
              })}
              <p className="text-[9px] font-['Inter'] text-[#3D3830]">
                <span className="font-bold">S4:</span> Problem #{getMonthMilestone('S4', mo).targetProblem}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ── MAIN PAGE ─────────────────────────────────────────
const AIBatch = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('today');

  const {
    completions, dpps, isGeneratingDpp, dppError,
    toggleCompletion, getDayCompletions, getAllDoneForDay,
    getAnyDoneForDay, generateDpp,
    getTotalDaysStudied, getTotalFullDays, getSubjectProgress,
    hydrateFromSupabase, migrateLocalStorageToSupabase,
  } = useAiBatchStore();

  useEffect(() => {
    migrateLocalStorageToSupabase().then(() => hydrateFromSupabase());
  }, []);

  const selectedDateStr = dateToStr(selectedDate);
  const todayDate = new Date();
  const todayDateStr = dateToStr(todayDate);
  const isViewingToday = selectedDateStr === todayDateStr;
  const isViewingSunday = isSunday(selectedDate);

  const dayNum = getStudyDayNumber(selectedDate);
  const schedule = useMemo(() => getScheduleForDay(dayNum), [dayNum]);
  const dayCompletions = getDayCompletions(selectedDateStr);
  const allDone = getAllDoneForDay(selectedDateStr);
  const anyDone = getAnyDoneForDay(selectedDateStr);
  const todayDayNum = getStudyDayNumber(todayDate);
  const existingDpp = dpps[selectedDateStr];

  const totalDaysStudied = getTotalDaysStudied();
  const totalFullDays = getTotalFullDays();

  // Stats
  const statsCards = [
    { label: 'Study Day', value: `#${todayDayNum}`, sub: 'of 234 total', color: '#7C3AED' },
    { label: 'Full Days', value: totalFullDays, sub: 'all 4 subjects', color: '#047857' },
    { label: 'Active Days', value: totalDaysStudied, sub: 'any progress', color: '#0369A1' },
    { label: 'DPPs Generated', value: Object.keys(dpps).length, sub: 'practice sets', color: '#B45309' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F4F0] p-4 lg:p-6 pb-24 lg:pb-6 max-w-5xl mx-auto">

      {/* ── HERO HEADER ── */}
      <div className="bg-[#1A1A2E] rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={13} className="text-[#E07B39]" />
              <p className="text-[10px] font-bold text-white/40 font-['Space_Mono'] uppercase tracking-widest">
                9-Month AI Engineer Batch · Mon–Sat
              </p>
            </div>
            <h1 className="text-2xl font-bold text-white font-['Inter'] tracking-tight mb-1">
              Batch Coaching
            </h1>
            <p className="text-xs text-white/50 font-['Inter']">
              4 subjects in parallel · JEE-style schedule · AI-generated DPPs
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-bold font-['Space_Mono'] text-[#E07B39]">
              Day {todayDayNum}
            </p>
            <p className="text-[10px] text-white/40 font-['Space_Mono'] uppercase">
              {format(todayDate, 'EEE, d MMM')}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {statsCards.map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-[9px] text-white/40 font-['Space_Mono'] uppercase tracking-widest mb-0.5">
                {s.label}
              </p>
              <p className="text-lg font-bold font-['Space_Mono']" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-[9px] text-white/30 font-['Inter']">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SUBJECT PROGRESS BARS ── */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-4 mb-6">
        <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-3">
          Curriculum Progress
        </p>
        <div className="space-y-3">
          {SUBJECT_KEYS.map(k => {
            const sub = SUBJECTS[k];
            const prog = getSubjectProgress(k, SUBJECT_TOTALS[k]);
            return (
              <div key={k} className="flex items-center gap-3">
                <span className="text-[10px] font-bold font-['Space_Mono'] w-6 text-center">
                  {sub.icon}
                </span>
                <p className="text-[10px] font-bold font-['Inter'] text-[#1A1A2E] w-28 shrink-0 truncate">
                  {sub.name}
                </p>
                <div className="flex-1 h-2 bg-[#F5F4F0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prog.percent}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: sub.color }}
                  />
                </div>
                <p className="text-[10px] font-bold font-['Space_Mono'] shrink-0 w-16 text-right"
                  style={{ color: sub.color }}>
                  {prog.done}/{SUBJECT_TOTALS[k]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── WEEK CALENDAR ── */}
      <WeekStrip
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        completions={completions}
      />

      {/* ── TAB BAR ── */}
      <div className="flex items-center gap-1 bg-white rounded-xl border border-[#E5E0D8] p-1 mb-6 flex-wrap">
        {[
          { id: 'today', label: isViewingToday ? "Today's Session" : format(selectedDate, 'd MMM'), icon: BookOpen },
          { id: 'timetable', label: 'Timetable', icon: CalendarDays },
          { id: 'dpp', label: 'DPP', icon: FlaskConical },
          { id: 'stats', label: 'Analytics', icon: BarChart3 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold',
              'font-["Space_Mono"] uppercase tracking-wider transition-all whitespace-nowrap',
              activeTab === tab.id ? 'bg-[#1A1A2E] text-white' : 'text-[#9A9590] hover:text-[#1A1A2E]'
            )}
          >
            <tab.icon size={12} /> {tab.label}
          </button>
        ))}
      </div>

      {/* ══ TAB: TODAY'S SESSION ══ */}
      {activeTab === 'today' && (
        <div className="flex flex-col gap-4">

          {/* Sunday rest screen */}
          {isViewingSunday ? (
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-10 text-center">
              <div className="text-5xl mb-4">😴</div>
              <h2 className="text-xl font-bold text-[#1A1A2E] font-['Inter'] mb-2">Sunday — Rest Day</h2>
              <p className="text-sm text-[#9A9590] font-['Inter'] max-w-xs mx-auto leading-relaxed">
                Recovery is part of the system. Your brain consolidates learning during rest.
                Review your notes, go for a walk, or do nothing at all.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {['Review notes', 'Light reading', 'Rest & recharge'].map((s, i) => (
                  <div key={i} className="bg-[#F5F4F0] rounded-xl p-3 text-center">
                    <p className="text-[10px] font-bold text-[#9A9590] font-['Inter']">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Date header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest">
                    {isViewingToday ? "Today's Lectures" : format(selectedDate, 'EEEE, d MMMM')}
                  </p>
                  <p className="text-lg font-bold text-[#1A1A2E] font-['Inter']">
                    Study Day #{dayNum}
                    {allDone && (
                      <span className="ml-2 text-[10px] font-bold text-[#047857] font-['Space_Mono'] uppercase px-2 py-0.5 bg-green-50 rounded-full">
                        ✓ Complete
                      </span>
                    )}
                  </p>
                  {/* Active chapters */}
                  {schedule && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {(['S1','S2','S3'] ).map(k => {
                        const lec = schedule[k];
                        if (!lec?.lectureNumInModule) return null;
                        return (
                          <span key={k} className="text-[9px] font-['Space_Mono'] px-2 py-0.5 rounded-full border"
                            style={{ color: SUBJECTS[k].color, borderColor: SUBJECTS[k].color + '40', backgroundColor: SUBJECTS[k].color + '0D' }}>
                            {lec.module} · {lec.lectureNumInModule}/{lec.totalLecturesInModule}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold font-['Space_Mono'] text-[#E07B39]">
                    {SUBJECT_KEYS.filter(k => dayCompletions[k] && !schedule?.[k]?.locked).length}/{SUBJECT_KEYS.filter(k => !schedule?.[k]?.locked).length}
                  </p>
                  <p className="text-[9px] text-[#9A9590] font-['Space_Mono'] uppercase">done</p>
                </div>
              </div>

              {/* Daily video count banner */}
              {schedule && (
                <div className="bg-white rounded-xl border border-[#E5E0D8] p-3 flex items-center gap-3 flex-wrap">
                  <p className="text-[9px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest shrink-0">
                    Today Watch
                  </p>
                  {getDailyVideoCount(dayNum)?.map(item => (
                    <div key={item.subject} className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white font-['Space_Mono']"
                        style={{ backgroundColor: SUBJECTS[item.subject]?.color }}>
                        {item.count} {item.subject === 'S4' ? 'problems' : 'lecture'}
                      </span>
                      <span className="text-[9px] text-[#9A9590] font-['Inter']">{item.detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Completion bar */}
              <div className="h-1.5 bg-[#E5E0D8] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(SUBJECT_KEYS.filter(k => dayCompletions[k] && !schedule?.[k]?.locked).length / Math.max(1, SUBJECT_KEYS.filter(k => !schedule?.[k]?.locked).length)) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-[#E07B39] rounded-full"
                />
              </div>

              {/* Subject cards — only show pending (undone + unlocked) subjects */}
              {schedule && (() => {
                const pending = SUBJECT_KEYS.filter(k => !dayCompletions[k] && !schedule[k]?.locked);
                if (pending.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                      <span className="text-4xl">🎉</span>
                      <p className="text-base font-bold text-[#1A1A2E] font-['Inter']">All done for today!</p>
                      <p className="text-xs text-[#9A9590] font-['Inter'] text-center">
                        Every subject checked off. Rest well — see you tomorrow.
                      </p>
                    </div>
                  );
                }
                return pending.map(k => (
                  <SubjectCard
                    key={k}
                    subjectKey={k}
                    lecture={schedule[k]}
                    done={dayCompletions[k]}
                    onToggle={() => toggleCompletion(selectedDateStr, k, dayNum, schedule)}
                    dayNum={dayNum}
                  />
                ));
              })()}

              {/* Generate DPP button */}
              {anyDone && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1A1A2E] rounded-2xl p-5 text-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-white/40 font-['Space_Mono'] uppercase tracking-widest mb-1">
                        {existingDpp ? 'DPP Generated' : 'Ready to Generate'}
                      </p>
                      <p className="text-sm font-bold font-['Inter']">
                        {existingDpp
                          ? 'Daily Practice Problems are ready'
                          : 'Generate Harvard/MIT-style DPPs for today'
                        }
                      </p>
                      {existingDpp && (
                        <p className="text-[10px] text-white/40 font-['Space_Mono'] mt-1">
                          Generated at {format(new Date(existingDpp.generatedAt), 'h:mm a')}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => { generateDpp(selectedDateStr, dayNum); setActiveTab('dpp'); }}
                        disabled={isGeneratingDpp}
                        className={clsx(
                          'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold',
                          'font-["Space_Mono"] uppercase tracking-wider transition-all',
                          isGeneratingDpp ? 'bg-white/10 cursor-not-allowed' : 'bg-[#E07B39] hover:bg-[#c96b2e]'
                        )}
                      >
                        {isGeneratingDpp
                          ? <><RefreshCw size={12} className="animate-spin" /> Generating...</>
                          : existingDpp
                          ? <><RefreshCw size={12} /> Regenerate</>
                          : <><Zap size={12} /> Generate DPP</>
                        }
                      </button>
                      {existingDpp && (
                        <button
                          onClick={() => setActiveTab('dpp')}
                          className="text-[10px] font-bold font-['Space_Mono'] uppercase text-white/50 hover:text-white transition-colors text-center"
                        >
                          View DPPs →
                        </button>
                      )}
                    </div>
                  </div>

                  {dppError && (
                    <div className="mt-3 flex items-center gap-2 p-2 bg-red-500/10 rounded-lg">
                      <AlertCircle size={12} className="text-red-400" />
                      <p className="text-[10px] text-red-400 font-['Inter']">{dppError}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      )}

      {/* ══ TAB: TIMETABLE ══ */}
      {activeTab === 'timetable' && (
        <div>
          <SyllabusTimeline currentDayNum={todayDayNum || 1} />
          <WeeklyTimetable
            completions={completions}
            onSelectDay={(d) => { setSelectedDate(d); setActiveTab('today'); }}
          />
        </div>
      )}

      {/* ══ TAB: DPP ══ */}
      {activeTab === 'dpp' && (() => {
        // Group problems by subject
        const grouped = {};
        if (existingDpp?.problems) {
          existingDpp.problems.forEach(p => {
            if (!grouped[p.subject]) grouped[p.subject] = [];
            grouped[p.subject].push(p);
          });
        }

        const downloadPdf = () => {
          if (!existingDpp) return;
          const html = `<!DOCTYPE html><html><head><title>DPP Day ${dayNum}</title>
<style>
  body{font-family:'Segoe UI',sans-serif;padding:40px;color:#1A1A2E;max-width:800px;margin:0 auto}
  h1{font-size:22px;margin:0 0 4px}
  .sub{color:#9A9590;font-size:12px;margin:0 0 32px}
  .subj-header{display:inline-flex;align-items:center;gap:8px;margin:0 0 14px}
  .subj-badge{color:#fff;font-size:11px;font-weight:800;padding:3px 12px;border-radius:20px;letter-spacing:.05em}
  .subj-name{font-size:14px;font-weight:700}
  .card{border:1px solid #E5E0D8;border-radius:10px;padding:16px;margin:0 0 12px;page-break-inside:avoid}
  .qtype{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#9A9590;margin:0 0 4px}
  .title{font-size:14px;font-weight:700;margin:0 0 10px}
  .label{font-size:9px;font-weight:800;text-transform:uppercase;color:#9A9590;margin:6px 0 2px}
  .scenario{background:#F5F4F0;border-radius:8px;padding:8px 10px;font-size:11px;line-height:1.6;margin:0 0 6px}
  .problem{background:#1A1A2E;color:#fff;border-radius:8px;padding:8px 10px;font-size:11px;line-height:1.6;margin:0 0 6px}
  .deliverable{font-size:11px;color:#555;line-height:1.6}
  .insight{border-left:3px solid #E07B39;padding:6px 10px;font-size:11px;font-style:italic;color:#666;margin:8px 0 0}
  @media print{body{padding:20px}}
</style></head><body>
<h1>Daily Practice Problems — Study Day #${dayNum}</h1>
<p class="sub">${format(selectedDate, 'EEEE, d MMMM yyyy')} · 20 problems · 5 per subject · AI Engineer Batch</p>
${SUBJECT_KEYS.map(sk => {
  const probs = grouped[sk] || [];
  if (!probs.length) return '';
  const sub = SUBJECTS[sk];
  return `<div style="margin-bottom:28px">
    <div class="subj-header">
      <span class="subj-badge" style="background:${sub.color}">${sk}</span>
      <span class="subj-name">${sub.name}</span>
    </div>
    ${probs.map((p, i) => `
    <div class="card">
      <div class="qtype">${p.qType || `Q${i+1}`} — Problem ${i+1}/5</div>
      <div class="title">${p.title}</div>
      ${p.scenario ? `<div class="label">Scenario</div><div class="scenario">${p.scenario}</div>` : ''}
      <div class="label">Problem</div>
      <div class="problem">${p.problem}</div>
      ${p.deliverable ? `<div class="label">Deliverable</div><div class="deliverable">${p.deliverable}</div>` : ''}
      ${p.insight ? `<div class="insight">💡 ${p.insight}</div>` : ''}
    </div>`).join('')}
  </div>`;
}).join('')}
</body></html>`;
          const w = window.open('', '_blank');
          w.document.write(html);
          w.document.close();
          w.focus();
          setTimeout(() => { w.print(); }, 300);
        };

        return existingDpp ? (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-0.5">
                  Study Day #{dayNum} · {format(selectedDate, 'd MMM yyyy')}
                </p>
                <h2 className="text-lg font-bold text-[#1A1A2E] font-['Inter']">
                  Daily Practice Problems
                </h2>
                <p className="text-xs text-[#9A9590] font-['Inter'] mt-0.5">
                  20 problems · 5 per subject · concept → build → feynman → connect → apply
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={downloadPdf}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#F5F4F0] hover:bg-[#E5E0D8] rounded-xl text-xs font-bold font-['Space_Mono'] uppercase text-[#9A9590] transition-all"
                >
                  ↓ PDF
                </button>
                <button
                  onClick={() => generateDpp(selectedDateStr, dayNum)}
                  disabled={isGeneratingDpp}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#F5F4F0] hover:bg-[#E5E0D8] rounded-xl text-xs font-bold font-['Space_Mono'] uppercase text-[#9A9590] transition-all"
                >
                  <RefreshCw size={11} className={isGeneratingDpp ? 'animate-spin' : ''} />
                  Regen
                </button>
              </div>
            </div>

            {/* Problems grouped by subject */}
            {SUBJECT_KEYS.map(sk => {
              const probs = grouped[sk] || [];
              if (!probs.length) return null;
              const sub = SUBJECTS[sk];
              return (
                <div key={sk}>
                  {/* Subject header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold font-['Space_Mono'] uppercase px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: sub.color }}>
                      {sk} — {sub.name}
                    </span>
                    <span className="text-[10px] text-[#9A9590] font-['Space_Mono']">
                      {probs.length} questions
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {probs.map((prob, i) => (
                      <DppCard key={i} problem={prob} index={i} totalInSubject={probs.length} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white rounded-2xl border border-[#E5E0D8] flex items-center justify-center mx-auto mb-4">
              <FlaskConical size={28} className="text-[#E5E0D8]" />
            </div>
            <p className="text-sm font-bold text-[#1A1A2E] font-['Inter'] mb-1">
              No DPPs Yet for This Day
            </p>
            <p className="text-xs text-[#9A9590] font-['Inter'] max-w-xs mx-auto mb-5 leading-relaxed">
              Mark at least one lecture complete to unlock DPP generation for Day #{dayNum}.
            </p>
            {anyDone && (
              <button
                onClick={() => generateDpp(selectedDateStr, dayNum)}
                disabled={isGeneratingDpp}
                className="flex items-center gap-2 px-5 py-3 bg-[#1A1A2E] text-white rounded-xl text-xs font-bold font-['Space_Mono'] uppercase tracking-wider mx-auto"
              >
                {isGeneratingDpp
                  ? <><RefreshCw size={12} className="animate-spin" /> Generating 20 problems...</>
                  : <><Zap size={12} /> Generate DPP (20 questions)</>
                }
              </button>
            )}
          </div>
        );
      })()}

      {/* ══ TAB: ANALYTICS ══ */}
      {activeTab === 'stats' && (
        <div className="flex flex-col gap-5">

          {/* Subject completion breakdown */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
            <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-4">
              Subject Completion
            </p>
            <div className="space-y-4">
              {SUBJECT_KEYS.map(k => {
                const sub = SUBJECTS[k];
                const prog = getSubjectProgress(k, SUBJECT_TOTALS[k]);
                const daysRemaining = SUBJECT_TOTALS[k] - prog.done;
                return (
                  <div key={k}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span>{sub.icon}</span>
                        <p className="text-sm font-bold text-[#1A1A2E] font-['Inter']">{sub.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold font-['Space_Mono']" style={{ color: sub.color }}>
                          {prog.done} <span className="text-[#9A9590] text-xs font-normal">/ {SUBJECT_TOTALS[k]}</span>
                        </p>
                      </div>
                    </div>
                    <div className="h-2.5 bg-[#F5F4F0] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prog.percent}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: sub.color }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-[9px] text-[#9A9590] font-['Space_Mono']">{prog.percent}% complete</p>
                      <p className="text-[9px] text-[#9A9590] font-['Space_Mono']">{daysRemaining} days left</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Overview stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Full Study Days', value: totalFullDays, sub: 'All 4 subjects done', color: '#047857', icon: '✅' },
              { label: 'Partial Days', value: Math.max(0, totalDaysStudied - totalFullDays), sub: 'Some subjects done', color: '#E07B39', icon: '⚡' },
              { label: 'DPPs Solved', value: Object.keys(dpps).length, sub: 'Practice sets', color: '#7C3AED', icon: '🧪' },
              { label: 'Days Elapsed', value: todayDayNum, sub: `Since ${BATCH_START_DATE}`, color: '#0369A1', icon: '📅' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E5E0D8] p-4">
                <p className="text-xl mb-1">{s.icon}</p>
                <p className="text-2xl font-bold font-['Space_Mono']" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs font-bold text-[#1A1A2E] font-['Inter'] mt-0.5">{s.label}</p>
                <p className="text-[9px] text-[#9A9590] font-['Inter']">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Recent DPPs list */}
          {Object.keys(dpps).length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
              <p className="text-[10px] font-bold text-[#9A9590] font-['Space_Mono'] uppercase tracking-widest mb-3">
                Recent DPP Sessions
              </p>
              <div className="space-y-2">
                {Object.entries(dpps)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .slice(0, 7)
                  .map(([dateKey, dpp]) => (
                    <button
                      key={dateKey}
                      onClick={() => { setSelectedDate(new Date(dateKey + 'T12:00:00')); setActiveTab('dpp'); }}
                      className="w-full flex items-center justify-between p-3 bg-[#F5F4F0] hover:bg-[#ECEAE5] rounded-xl transition-all text-left"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#1A1A2E] font-['Inter']">
                          Day #{dpp.dayNum} — {format(new Date(dateKey + 'T12:00:00'), 'EEE, d MMM')}
                        </p>
                        <p className="text-[9px] text-[#9A9590] font-['Space_Mono']">
                          {dpp.problems?.length || 4} problems generated
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-[#9A9590]" />
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Curriculum overview */}
          <div className="bg-[#1A1A2E] rounded-2xl p-5 text-white">
            <p className="text-[10px] font-bold text-white/40 font-['Space_Mono'] uppercase tracking-widest mb-3">
              9-Month Curriculum Overview
            </p>
            <div className="space-y-3">
              {[
                { label: 'Generative AI', subjects: 'LangChain → RAG → LangGraph → CrewAI → Agno → MCP → Prompt Eng → N8N → Ollama → Claude Code', days: TOTAL_S1_DAYS, color: '#7C3AED' },
                { label: 'Deep Learning', subjects: 'Math for ML → 100 Days of DL → PyTorch → NLP → DL Projects → Fine-Tuning → RL', days: TOTAL_S2_DAYS, color: '#0369A1' },
                { label: 'Software Engineering', subjects: 'FastAPI → Docker → Git & GitHub → Feature Engineering', days: TOTAL_S3_DAYS, color: '#047857' },
                { label: 'DSA — Striver A2Z', subjects: '474 problems · Step 1–18 · 2 problems/day', days: TOTAL_DSA_DAYS, color: '#B45309' },
              ].map((c, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-white font-['Inter']">{c.label}</p>
                    <p className="text-[9px] font-bold font-['Space_Mono']" style={{ color: c.color }}>
                      {c.days} days
                    </p>
                  </div>
                  <p className="text-[10px] text-white/40 font-['Inter'] leading-relaxed">{c.subjects}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBatch;
