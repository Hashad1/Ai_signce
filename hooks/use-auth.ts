import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User, Provider, AuthError } from '@supabase/supabase-js';
import { ensureUserProfile } from '@/lib/supabase/helpers';
import { toast } from 'sonner';

export type SocialProvider = Extract<Provider, 'google' | 'github'>;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getInitialSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      setUser(session?.user ?? null);
      if (session?.user) {
        await ensureUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error getting session:', error);
      toast.error('Failed to get session');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          await ensureUserProfile(session.user.id);
        } catch (error) {
          console.error('Error ensuring user profile:', error);
        }
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [getInitialSession]);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    switch (error.message) {
      case 'Invalid login credentials':
        toast.error('Invalid email or password');
        break;
      case 'Email not confirmed':
        toast.error('Please confirm your email address');
        break;
      default:
        toast.error(error.message);
    }
    throw error;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const signInWithSocial = async (provider: SocialProvider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      handleAuthError(error as AuthError);
    }
  };

  return {
    user,
    loading,
    signIn,
    signInWithSocial,
    signOut,
  };
}