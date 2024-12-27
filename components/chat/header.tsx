"use client";

import { Bot } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="border-b border-white/10 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center gap-3">
        <div className="relative w-8 h-8">
          <Bot className="w-8 h-8 text-primary animate-pulse" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">الباحث العلمي</h1>
          <p className="text-sm text-white/60">متصل</p>
        </div>
      </div>
    </header>
  );
}