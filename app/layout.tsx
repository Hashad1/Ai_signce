import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { AuthProvider } from '@/contexts/auth-context';
import { ChatProvider } from '@/contexts/chat-context';
import { Toaster } from '@/components/ui/toast';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'الباحث العلمي - أداة متطورة للذكاء الاصطناعي للبحث العلمي',
  description: 'اكتشف مساعدك الذكي المصمم خصيصًا لتوجيهك في كل خطوة من خطوات البحث العلمي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={ibmPlexSansArabic.className} suppressHydrationWarning>
        <AuthProvider>
          <ChatProvider>
            <Header />
            {children}
            <Toaster />
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}