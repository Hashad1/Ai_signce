"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
}

export function TestimonialCard({ content, author, role }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-lg elevation-2">
      <CardContent className="pt-6">
        <p className="text-lg mb-6 text-white">{content}</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="bg-primary/20 text-white">{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-semibold text-white">{author}</h3>
            <p className="text-sm text-white/70">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}