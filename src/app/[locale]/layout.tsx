import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NextTopLoader from 'nextjs-toploader';

import { SplashScreen } from '@/components/patient/SplashScreen';
import { LazyMotionProvider } from "@/components/ui/LazyMotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Asad Healthcare | Where Global Trust Meets World-Class Healing",
  description: "India's premier international medical tourism network. Direct access to JCI & NABH accredited hospitals and expert specialist surgeons with end-to-end travel assistance.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default async function RootLayout({ 
  children,
  params 
}: Readonly<{ 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  const isRtl = locale === 'ar' || locale === 'ur' || locale === 'fa' || locale === 'he';

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${isRtl ? cairo.variable : inter.variable} ${isRtl ? 'font-cairo' : 'font-sans'} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SplashScreen />
          <NextTopLoader
            color="#0f766e"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #0f766e, 0 0 5px #0f766e"
          />
          <NextIntlClientProvider messages={messages}>
            <LazyMotionProvider>
              {children}
            </LazyMotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
