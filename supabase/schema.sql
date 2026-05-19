-- Migration SQL: Create marketing_reports table
CREATE TABLE IF NOT EXISTS marketing_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  category TEXT,
  product_type TEXT,
  input JSONB NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for faster lookups
CREATE INDEX IF NOT EXISTS idx_marketing_reports_created_at ON marketing_reports (created_at DESC);

-- Phase 8 Migration: Add screenshot_path column
ALTER TABLE marketing_reports ADD COLUMN IF NOT EXISTS screenshot_path TEXT;
