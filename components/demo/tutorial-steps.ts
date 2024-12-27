"use client";

import { Bot, User, Sparkles, Search } from "lucide-react";

export const tutorialSteps = [
  {
    title: "مرحباً بك في الباحث العلمي",
    description: "مساعدك الشخصي في رحلة البحث العلمي",
    icon: Bot,
  },
  {
    title: "طرح الأسئلة",
    description: "اطرح أسئلتك بكل سهولة وبلغتك الطبيعية",
    icon: User,
    demo: "كيف يمكنني صياغة فرضيات البحث؟",
  },
  {
    title: "إجابات دقيقة",
    description: "احصل على إجابات مدروسة ومبنية على أسس علمية",
    icon: Sparkles,
    demoList: [
      "تحديد المتغيرات بدقة",
      "صياغة العلاقة المتوقعة",
      "التأكد من قابلية الاختبار",
    ],
  },
  {
    title: "البحث في المصادر",
    description: "الوصول إلى مصادر علمية موثوقة ومحكمة",
    icon: Search,
  },
];