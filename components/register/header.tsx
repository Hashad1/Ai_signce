"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RegisterHeader() {
  return (
    <Card className="mb-12 elevation-3">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center text-white neon-text">
          ابدأ رحلتك المجانية مع الباحث العلمي الذكي
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl text-white/90 text-center">
          سجل الآن واحصل على جميع المميزات مجاناً، بدون أي التزامات
        </p>
      </CardContent>
    </Card>
  );
}