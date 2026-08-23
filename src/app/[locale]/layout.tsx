import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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
      dir="ltr"
      className={`${isRtl ? cairo.variable : inter.variable} ${isRtl ? 'font-cairo' : 'font-sans'} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
