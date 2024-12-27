"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { useMessages } from "@/hooks/use-messages";
import { LoadingState } from "@/components/shared/loading-state";

export function ChatWindow() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading } = useMessages();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <LoadingState message="جاري تحميل المحادثة..." />;
  }

  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="container mx-auto px-4">
        <div
          role="log"
          aria-label="محادثة"
          aria-live="polite"
          className="space-y-4"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}