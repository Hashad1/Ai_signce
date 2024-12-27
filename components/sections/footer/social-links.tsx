"use client";

import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Facebook, href: "#", label: "فيسبوك" },
  { icon: Twitter, href: "#", label: "تويتر" },
  { icon: Instagram, href: "#", label: "انستغرام" },
  { icon: Linkedin, href: "#", label: "لينكد إن" },
  { icon: Mail, href: "mailto:contact@example.com", label: "البريد الإلكتروني" },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary transition-colors"
          asChild
        >
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}