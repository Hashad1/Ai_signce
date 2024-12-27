'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDatabase } from '@/lib/supabase/seed-data';
import { toast } from 'sonner';

export default function SeedPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSeed() {
    try {
      setIsLoading(true);
      const success = await seedDatabase();
      
      if (success) {
        toast.success('تم إضافة البيانات التجريبية بنجاح');
      } else {
        toast.error('حدث خطأ أثناء إضافة البيانات التجريبية');
      }
    } catch (error) {
      console.error('خطأ:', error);
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-2xl py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">إضافة بيانات تجريبية</h1>
        <p className="text-muted-foreground">
          استخدم هذه الصفحة لإضافة بيانات تجريبية إلى قاعدة ��لبيانات
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">البيانات التي سيتم إضافتها:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>مستخدم تجريبي (test@example.com)</li>
            <li>ملف شخصي للمستخدم</li>
            <li>محادثة تجريبية</li>
            <li>4 رسائل تجريبية</li>
          </ul>
        </div>

        <Button
          onClick={handleSeed}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'جاري الإضافة...' : 'إضافة البيانات التجريبية'}
        </Button>
      </div>
    </div>
  );
} 