'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { LoadingState } from '@/components/shared/loading-state';
import { toast } from 'sonner';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { forgotPasswordSchema, type ForgotPasswordInput, authErrors } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setIsLoading(true);
      await resetPassword(data.email);
      setIsSuccess(true);
      toast.success('تم إرسال رابط إعادة تعيين كلمة المرور', {
        description: 'يرجى التحقق من بريدك الإلكتروني',
      });
    } catch (err) {
      const message = 
        err instanceof Error 
          ? (authErrors[err.message as keyof typeof authErrors] || err.message)
          : authErrors.default;
      
      toast.error('فشل إرسال رابط إعادة تعيين كلمة المرور', {
        description: message,
      });
      
      form.setError('root', { message });
    } finally {
      setIsLoading(false);
    }
  };

  if (form.formState.isSubmitting || isLoading) {
    return <LoadingState message="جاري إرسال رابط إعادة تعيين كلمة المرور..." />;
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">نسيت كلمة المرور؟</h1>
            {!isSuccess ? (
              <p className="text-sm text-muted-foreground">
                أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
              </p>
            )}
          </div>
        </CardHeader>
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CardContent className="space-y-4">
                {form.formState.errors.root && (
                  <div className="flex items-center gap-2 p-3 text-sm text-white bg-destructive/90 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    <p>{form.formState.errors.root.message}</p>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@domain.com"
                          autoComplete="email"
                          autoFocus
                          className={cn(
                            'transition-colors',
                            form.formState.errors.email && 'border-destructive'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting || isLoading}
                >
                  إرسال رابط إعادة التعيين
                </Button>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  العودة إلى تسجيل الدخول
                </Link>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                إذا كان البريد الإلكتروني مسجلاً لدينا، ستتلقى رابطاً لإعادة تعيين كلمة المرور.
              </p>
              <p className="text-sm text-muted-foreground">
                يرجى التحقق من صندوق الوارد والبريد غير المرغوب فيه.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSuccess(false)}
            >
              إرسال رابط جديد
            </Button>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة إلى تسجيل الدخول
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
} 