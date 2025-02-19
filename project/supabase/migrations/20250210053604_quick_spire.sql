/*
  # Create students and profiles tables

  1. New Tables
    - `students` - Stores verified IFRI student information
      - `matricule` (text, primary key) - Student ID number
      - `first_name` (text) - Student's first name
      - `last_name` (text) - Student's last name
      - `email` (text) - Student's email
      - `phone` (text) - Student's phone number
      - `program` (text) - Student's program/field of study
      - `year` (int) - Current year of study
      - `parent_name` (text) - Parent's full name
      - `parent_phone` (text) - Parent's phone number
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `profiles` - Stores additional user information
      - `id` (uuid, primary key) - Links to auth.users
      - `matricule` (text) - References students table
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read their own data
*/

-- Create students table for verified IFRI students
CREATE TABLE IF NOT EXISTS students (
  matricule text PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  program text NOT NULL,
  year int NOT NULL,
  parent_name text,
  parent_phone text,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table to link auth.users with students
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  matricule text REFERENCES students(matricule),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Students can read their own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (
    matricule IN (
      SELECT matricule 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Profiles are viewable by owner"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());