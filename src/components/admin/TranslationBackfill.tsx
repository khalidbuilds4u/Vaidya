"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Languages, CheckCircle2, AlertCircle } from "lucide-react";

export function TranslationBackfill() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; count?: number } | null>(null);

  const handleBackfill = async () => {
    if (!confirm("This will scan the entire database and translate any missing fields using your DeepL API quota. Are you sure you want to proceed?")) {
      return;
    }
    
    setIsTranslating(true);
    setResult(null);
    
    try {
      const res = await fetch("/api/admin/backfill-translations", { method: "GET" });
      const data = await res.json();
      
      if (data.success) {
        setResult({ success: true, count: data.updatedCount, message: `Successfully translated ${data.updatedCount} items.` });
      } else {
        setResult({ success: false, message: data.error || "Failed to backfill translations." });
      }
    } catch (err: any) {
      setResult({ success: false, message: err.message || "An error occurred." });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-6">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
        <Languages className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-bold text-slate-900">Translation Backfill</h2>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-slate-600 mb-6">
          If you recently upgraded your DeepL quota, click the button below to automatically scan all pages (Hospitals, Doctors, Conditions, etc.) and translate any missing text in the background.
        </p>

        {result && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 ${result.success ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
            {result.success ? <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 mt-0.5 text-red-600" />}
            <div>
              {result.message}
            </div>
          </div>
        )}

        <Button 
          onClick={handleBackfill} 
          disabled={isTranslating}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl shadow-sm"
        >
          {isTranslating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Translating Missing Fields...
            </>
          ) : (
            'Auto-Translate Missing Fields'
          )}
        </Button>
      </div>
    </div>
  );
}
