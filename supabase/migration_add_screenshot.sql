-- Migration SQL: Add screenshot_path column to marketing_reports
ALTER TABLE marketing_reports ADD COLUMN IF NOT EXISTS screenshot_path TEXT;
