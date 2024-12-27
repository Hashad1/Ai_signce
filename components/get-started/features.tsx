"use client";

import { Check } from "lucide-react";

const features = [
  "إرشاد شخصي في كل خطوة",
  "أدوات متقدمة للبحث العلمي",
  "دعم فني على مدار الساعة",
  "مصادر علمية موثوقة",
  "تنسيق تلقائي للمراجع",
  "تحليل وتدقيق لغوي"
];

export function GetStartedFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 text-white p-4 rounded-lg elevation-1"
        >
          <Check className="h-5 w-5 text-primary" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
}