"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  FormDescription,
} from '@/components/ui/form';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { LoadingState } from '@/components/shared/loading-state';
import { SocialButtons } from '@/components/auth/social-buttons';
import { toast } from 'sonner';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { registerSchema, type RegisterInput, authErrors } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      await signUp(data.email, data.password);
      toast.success('تم إنشاء الحساب بنجاح', {
        description: 'تم إرسال رابط تأكيد البريد الإلكتروني. يرجى التحقق من بريدك الإلكتروني.',
      });
      router.push('/login');
    } catch (err) {
      const message = 
        err instanceof Error 
          ? (authErrors[err.message as keyof typeof authErrors] || err.message)
          : authErrors.default;
      
      toast.error('فشل إنشاء الحساب', {
        description: message,
      });
      
      form.setError('root', { message });
    } finally {
      setIsLoading(false);
    }
  };

  if (form.formState.isSubmitting || isLoading) {
    return <LoadingState message="جاري إنشاء الحساب..." />;
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">إنشاء حساب جديد</h1>
            <p className="text-sm text-muted-foreground">
              أدخل بياناتك لإنشاء حساب جديد
            </p>
          </div>
        </CardHeader>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className={cn(
                            'pr-4 transition-colors',
                            form.formState.errors.password && 'border-destructive'
                          )}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-2 top-1/2 -translate-y-1/2 h-auto py-1 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وتتضمن حرفاً كبيراً، وحرفاً صغيراً، ورقماً
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className={cn(
                            'pr-4 transition-colors',
                            form.formState.errors.confirmPassword && 'border-destructive'
                          )}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-2 top-1/2 -translate-y-1/2 h-auto py-1 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting || isLoading}
              >
                {form.formState.isSubmitting || isLoading ? (
                  'جاري إنشاء الحساب...'
                ) : (
                  'إنشاء حساب'
                )}
              </Button>
              <SocialButtons />
              <p className="text-sm text-center text-muted-foreground">
                لديك حساب بالفعل؟{' '}
                <Link 
                  href="/login" 
                  className="font-medium text-primary hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}