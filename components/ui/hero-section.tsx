"use client";

import { Button } from "./button";
import { ArrowLeft, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            الأداة المثلى لإنجاز أبحاثك بفعالية واحترافية
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            اكتشف مساعدك الذكي المصمم خصيصًا لتوجيهك في كل خطوة من خطوات البحث العلمي. من تحديد المشكلة إلى توثيق المراجع – نقدم لك الأدوات والموارد التي تحتاجها لإنشاء دراسة متكاملة بسهولة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto">
              ابدأ الآن مجاناً
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              شاهد كيف يعمل
              <Search className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}