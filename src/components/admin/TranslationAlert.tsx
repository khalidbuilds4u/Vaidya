import { AlertCircle } from "lucide-react";

interface TranslationAlertProps {
  translations: any;
}

export function TranslationAlert({ translations }: TranslationAlertProps) {
  // Check if translations exist and have at least 'ar' (Arabic) with some content
  const hasMissingTranslations = !translations || !translations.ar || Object.keys(translations.ar).length < 2;

  if (!hasMissingTranslations) return null;

  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-800 mb-6 p-4 rounded-xl flex gap-3 items-start">
      <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
      <div>
        <h5 className="text-rose-900 font-bold mb-1">Incomplete Translations</h5>
        <p className="text-rose-700 text-sm">
          This record is missing translations for some or all supported languages (likely due to translation quota limits). 
          Click <strong>Save</strong> again to attempt translating the missing fields.
        </p>
      </div>
    </div>
  );
}
