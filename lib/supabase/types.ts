export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Chat = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  attachment_url?: string;
  attachment_type?: 'audio' | 'file';
  attachment_name?: string;
  created_at: string;
};

export type AttachmentType = 'audio' | 'file';

export interface FileUploadResponse {
  url: string;
  name: string;
  type: AttachmentType;
}