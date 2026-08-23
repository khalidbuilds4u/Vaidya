"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { code: "en", name: "English", shortName: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية (Arabic)", shortName: "Arabic", flag: "🇸🇦" },
  { code: "ru", name: "Русский (Russian)", shortName: "Russian", flag: "🇷🇺" },
  { code: "fr", name: "Français (French)", shortName: "French", flag: "🇫🇷" },
  { code: "bn", name: "বাংলা (Bengali)", shortName: "Bengali", flag: "🇧🇩" },
  { code: "sw", name: "Kiswahili (Swahili)", shortName: "Swahili", flag: "🇰🇪" },
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("en");

  // On mount, check if there's a googtrans cookie
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    if (match && match[1]) {
      const parts = match[1].split('/');
      if (parts.length > 2) {
        setCurrentLang(parts[2]);
      }
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    const cookieString = `/en/${langCode}`;
    
    // Set cookie for current domain and host
    document.cookie = `googtrans=${cookieString}; path=/; max-age=31536000`;
    document.cookie = `googtrans=${cookieString}; domain=${window.location.hostname}; path=/; max-age=31536000`;
    
    // Set current state
    setCurrentLang(langCode);
    
    // Trigger Google Translate native select change
    const googleSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (googleSelect) {
      googleSelect.value = langCode;
      googleSelect.dispatchEvent(new Event('change'));
    } else {
      // Fallback if the widget hasn't loaded yet
      window.location.reload();
    }
  };

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="gap-2 h-9 px-2 sm:px-3 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-sm font-medium outline-none disabled:pointer-events-none disabled:opacity-50">
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="font-medium text-slate-700">{activeLang.shortName}</span>
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-lg border-slate-100 p-1">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              currentLang === lang.code ? "bg-primary/10 text-primary font-medium" : "hover:bg-slate-50 text-slate-700"
            }`}
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
