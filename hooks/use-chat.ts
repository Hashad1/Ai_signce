import { useState, useCallback } from 'react';
import { createChat, createMessage, getChatMessages, getUserChats, deleteChat } from '@/lib/supabase/helpers';
import type { Chat, ChatMessage } from '@/lib/supabase/types';

export function useChat(userId: string) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // جلب جميع المحادثات للمستخدم
  const fetchChats = useCallback(async () => {
    setLoading(true);
    try {
      const userChats = await getUserChats(userId);
      setChats(userChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // إنشاء محادثة جديدة
  const startNewChat = useCallback(async (title: string) => {
    setLoading(true);
    try {
      const newChat = await createChat(userId, title);
      setChats(prev => [newChat, ...prev]);
      setCurrentChat(newChat);
      setMessages([]);
      return newChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // حذف محادثة
  const removeChat = useCallback(async (chatId: string) => {
    setLoading(true);
    try {
      await deleteChat(chatId);
      setChats(prev => prev.filter(chat => chat.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [currentChat]);

  // تحميل رسائل محادثة معينة
  const loadChat = useCallback(async (chatId: string) => {
    setLoading(true);
    try {
      const chat = chats.find(c => c.id === chatId);
      if (!chat) throw new Error('Chat not found');
      
      const chatMessages = await getChatMessages(chatId);
      setCurrentChat(chat);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading chat:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [chats]);

  // إرسال رسالة جديدة
  const sendMessage = useCallback(async (content: string) => {
    if (!currentChat) throw new Error('No active chat');
    
    try {
      // إضافة رسالة المستخدم
      const userMessage = await createMessage(currentChat.id, content, 'user');
      setMessages(prev => [...prev, userMessage]);

      // هنا يمكنك إضافة منطق معالجة الرد من المساعد
      // على سبيل المثال، يمكنك استدعاء API للحصول على رد
      
      // إضافة رد المساعد (هذا مثال بسيط)
      const assistantMessage = await createMessage(
        currentChat.id,
        'شكراً لرسالتك! هذا رد تجريبي.',
        'assistant'
      );
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [currentChat]);

  return {
    chats,
    currentChat,
    messages,
    loading,
    fetchChats,
    startNewChat,
    removeChat,
    loadChat,
    sendMessage,
  };
} 