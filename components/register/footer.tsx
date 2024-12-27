"use client";

import Link from "next/link";

export function RegisterFooter() {
  return (
    <footer className="mt-8 text-center text-white/60">
      <p className="mb-2">
        بالتسجيل، أنت توافق على{" "}
        <Link href="/terms" className="text-primary hover:underline">
          الشروط والأحكام
        </Link>
        {" "}و{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          سياسة الخصوصية
        </Link>
      </p>
      <p>جميع الحقوق محفوظة © {new Date().getFullYear()} الباحث العلمي الذكي</p>
    </footer>
  );
}