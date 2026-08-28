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
    <section className="sm:hidden container mx-auto px-4 mt-8 mb-6">
      <div className="bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-3">
        <h3 className="text-center font-bold text-slate-800 text-lg mb-2">Find your treatment</h3>
        
        <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
          <Search className="w-5 h-5 text-primary shrink-0 mr-3" />
          <Input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('searchPlaceholder')}
            className="border-0 focus-visible:ring-0 shadow-none h-auto px-0 py-0 bg-transparent placeholder:text-slate-400 text-slate-900 font-medium text-sm w-full"
          />
        </div>
        
        <div className="flex items-center px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
          <MapPin className="w-5 h-5 text-primary shrink-0 mr-3" />
          <select 
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full bg-transparent border-0 text-slate-800 font-semibold focus:ring-0 text-sm p-0 m-0 cursor-pointer outline-none"
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
          className="w-full rounded-xl h-12 shadow-[0_4px_14px_rgba(15,118,110,0.3)] hover:shadow-[0_6px_20px_rgba(15,118,110,0.5)] transition-all font-bold bg-emerald-500 hover:bg-emerald-400 text-white text-sm mt-1"
        >
          {t('searchButton')}
        </Button>
      </div>
    </section>
  );
}
