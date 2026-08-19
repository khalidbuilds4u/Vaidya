import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asad Healthcare | Where Global Trust Meets World-Class Healing",
  description: "India's premier international medical tourism network. Direct access to JCI & NABH accredited hospitals and expert specialist surgeons with end-to-end travel assistance.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};
import Script from 'next/script';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Google Translate Element container (hidden via CSS) */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        
        {children}

        {/* Google Translate Scripts */}
        <Script 
          id="google-translate-inline" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `
          }}
        />
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
