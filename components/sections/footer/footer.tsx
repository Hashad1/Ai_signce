"use client";

import { SocialLinks } from "./social-links";
import { ContactForm } from "./contact-form/form";
import { ContactInfo } from "./contact-info";

export function Footer() {
  return (
    <footer className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="text-center md:text-right">
              <h2 className="text-2xl font-bold text-white mb-4 neon-text">تواصل معنا</h2>
              <ContactInfo />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-right">
                تابعنا على مواقع التواصل
              </h3>
              <SocialLinks />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60">
            جميع الحقوق محفوظة © {new Date().getFullYear()} الباحث العلمي
          </p>
        </div>
      </div>
    </footer>
  );
}