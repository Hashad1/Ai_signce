"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <Card className="elevation-2">
      <CardHeader>
        <CardTitle className="text-xl text-center text-white">تواصل معنا</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="الاسم"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <Textarea
              placeholder="رسالتك"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              rows={4}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full neon-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}