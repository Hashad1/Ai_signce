import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../client';

export function useRealtime<T>(
  channel: string,
  event: string,
  callback: (payload: T) => void
) {
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const sub = supabase.channel(channel)
      .on('broadcast', { event }, (payload) => callback(payload.payload as T))
      .subscribe();

    setSubscription(sub);

    return () => {
      sub.unsubscribe();
    };
  }, [channel, event, callback]);

  return subscription;
}