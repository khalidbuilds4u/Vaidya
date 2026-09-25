"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchForm({ placeholder, buttonText }: { placeholder: string, buttonText: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`?`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl max-w-xl transition-colors duration-500">
      <Search className="h-4 w-4 text-primary dark:text-teal-400 ml-3 mr-1 shrink-0" />
      <Input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder} 
        className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-sm h-9 sm:h-10 text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
      <Button type="submit" size="sm" className="rounded-lg sm:rounded-full h-8 sm:h-9 px-5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs shrink-0">
        {buttonText}
      </Button>
    </form>
  );
}

export function DirectorySearch({ placeholder = "Search...", buttonText = "Search" }: { placeholder?: string, buttonText?: string }) {
  return (
    <Suspense fallback={<div className="h-12 w-full animate-pulse bg-white/20 rounded-xl" />}>
      <SearchForm placeholder={placeholder} buttonText={buttonText} />
    </Suspense>
  );
}
