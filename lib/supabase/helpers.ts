import { supabase } from './client';
import type { Profile, Chat, ChatMessage, FileUploadResponse } from './types';

// وظائف إدارة الملف الشخصي
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

// وظائف إدارة المحادثات
export async function createChat(userId: string, title: string): Promise<Chat> {
  const { data, error } = await supabase
    .from('chats')
    .insert({ user_id: userId, title })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserChats(userId: string): Promise<Chat[]> {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteChat(chatId: string) {
  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('id', chatId);

  if (error) throw error;
}

// وظائف إدارة الرسائل
export async function createMessage(
  chatId: string,
  content: string,
  role: 'user' | 'assistant',
  attachment?: {
    url: string;
    type: 'audio' | 'file';
    name?: string;
  }
): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      chat_id: chatId,
      content,
      role,
      attachment_url: attachment?.url,
      attachment_type: attachment?.type,
      attachment_name: attachment?.name,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getChatMessages(chatId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

// وظائف إدارة الملفات
export async function uploadFile(
  file: File,
  userId: string
): Promise<FileUploadResponse> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('chat-attachments')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('chat-attachments')
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    name: file.name,
    type: 'file'
  };
}

export async function uploadAudio(
  audioBlob: Blob,
  userId: string
): Promise<FileUploadResponse> {
  const fileName = `${userId}/${Date.now()}.webm`;
  const filePath = `audio/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('chat-attachments')
    .upload(filePath, audioBlob);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('chat-attachments')
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    name: 'تسجيل صوتي',
    type: 'audio'
  };
}

// وظيفة مساعدة للتحقق من وجود المستخدم
export async function ensureUserProfile(userId: string) {
  const profile = await getProfile(userId);
  if (!profile) {
    const { error } = await supabase
      .from('profiles')
      .insert({ id: userId });
    if (error) throw error;
  }
} 