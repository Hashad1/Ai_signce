'use client';

import { useEffect, useState } from 'react';
import { testConnection } from '@/lib/supabase/test-connection';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function TestPage() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    const connected = await testConnection();
    setIsConnected(connected);
  }

  async function testAuth() {
    try {
      setIsLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session) {
        toast.success('تم التحقق من المصادقة بنجاح', {
          description: `مرحباً ${session.user.email}`
        });
      } else {
        toast.info('لم يتم تسجيل الدخول', {
          description: 'قم بتسجيل الدخول للمتابعة'
        });
      }
    } catch (error) {
      console.error('خطأ في المصادقة:', error);
      toast.error('خطأ في المصادقة');
    } finally {
      setIsLoading(false);
    }
  }

  async function testStorage() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.getBucket('chat-attachments');
      if (error) throw error;
      
      toast.success('تم التحقق من التخزين بنجاح', {
        description: 'يمكن الوصول إلى مساحة التخزين'
      });
    } catch (error) {
      console.error('خطأ في التخزين:', error);
      toast.error('خطأ في الوصول إلى التخزين');
    } finally {
      setIsLoading(false);
    }
  }

  async function testDatabase() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('profiles').select('count');
      if (error) throw error;
      
      toast.success('تم التحقق من قاعدة البيانات بنجاح', {
        description: 'يمكن الوصول إلى الجداول'
      });
    } catch (error) {
      console.error('خطأ في قاعدة البيانات:', error);
      toast.error('خطأ في الوصول إلى قاعدة البيانات');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-2xl py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">صفحة الاختبار</h1>
        <p className="text-muted-foreground">
          استخدم هذه الصفحة للتحقق من صحة إعداد Supabase
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">حالة الاتصال</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {isConnected === null
              ? 'جاري التحقق...'
              : isConnected
              ? '✅ متصل بنجاح'
              : '❌ غير متصل'}
          </p>
          <Button
            onClick={checkConnection}
            disabled={isLoading}
          >
            إعادة التحقق
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Button
            onClick={testAuth}
            disabled={isLoading || !isConnected}
            className="w-full"
          >
            اختبار المصادقة
          </Button>
          <Button
            onClick={testStorage}
            disabled={isLoading || !isConnected}
            className="w-full"
          >
            اختبار ا��تخزين
          </Button>
          <Button
            onClick={testDatabase}
            disabled={isLoading || !isConnected}
            className="w-full"
          >
            اختبار قاعدة البيانات
          </Button>
        </div>
      </div>
    </div>
  );
} 