"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Building2, Stethoscope, ArrowRight, Loader2, Syringe } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { getSearchSuggestions } from '@/app/actions/searchActions';
import Link from 'next/link';

interface SearchSuggestion {
  treatments: { name: string; slug: string }[];
  doctors: { name: string; slug: string; specialty?: { name: string }; hospital?: { name: string } }[];
  hospitals: { name: string; slug: string; city: { name: string } }[];
}

export function HeroSearchBar() {
  const router = useRouter();
  const t = useTranslations('Hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCity, setSearchCity] = useState('');
  
  const [suggestions, setSuggestions] = useState<SearchSuggestion>({ treatments: [], doctors: [], hospitals: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions({ treatments: [], doctors: [], hospitals: [] });
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setShowDropdown(true);
      try {
        const res = await getSearchSuggestions(searchQuery, searchCity);
        setSuggestions(res);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchCity]);

  const handleSearch = () => {
    if (!searchQuery.trim() && !searchCity) return;
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (searchCity) params.append('city', searchCity);
    
    setShowDropdown(false);
    router.push(`/search?${params.toString()}`);
  };

  const hasSuggestions = suggestions.treatments.length > 0 || suggestions.doctors.length > 0 || suggestions.hospitals.length > 0;

  return (
    <motion.div 
      ref={dropdownRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="hidden sm:flex w-full max-w-xl p-2 sm:p-2.5 rounded-2xl sm:rounded-full flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 relative z-50 shadow-[0_10px_40px_rgba(15,118,110,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white dark:border-slate-700 transition-colors duration-500"
    >
      <div className="flex items-center flex-1 px-3 sm:px-4 pl-3.5 sm:pl-5 py-1 sm:py-0 bg-slate-50/60 dark:bg-transparent rounded-xl sm:rounded-none">
        {isLoading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-teal-400 mr-2 shrink-0 animate-spin" />
        ) : (
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-teal-400 mr-2 shrink-0" />
        )}
        <Input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => { if (searchQuery.length >= 2) setShowDropdown(true); }}
          placeholder={t('searchPlaceholder')}
          className="border-0 focus-visible:ring-0 shadow-none text-xs sm:text-base h-9 sm:h-11 px-0 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white font-medium"
        />
      </div>
      
      <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1"></div>
      
      <div className="flex items-center flex-1 px-3 sm:px-4 py-1 sm:py-0 bg-slate-50/60 dark:bg-transparent rounded-xl sm:rounded-none">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-teal-400 mr-1.5 shrink-0" />
        <select 
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="w-full bg-transparent border-0 text-slate-800 dark:text-slate-200 font-semibold focus:ring-0 text-xs sm:text-base h-9 sm:h-11 cursor-pointer outline-none"
        >
          <option value="" className="text-slate-900">{t('anyCity')}</option>
          <option value="New Delhi" className="text-slate-900">New Delhi</option>
          <option value="Mumbai" className="text-slate-900">Mumbai</option>
          <option value="Chennai" className="text-slate-900">Chennai</option>
          <option value="Bangalore" className="text-slate-900">Bangalore</option>
          <option value="Hyderabad" className="text-slate-900">Hyderabad</option>
        </select>
      </div>

      <Button 
        size="lg" 
        onClick={handleSearch} 
        className="w-full sm:w-auto rounded-xl sm:rounded-full h-10 sm:h-11 px-8 shadow-[0_4px_14px_rgba(15,118,110,0.5)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.7)] transition-all font-bold shrink-0 bg-emerald-500 hover:bg-emerald-400 text-white text-xs sm:text-sm"
      >
        {t('searchButton')}
      </Button>

      {/* Intelligent Auto-Complete Dropdown */}
      <AnimatePresence>
        {showDropdown && (searchQuery.length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 sm:mt-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-xl"
          >
            {isLoading && !hasSuggestions ? (
              <div className="p-6 flex items-center justify-center text-sm text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin mr-2 text-primary" />
                Searching network...
              </div>
            ) : !hasSuggestions ? (
              <div className="p-6 text-center">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">No exact matches found</p>
                <p className="text-xs text-slate-500 mt-1">Try a different keyword or hit Search for all results.</p>
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto py-2">
                
                {suggestions.treatments.length > 0 && (
                  <div className="px-2">
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Treatments</div>
                    {suggestions.treatments.map(t => (
                      <Link key={t.slug} href={`/treatments/${t.slug}`} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                          <Syringe className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.name}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                )}

                {suggestions.doctors.length > 0 && (
                  <div className="px-2 mt-2">
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 dark:border-slate-800/50">Specialists</div>
                    {suggestions.doctors.map(d => (
                      <Link key={d.slug} href={`/doctors/${d.slug}`} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Stethoscope className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{d.name}</p>
                          <p className="text-xs text-slate-500 truncate">
                            {d.specialty?.name} • {d.hospital?.name}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                )}

                {suggestions.hospitals.length > 0 && (
                  <div className="px-2 mt-2">
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 dark:border-slate-800/50">Hospitals</div>
                    {suggestions.hospitals.map(h => (
                      <Link key={h.slug} href={`/hospitals/${h.slug}`} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{h.name}</p>
                          <p className="text-xs text-slate-500 truncate">{h.city.name}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                )}

                <div className="p-2 border-t border-slate-100 dark:border-slate-800/50 mt-2">
                  <button 
                    onClick={handleSearch}
                    className="w-full text-center text-xs font-bold text-primary hover:text-primary/80 py-2 transition-colors"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
