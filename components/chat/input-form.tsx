"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useSendMessage } from "@/hooks/use-send-message";

export function InputForm() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[52px] max-h-32 resize-none"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          className="h-[52px] w-[52px] neon-glow"
          disabled={!message.trim() || isLoading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}