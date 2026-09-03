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
  isContactQuery?: boolean;
}

export function MobileSearch() {
  const router = useRouter();
  const t = useTranslations('Hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCity, setSearchCity] = useState('');
  
  const [suggestions, setSuggestions] = useState<SearchSuggestion>({ treatments: [], doctors: [], hospitals: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const hasSuggestions = suggestions.treatments.length > 0 || suggestions.doctors.length > 0 || suggestions.hospitals.length > 0 || suggestions.isContactQuery;

  return (
    <section className="sm:hidden container mx-auto px-4 mt-6 mb-4 relative z-[60]" ref={dropdownRef}>
      <div className="bg-white dark:bg-slate-900/95 rounded-[1.25rem] p-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 transition-colors duration-500 relative">
        <h3 className="text-center font-bold text-slate-800 dark:text-white text-sm mb-0.5">Find your treatment</h3>
        
        {/* Search Input Row */}
        <div className="flex items-center px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg transition-colors duration-500">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-primary dark:text-teal-400 shrink-0 mr-2 animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-primary dark:text-teal-400 shrink-0 mr-2" />
          )}
          <Input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => { if (searchQuery.length >= 2) setShowDropdown(true); }}
            placeholder={t('searchPlaceholder')}
            className="border-0 focus-visible:ring-0 shadow-none h-8 px-0 py-0 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white font-medium text-xs w-full"
          />
        </div>
        
        {/* City & Submit Row */}
        <div className="flex items-stretch gap-2.5 h-10">
          <div className="flex-1 flex items-center px-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg min-w-0 transition-colors duration-500">
            <MapPin className="w-4 h-4 text-primary dark:text-teal-400 shrink-0 mr-1.5" />
            <select 
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full bg-transparent border-0 text-slate-800 dark:text-slate-200 font-semibold focus:ring-0 text-xs p-0 m-0 cursor-pointer outline-none truncate"
            >
              <option value="" className="text-slate-900 dark:text-slate-200">{t('anyCity')}</option>
              <option value="New Delhi" className="text-slate-900 dark:text-slate-200">New Delhi</option>
              <option value="Mumbai" className="text-slate-900 dark:text-slate-200">Mumbai</option>
              <option value="Chennai" className="text-slate-900 dark:text-slate-200">Chennai</option>
              <option value="Bangalore" className="text-slate-900 dark:text-slate-200">Bangalore</option>
              <option value="Hyderabad" className="text-slate-900 dark:text-slate-200">Hyderabad</option>
            </select>
          </div>

          <Button 
            size="sm" 
            onClick={handleSearch} 
            className="h-full rounded-lg px-5 shadow-[0_4px_14px_rgba(15,118,110,0.3)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.5)] transition-all font-bold bg-emerald-500 hover:bg-emerald-400 text-white text-xs shrink-0"
          >
            {t('searchButton')}
          </Button>
        </div>

        {/* Intelligent Auto-Complete Dropdown */}
        <AnimatePresence>
          {showDropdown && (searchQuery.length >= 2) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[105%] left-0 right-0 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-200/80 dark:border-slate-700 overflow-hidden z-[100]"
            >
              {isLoading && !hasSuggestions ? (
                <div className="p-5 flex items-center justify-center text-xs text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin mr-2 text-primary" />
                  Searching network...
                </div>
              ) : !hasSuggestions ? (
                <div className="p-5 text-center">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">No exact matches found</p>
                  <p className="text-[10px] text-slate-500 mt-1">Try a different keyword or hit Search for all results.</p>
                </div>
              ) : (
                <div className="max-h-[50vh] overflow-y-auto py-2">
                  
                  {suggestions.isContactQuery && (
                    <div className="px-2 mb-2">
                      <Link href="/contact" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 group transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                          <span className="text-sm">📞</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-primary dark:text-teal-400">Contact our 24/7 Support Team</p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">We are here to assist you with your medical journey.</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </Link>
                    </div>
                  )}
                  
                  {suggestions.treatments.length > 0 && (
                    <div className="px-2">
                      <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">Treatments</div>
                      {suggestions.treatments.map(t => (
                        <Link key={t.slug} href={`/treatments/${t.slug}`} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                          <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Syringe className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t.name}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {suggestions.doctors.length > 0 && (
                    <div className="px-2 mt-1.5">
                      <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 dark:border-slate-800/50">Specialists</div>
                      {suggestions.doctors.map(d => (
                        <Link key={d.slug} href={`/doctors/${d.slug}`} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Stethoscope className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{d.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">
                              {d.specialty?.name} • {d.hospital?.name}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {suggestions.hospitals.length > 0 && (
                    <div className="px-2 mt-1.5">
                      <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-100 dark:border-slate-800/50">Hospitals</div>
                      {suggestions.hospitals.map(h => (
                        <Link key={h.slug} href={`/hospitals/${h.slug}`} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                          <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{h.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{h.city.name}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="p-2 border-t border-slate-100 dark:border-slate-800/50 mt-1.5">
                    <button 
                      onClick={handleSearch}
                      className="w-full text-center text-[11px] font-bold text-primary hover:text-primary/80 py-1.5 transition-colors"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
