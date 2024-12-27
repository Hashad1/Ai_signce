"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GetStartedForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <Card className="max-w-md mx-auto elevation-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-white">
          سجل الآن مجاناً
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
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            type="tel"
            placeholder="رقم الواتساب (مثال: ‎+966555555555)"
            required
            dir="ltr"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            type="password"
            placeholder="كلمة المرور"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button 
            type="submit" 
            className="w-full neon-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}