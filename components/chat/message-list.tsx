"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { useMessages } from "@/hooks/use-messages";
import { LoadingSpinner } from "./loading-spinner";

export function MessageList() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading } = useMessages();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      <div className="container mx-auto px-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}