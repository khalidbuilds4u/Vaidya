import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTranslation(data: any, field: string, locale: string) {
  if (data?.translations && typeof data.translations === 'object') {
    const translations = data.translations as Record<string, any>;
    if (translations[locale] && translations[locale][field]) {
      return translations[locale][field];
    }
  }
  return data?.[field];
}
