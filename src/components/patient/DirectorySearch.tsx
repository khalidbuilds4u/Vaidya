"use client";

import { useState, useEffect, Suspense, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchForm({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== (searchParams.get("q") || "")) {
        startTransition(() => {
          if (query.trim()) {
            router.push(`${pathname}?q=${encodeURIComponent(query.trim())}`, { scroll: false });
          } else {
            router.push(`${pathname}`, { scroll: false });
          }
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router, pathname, searchParams]);

  return (
    <div className="relative w-full max-w-xl group">
      {/* Premium ambient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-teal-400/30 rounded-full blur opacity-20 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative p-1.5 sm:p-2 rounded-full flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10 group-focus-within:ring-primary/50 group-focus-within:border-primary/50">
        
        <div className="pl-3 sm:pl-4 text-slate-400 dark:text-slate-500">
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Search className="h-5 w-5 transition-colors group-focus-within:text-primary" />
          )}
        </div>
        
        <Input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder} 
          className="border-0 focus-visible:ring-0 shadow-none text-sm sm:text-base h-10 sm:h-12 w-full text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 px-0"
        />
        
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="mr-2 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export function DirectorySearch({ placeholder = "Search...", buttonText = "Search" }: { placeholder?: string, buttonText?: string }) {
  return (
    <Suspense fallback={<div className="h-14 sm:h-16 w-full max-w-xl animate-pulse bg-white/20 dark:bg-slate-800/50 rounded-full" />}>
      <SearchForm placeholder={placeholder} />
    </Suspense>
  );
}
