'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';
import { useAuthContext } from './auth-context';
import type { Chat, ChatMessage } from '@/lib/supabase/types';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  messages: ChatMessage[];
  loading: boolean;
  fetchChats: () => Promise<void>;
  startNewChat: (title: string) => Promise<Chat>;
  removeChat: (chatId: string) => Promise<void>;
  loadChat: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const chat = useChat(user?.id || '');

  // تحميل المحادثات عند تغيير المستخدم
  useEffect(() => {
    if (user) {
      chat.fetchChats();
    }
  }, [user, chat.fetchChats]);

  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
} 