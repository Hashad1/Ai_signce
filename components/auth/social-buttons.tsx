'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useAuthContext } from '@/contexts/auth-context';
import type { SocialProvider } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface SocialButtonsProps {
  className?: string;
}

export function SocialButtons({ className }: SocialButtonsProps) {
  const { signInWithSocial } = useAuthContext();
  const [isLoading, setIsLoading] = useState<SocialProvider | null>(null);

  const handleSocialSignIn = async (provider: SocialProvider) => {
    try {
      setIsLoading(provider);
      await signInWithSocial(provider);
    } catch (err) {
      toast.error('فشل تسجيل الدخول', {
        description: 'حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            أو تسجيل الدخول باستخدام
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading !== null}
          onClick={() => handleSocialSignIn('google')}
        >
          {isLoading === 'google' ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="h-4 w-4" />
          )}
          <span className="mr-2">Google</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading !== null}
          onClick={() => handleSocialSignIn('github')}
        >
          {isLoading === 'github' ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="h-4 w-4" />
          )}
          <span className="mr-2">GitHub</span>
        </Button>
      </div>
    </div>
  );
} 