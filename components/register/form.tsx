"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signUp } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import { validateWhatsApp, formatWhatsApp } from "@/lib/utils/validation";

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!validateWhatsApp(formData.whatsapp)) {
      setError("رقم الواتساب غير صحيح. يجب أن يبدأ برمز الدولة (مثال: ‎+966555555555)");
      setIsSubmitting(false);
      return;
    }

    const formattedWhatsApp = formatWhatsApp(formData.whatsapp);

    try {
      const { error: signUpError } = await signUp(
        formattedWhatsApp,
        formData.password,
        formData.fullName
      );

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="elevation-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          التسجيل المجاني
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <Input
            placeholder="الاسم الكامل"
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            type="tel"
            placeholder="رقم الواتساب (مثال: ‎+966555555555)"
            required
            dir="ltr"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            type="password"
            placeholder="كلمة المرور"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button
            type="submit"
            className="w-full neon-glow neon-pulse"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري التسجيل..." : "سجل الآن مجاناً"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}