"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  image?: string;
}

export function TestimonialCard({ content, author, role, image }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="pt-6">
        <p className="text-lg mb-6">{content}</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}