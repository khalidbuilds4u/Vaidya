"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';

export function MobileSearch() {
  const router = useRouter();
  const t = useTranslations('Hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim() && !searchCity) return;
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (searchCity) params.append('city', searchCity);
    
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="sm:hidden container mx-auto px-4 mt-6 mb-4">
      <div className="bg-white dark:bg-slate-900/95 rounded-[1.25rem] p-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 transition-colors duration-500">
        <h3 className="text-center font-bold text-slate-800 dark:text-white text-sm mb-0.5">Find your treatment</h3>
        
        {/* Search Input Row */}
        <div className="flex items-center px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg transition-colors duration-500">
          <Search className="w-4 h-4 text-primary dark:text-teal-400 shrink-0 mr-2" />
          <Input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
      </div>
    </section>
  );
}
