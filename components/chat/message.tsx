"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import type { ChatMessage } from "@/lib/supabase/types";

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isBot = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isBot ? "mr-auto" : "ml-auto flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "bg-primary/20" : "bg-secondary/20"
        )}
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-primary" />
        ) : (
          <User className="w-5 h-5 text-secondary" />
        )}
      </div>
      <div className="space-y-1">
        <div
          className={cn(
            "rounded-lg p-4 elevation-1",
            isBot ? "bg-card/50" : "bg-secondary/10"
          )}
        >
          <p className="text-white whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-white/40 px-1">
          {format(new Date(message.created_at), "p", { locale: ar })}
        </p>
      </div>
    </div>
  );
}