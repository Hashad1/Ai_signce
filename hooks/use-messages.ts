"use client";

import { useState, useEffect } from "react";
import { getMessages, subscribeToMessages } from "@/lib/supabase/api/messages";
import type { ChatMessage } from "@/lib/supabase/types";

export function useMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: ReturnType<typeof subscribeToMessages>;

    async function initialize() {
      try {
        const initialMessages = await getMessages("default");
        setMessages(initialMessages);

        subscription = subscribeToMessages("default", (message) => {
          setMessages((prev) => [...prev, message]);
        });
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    }

    initialize();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { messages, loading };
}