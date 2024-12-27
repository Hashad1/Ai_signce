"use client";

import { useState } from "react";
import { sendMessage } from "@/lib/supabase/api/messages";

export function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = async (content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await sendMessage("default", content);
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage: send, isLoading, error };
}