"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TutorialModal } from "@/components/demo/tutorial-modal";

export function HeroSection() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto backdrop-blur-sm elevation-3">
          <CardHeader>
            <CardTitle className="text-5xl font-bold mb-6 text-center text-white neon-text">
              الأداة المثلى لإنجاز أبحاثك بفعالية واحترافية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-white mb-8 text-center">
              اكتشف مساعدك الذكي المصمم خصيصًا لتوجيهك في كل خطوة من خطوات البحث العلمي. 
              من تحديد المشكلة إلى توثيق المراجع – نقدم لك الأدوات والموارد التي تحتاجها لإنشاء دراسة متكاملة بسهولة.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="text-white neon-glow neon-pulse"
                  id="register-cta"
                >
                  ابدأ الآن مجاناً
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-secondary hover:bg-secondary/20 transition-colors neon-glow"
                onClick={() => setShowTutorial(true)}
                aria-label="شاهد كيف يعمل الباحث العلمي"
              >
                شاهد كيف يعمل
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <TutorialModal 
        open={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />
    </section>
  );
}