"use client";

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Bot, User, FileText, Mic, Download, Copy, Check } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import type { ChatMessage } from "@/lib/supabase/types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [isCopied, setIsCopied] = useState(false);
  const isBot = message.role === "assistant";
  const hasAttachment = message.attachment_url;
  const isAudio = hasAttachment && message.attachment_type === "audio";
  const isFile = hasAttachment && !isAudio;

  const handleDownload = () => {
    if (message.attachment_url) {
      window.open(message.attachment_url, "_blank");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      toast.success('تم نسخ النص');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error('فشل نسخ النص');
    }
  };

  return (
    <article
      className={cn(
        "flex gap-3 max-w-[80%] group",
        isBot ? "mr-auto" : "ml-auto flex-row-reverse"
      )}
      aria-label={`رسالة من ${isBot ? 'المساعد' : 'المستخدم'}`}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isBot ? "bg-primary/20" : "bg-secondary/20"
        )}
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-primary" aria-hidden="true" />
        ) : (
          <User className="w-5 h-5 text-secondary" aria-hidden="true" />
        )}
      </div>
      <div className="space-y-1 flex-1">
        <div
          className={cn(
            "rounded-lg p-4 elevation-1 relative",
            isBot ? "bg-card/50" : "bg-secondary/10"
          )}
        >
          {message.content && (
            <div className="relative">
              <p className="text-white whitespace-pre-wrap mb-2">{message.content}</p>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 absolute -left-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
                aria-label="نسخ النص"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}
          {hasAttachment && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-white/5 rounded">
              {isAudio ? (
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-sm text-white/80">تسجيل صوتي</span>
                  </div>
                  <audio
                    controls
                    className="w-full"
                    aria-label="تشغيل التسجيل الصوتي"
                  >
                    <source src={message.attachment_url} type="audio/webm" />
                    متصفحك لا يدعم تشغيل الملفات الصوتية
                  </audio>
                </div>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-sm text-white/80 flex-1 truncate">
                    {message.attachment_name || "ملف مرفق"}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={handleDownload}
                    aria-label="تحميل الملف"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <time className="text-xs text-white/40 px-1" dateTime={message.created_at}>
          {format(new Date(message.created_at), "p", { locale: ar })}
        </time>
      </div>
    </article>
  );
}