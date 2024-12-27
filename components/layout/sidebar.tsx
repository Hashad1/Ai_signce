'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, LogOut } from 'lucide-react';
import { useAuthContext } from '@/contexts/auth-context';
import { useChatContext } from '@/contexts/chat-context';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { signOut } = useAuthContext();
  const { chats, currentChat, startNewChat, loadChat, loading } = useChatContext();

  const handleNewChat = async () => {
    try {
      const newChat = await startNewChat('محادثة جديدة');
      await loadChat(newChat.id);
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

  return (
    <div className="flex h-full w-[300px] flex-col bg-card">
      <div className="flex items-center justify-between p-4">
        <Button onClick={handleNewChat} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          محادثة جديدة
        </Button>
      </div>

      <ScrollArea className="flex-1 border-t">
        <div className="p-2 space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className={cn(
                'w-full px-4 py-2 text-right rounded-lg hover:bg-accent/50 transition-colors',
                currentChat?.id === chat.id && 'bg-accent'
              )}
              disabled={loading}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="w-full gap-2"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
} 