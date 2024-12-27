"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function IntroSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto elevation-3 bg-gradient-to-br from-secondary/10 via-primary/5 to-secondary/10">
          <CardContent className="p-8">
            <p className="text-lg text-white/90 text-center mb-8 leading-relaxed backdrop-blur-sm">
              لقد صُممت أداتنا لمساعدتك في صياغة محتوى أكاديمي متكامل مع ضمان الدقة والاحترافية. 
              سواء كنت طالبًا، أكاديميًا، أو باحثًا محترفًا – نحن هنا لدعمك!
            </p>
            <div className="text-center">
              <Button 
                size="lg" 
                className="text-white bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary transition-all duration-300 neon-glow"
              >
                ابدأ رحلتك البحثية الآن
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}