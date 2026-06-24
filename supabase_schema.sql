-- ============================================================
-- CuriousMe — Supabase schema
-- Two features: AI Batch (localStorage, no DB) + Explorer (this file)
-- Run this whole file in a NEW Supabase project's SQL editor.
-- RLS is left disabled (single-user app using the anon key).
-- ============================================================

-- ========================================================
-- TABLE 1: explorer_topics
-- One row per generated weekly exploration package.
-- ========================================================
CREATE TABLE IF NOT EXISTS explorer_topics (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_data    JSONB,                       -- { title, subtitle, domain, whyItMatters, bigQuestion, ignitionHook, roadmapPosition, ... }
  concepts      JSONB   DEFAULT '[]',         -- [{ title, summary, whyForYou, domain, depthLevel }]
  books         JSONB   DEFAULT '[]',         -- [{ title, author, why, difficulty, readThisIf }]
  papers        JSONB   DEFAULT '[]',         -- [{ title, authors, journal, year, plainSummary, mindblowFactor }]
  domain        TEXT,
  week_number   INTEGER,
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  read_concepts JSONB   DEFAULT '[]',         -- array of concept titles marked read
  notes         TEXT    DEFAULT '',
  depth_score   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_explorer_topics_completed
  ON explorer_topics (completed, created_at DESC);

-- ========================================================
-- TABLE 2: knowledge_depth
-- One row per domain, tracking how deep you've gone.
-- Special row: domain = '_streak' stores the explorer day-streak
-- in its brain_drops / topics_explored columns.
-- ========================================================
CREATE TABLE IF NOT EXISTS knowledge_depth (
  domain          TEXT PRIMARY KEY,
  depth_score     INTEGER DEFAULT 0,
  topics_explored INTEGER DEFAULT 0,
  concepts_read   INTEGER DEFAULT 0,
  brain_drops     INTEGER DEFAULT 0,
  last_updated    TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- TABLE 3: brain_drops
-- Quick captured thoughts/insights tied to a topic.
-- ========================================================
CREATE TABLE IF NOT EXISTS brain_drops (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content     TEXT NOT NULL,
  topic_title TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brain_drops_created
  ON brain_drops (created_at DESC);

-- ========================================================
-- TABLE 4: jarvis_memory
-- Long-term memory store used by lib/globalMemory.js
-- (Explorer saves "studied topic" memories here).
-- ========================================================
CREATE TABLE IF NOT EXISTS jarvis_memory (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  memory_type      TEXT DEFAULT 'global',
  content          TEXT,
  importance       INTEGER DEFAULT 5,
  context_snapshot TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  last_referenced  TIMESTAMPTZ DEFAULT NOW(),
  reference_count  INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_jarvis_memory_type
  ON jarvis_memory (memory_type, importance DESC, created_at DESC);

-- ========================================================
-- TABLE 5: batch_completions
-- One row per subject per study day. Stores full lecture/module
-- context so records are self-describing and module completion
-- can be detected by querying completed day_nums per subject.
-- ========================================================
CREATE TABLE IF NOT EXISTS batch_completions (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date_str       TEXT NOT NULL,           -- 'YYYY-MM-DD'
  day_num        INTEGER NOT NULL,        -- study day number (1-indexed Mon–Sat)
  subject        TEXT NOT NULL,           -- 'S1' | 'S2' | 'S3' | 'S4'
  completed      BOOLEAN DEFAULT FALSE,
  lecture_title  TEXT,
  module_name    TEXT,
  lecture_index  INTEGER,                 -- 0-indexed position in flattened sequence
  completed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date_str, subject)
);
CREATE INDEX IF NOT EXISTS idx_batch_completions_date
  ON batch_completions (date_str DESC);
CREATE INDEX IF NOT EXISTS idx_batch_completions_subject
  ON batch_completions (subject, date_str DESC);

-- ========================================================
-- TABLE 6: batch_dpps
-- One row per DPP generation. Stores the problems as JSONB
-- plus the memory context string fed to Groq.
-- ========================================================
CREATE TABLE IF NOT EXISTS batch_dpps (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date_str      TEXT NOT NULL,
  day_num       INTEGER NOT NULL,
  problems      JSONB DEFAULT '[]',
  context_used  TEXT,
  generated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date_str)
);
CREATE INDEX IF NOT EXISTS idx_batch_dpps_date
  ON batch_dpps (date_str DESC);
