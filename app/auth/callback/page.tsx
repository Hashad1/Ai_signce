'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingState } from '@/components/shared/loading-state';
import { toast } from 'sonner';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  useEffect(() => {
    if (error) {
      toast.error('فشل تسجيل الدخول', {
        description: error_description || 'حدث خطأ أثناء محاولة تسجيل الدخول',
      });
      router.push('/login');
      return;
    }

    // تأخير قصير للسماح للمصادقة بالاكتمال
    const timer = setTimeout(() => {
      router.push('/chat');
    }, 1000);

    return () => clearTimeout(timer);
  }, [error, error_description, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingState message="جاري إكمال عملية تسجيل الدخول..." />
    </div>
  );
} 