/*
  # Chat System Schema Update

  1. New Tables
    - `users_status`
      - `user_id` (uuid, references auth.users)
      - `status` (text, active/inactive)
      - `last_login` (timestamptz)
      - `profile_picture_url` (text, nullable)
    
    - `chat_direct_messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references auth.users)
      - `receiver_id` (uuid, references auth.users)
      - `content` (text)
      - `message_type` (text: text, image, file)
      - `created_at` (timestamptz)
      - `read_at` (timestamptz, nullable)
      - `deleted_at` (timestamptz, nullable)

  2. Security
    - Enable RLS on all tables
    - Add policies for user status and messages
    - Add indexes for performance optimization

  3. Changes
    - Add status tracking for users
    - Add direct messaging capability
*/

-- Create enum for message types
CREATE TYPE message_type AS ENUM ('text', 'image', 'file');

-- Create users_status table
CREATE TABLE IF NOT EXISTS users_status (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  last_login timestamptz DEFAULT now(),
  profile_picture_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_direct_messages table
CREATE TABLE IF NOT EXISTS chat_direct_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  message_type message_type DEFAULT 'text'::message_type,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz,
  deleted_at timestamptz,
  CONSTRAINT different_users CHECK (sender_id != receiver_id)
);

-- Enable RLS
ALTER TABLE users_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_direct_messages ENABLE ROW LEVEL SECURITY;

-- Users status policies
CREATE POLICY "Users can view any user status"
  ON users_status FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own status"
  ON users_status FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Chat direct messages policies
CREATE POLICY "Users can view their direct messages"
  ON chat_direct_messages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send direct messages"
  ON chat_direct_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can soft delete their messages"
  ON chat_direct_messages FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (sender_id, receiver_id) AND 
    deleted_at IS NULL
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_status_user_id ON users_status(user_id);
CREATE INDEX IF NOT EXISTS idx_users_status_status ON users_status(status);
CREATE INDEX IF NOT EXISTS idx_users_status_last_login ON users_status(last_login);

CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON chat_direct_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_receiver ON chat_direct_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_direct_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_read_status ON chat_direct_messages(read_at) WHERE read_at IS NULL;

-- Create function to handle new user status
CREATE OR REPLACE FUNCTION handle_new_user_status()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users_status (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user status
CREATE OR REPLACE TRIGGER on_auth_user_created_status
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_status();

-- Create function to update last login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS trigger AS $$
BEGIN
  UPDATE public.users_status
  SET last_login = now(),
      updated_at = now()
  WHERE user_id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating last login
CREATE OR REPLACE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION update_last_login();