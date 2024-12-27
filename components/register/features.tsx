"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  "إرشاد شخصي في كل خطوة من خطوات البحث",
  "وصول غير محدود لأدوات البحث المتقدمة",
  "دعم فني متواصل على مدار الساعة",
  "تنسيق تلقائي للمراجع والاقتباسات",
  "تحليل وتدقيق لغوي متقدم",
  "مصادر علمية موثوقة ومحدثة"
];

export function RegisterFeatures() {
  return (
    <Card className="elevation-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">المميزات الرئيسية</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-primary shrink-0" />
            <span className="text-white/90">{feature}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}