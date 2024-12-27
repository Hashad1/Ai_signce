import { supabase } from '../client';
import type { ChatMessage } from '../types';

export async function sendMessage(sessionId: string, content: string) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      user_id: user.data.user.id,
      content,
      role: 'user'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(sessionId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export function subscribeToMessages(
  sessionId: string,
  callback: (message: ChatMessage) => void
) {
  return supabase
    .channel(`messages:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`
      },
      (payload) => callback(payload.new as ChatMessage)
    )
    .subscribe();
}