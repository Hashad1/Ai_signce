'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { LoadingState } from '@/components/shared/loading-state';
import { getProfile, updateProfile } from '@/lib/supabase/helpers';
import type { Profile } from '@/lib/supabase/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await getProfile(user.id);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ أث��اء تحميل الملف الشخصي');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setSaving(true);
    setError('');

    try {
      await updateProfile(user.id, {
        username: profile.username,
        full_name: profile.full_name,
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ التغييرات');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="جاري تحميل الملف الشخصي..." />;
  }

  if (!profile) {
    return <div>لم يتم العثور على الملف الشخصي</div>;
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">الملف الشخصي</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-white bg-destructive/90 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                اسم المستخدم
              </label>
              <Input
                id="username"
                value={profile.username || ''}
                onChange={(e) =>
                  setProfile((prev) =>
                    prev ? { ...prev, username: e.target.value } : null
                  )
                }
                placeholder="أدخل اسم المستخدم"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                الاسم الكامل
              </label>
              <Input
                id="fullName"
                value={profile.full_name || ''}
                onChange={(e) =>
                  setProfile((prev) =>
                    prev ? { ...prev, full_name: e.target.value } : null
                  )
                }
                placeholder="أدخل اسمك الكامل"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={saving}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 