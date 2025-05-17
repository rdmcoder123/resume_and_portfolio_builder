/*
  # Create initial schema for resume and portfolio builder

  1. New Tables
    - `profiles` - Stores user profile information
      - `id` (uuid, primary key) - References auth.users.id
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text)
    
    - `resumes` - Stores resume data
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid) - References auth.users.id
      - `title` (text)
      - `content` (jsonb) - Stores resume content structure
      - `template` (text)
    
    - `portfolios` - Stores portfolio data
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid) - References auth.users.id
      - `title` (text)
      - `content` (jsonb) - Stores portfolio content structure
      - `template` (text)
      - `published_url` (text)
      - `netlify_site_id` (text)

  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated users to:
      - Read their own data
      - Insert their own data
      - Update their own data
      - Delete their own data
*/

-- Create profiles table to store user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT
);

-- Create resumes table to store resume data
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Resume',
  content JSONB NOT NULL DEFAULT '{}'::JSONB,
  template TEXT NOT NULL DEFAULT 'Professional'
);

-- Create portfolios table to store portfolio data
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'My Portfolio',
  content JSONB NOT NULL DEFAULT '{}'::JSONB,
  template TEXT NOT NULL DEFAULT 'Modern',
  published_url TEXT,
  netlify_site_id TEXT
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for resumes table
CREATE POLICY "Users can read their own resumes"
  ON resumes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resumes"
  ON resumes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes"
  ON resumes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes"
  ON resumes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for portfolios table
CREATE POLICY "Users can read their own portfolios"
  ON portfolios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolios"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolios"
  ON portfolios FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at column
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON resumes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
BEFORE UPDATE ON portfolios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();