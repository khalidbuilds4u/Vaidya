"use client";

import { useTransition } from "react";
import { Globe, ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LANGUAGES = [
  { code: "en", name: "English", shortName: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", shortName: "العربية", flag: "🇸🇦" },
  { code: "bn", name: "বাংলা", shortName: "বাংলা", flag: "🇧🇩" },
  { code: "fr", name: "Français", shortName: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", shortName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", shortName: "Русский", flag: "🇷🇺" },
  { code: "uz", name: "O'zbekcha", shortName: "O'zbekcha", flag: "🇺🇿" },
];

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const currentLang = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (langCode: string) => {
    if (langCode === currentLang) return;
    
    startTransition(() => {
      router.replace(pathname, { locale: langCode });
    });
  };

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="gap-1.5 sm:gap-2 h-9 px-3 sm:px-4 rounded-full border border-teal-500 hover:border-teal-400 bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center text-sm font-medium outline-none disabled:pointer-events-none disabled:opacity-50 text-white shadow-sm shrink-0">
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200 shrink-0 animate-spin" />
            ) : (
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200 shrink-0" />
            )}
            
            {/* Desktop full name */}
            <span className="font-medium hidden sm:block">{activeLang.shortName}</span>
            
            {/* Mobile compact code */}
            <span className="font-bold sm:hidden text-[11px] uppercase tracking-wider">{activeLang.code}</span>
            
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-lg border-slate-100 p-1">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            disabled={isPending}
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
