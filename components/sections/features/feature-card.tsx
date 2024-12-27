"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-none shadow-lg elevation-2">
      <CardHeader>
        <Icon className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-white/80">{description}</p>
      </CardContent>
    </Card>
  );
}