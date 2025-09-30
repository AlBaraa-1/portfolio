/*
  # Portfolio Database Schema

  ## Overview
  Creates tables for tracking project views, contact form submissions, and visitor analytics
  for the portfolio website.

  ## New Tables
  
  ### 1. `project_views`
  Tracks how many times each project has been viewed
  - `id` (uuid, primary key) - Unique identifier for each view record
  - `project_id` (text) - ID of the project being viewed
  - `viewed_at` (timestamptz) - Timestamp when the project was viewed
  - `user_agent` (text, optional) - Browser user agent for analytics
  - `ip_hash` (text, optional) - Hashed IP address for privacy-compliant analytics
  
  ### 2. `contact_submissions`
  Stores contact form submissions from visitors
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `name` (text) - Name of the person contacting
  - `email` (text) - Email address for response
  - `subject` (text, optional) - Subject line of the message
  - `message` (text) - The actual message content
  - `submitted_at` (timestamptz) - When the form was submitted
  - `status` (text) - Processing status (new, read, responded)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `github_activity_cache`
  Caches GitHub activity data to reduce API calls
  - `id` (uuid, primary key) - Unique identifier
  - `username` (text) - GitHub username
  - `activity_data` (jsonb) - Cached GitHub activity data
  - `cached_at` (timestamptz) - When the data was cached
  - `expires_at` (timestamptz) - When the cache should be refreshed

  ## Security
  - Enable RLS on all tables
  - Public read access for project views (analytics)
  - Public insert access for contact submissions and project views
  - Authenticated-only access for contact submission reads
  - Public read access for GitHub activity cache

  ## Notes
  - IP addresses are hashed for privacy compliance
  - Contact form submissions are protected but can be inserted by anyone
  - GitHub activity cache expires after 1 hour to keep data fresh
*/

-- Create project_views table
CREATE TABLE IF NOT EXISTS project_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text NOT NULL,
  viewed_at timestamptz DEFAULT now(),
  user_agent text,
  ip_hash text,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create github_activity_cache table
CREATE TABLE IF NOT EXISTS github_activity_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  activity_data jsonb NOT NULL,
  cached_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '1 hour')
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_project_views_project_id ON project_views(project_id);
CREATE INDEX IF NOT EXISTS idx_project_views_viewed_at ON project_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_github_cache_username ON github_activity_cache(username);
CREATE INDEX IF NOT EXISTS idx_github_cache_expires ON github_activity_cache(expires_at);

-- Enable Row Level Security
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_activity_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_views
CREATE POLICY "Anyone can view project statistics"
  ON project_views
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert project views"
  ON project_views
  FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for github_activity_cache
CREATE POLICY "Anyone can view GitHub activity cache"
  ON github_activity_cache
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert GitHub activity cache"
  ON github_activity_cache
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update GitHub activity cache"
  ON github_activity_cache
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);