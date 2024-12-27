"use client";

import { LucideIcon } from "lucide-react";

interface StepContentProps {
  icon: LucideIcon;
  title: string;
  description: string;
  demo?: string;
  demoList?: string[];
}

export function StepContent({ icon: Icon, title, description, demo, demoList }: StepContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Icon className="w-12 h-12 text-primary animate-pulse" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-white/80">{description}</p>
      </div>

      {demo && (
        <div className="bg-card/50 p-4 rounded-lg">
          <p className="text-white/80">{demo}</p>
        </div>
      )}

      {demoList && (
        <div className="bg-card/50 p-4 rounded-lg">
          <p className="text-white/80">يمكنك صياغة فرضيات البحث باتباع هذه الخطوات:</p>
          <ul className="list-disc list-inside mt-2 text-white/70">
            {demoList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}