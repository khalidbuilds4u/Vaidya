import { Search } from 'lucide-react';

export default function TreatmentsLoading() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* Header Banner Skeleton */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-900 border-b border-teal-900/40">
        <div className="container mx-auto px-4 relative z-10 animate-pulse">
          <div className="max-w-3xl">
            <div className="w-24 sm:w-32 h-6 sm:h-8 rounded-full bg-slate-800 mb-4" />
            <div className="w-3/4 h-10 sm:h-14 bg-slate-800 rounded-xl mb-4" />
            <div className="w-1/2 h-4 bg-slate-800 rounded-md mb-6" />
            
            {/* Quick Search Skeleton */}
            <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-slate-800/80 max-w-xl h-12 sm:h-14" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        
        {/* Specialties Grid Skeleton */}
        <div className="mb-14 sm:mb-16">
          <div className="flex justify-between items-center mb-6 animate-pulse">
            <div className="w-48 h-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="w-24 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="rounded-2xl sm:rounded-3xl h-36 sm:h-44 bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Popular Treatments Skeleton */}
        <div>
          <div className="w-64 h-8 bg-slate-200 dark:bg-slate-800 rounded-md mb-6 animate-pulse" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse shadow-sm min-h-[300px]">
                <div className="p-5 sm:p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl shrink-0" />
                    <div className="w-full">
                      <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded-full mb-2" />
                      <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-5">
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                    <div className="w-2/3 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                  </div>
                  
                  <div className="w-full h-16 bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
                </div>
                
                <div className="h-12 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
