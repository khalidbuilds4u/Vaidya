import { Filter } from 'lucide-react';

export default function DoctorsLoading() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* Header Banner Skeleton */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-900 border-b border-teal-900/40">
        <div className="container mx-auto px-4 relative z-10 animate-pulse">
          <div className="max-w-3xl">
            <div className="w-24 sm:w-32 h-6 sm:h-8 rounded-full bg-slate-800 mb-4" />
            <div className="w-3/4 h-10 sm:h-14 bg-slate-800 rounded-xl mb-4" />
            <div className="w-1/2 h-4 bg-slate-800 rounded-md" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          
          {/* Sidebar Filters Skeleton */}
          <div className="w-full lg:w-1/4">
            <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 animate-pulse">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Filter className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
              <div className="space-y-5">
                {[1, 2, 3].map(i => (
                  <div key={i}>
                    <div className="w-16 h-3 bg-slate-200 dark:bg-slate-800 rounded-full mb-2" />
                    <div className="w-full h-10 bg-slate-100 dark:bg-slate-800/50 rounded-xl" />
                  </div>
                ))}
                <div className="w-full h-10 bg-slate-200 dark:bg-slate-800 rounded-xl sm:rounded-full mt-4" />
              </div>
            </div>
          </div>

          {/* Doctor List Skeleton */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4 sm:mb-6 animate-pulse">
              <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="w-24 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row p-4 sm:p-5 md:p-6 bg-white dark:bg-slate-900 animate-pulse shadow-sm">
                  {/* Image Skeleton */}
                  <div className="w-full sm:w-40 md:w-48 lg:w-56 aspect-square sm:aspect-[4/5] md:aspect-auto sm:h-48 md:h-56 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
                  
                  {/* Content Skeleton */}
                  <div className="flex-1 mt-4 sm:mt-0 sm:ml-6 flex flex-col">
                    <div className="w-3/4 h-7 bg-slate-200 dark:bg-slate-800 rounded-md mb-3" />
                    <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded-md mb-4" />
                    
                    <div className="space-y-2 mb-6">
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                      <div className="w-2/3 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                    </div>

                    <div className="mt-auto flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-4">
                        <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                        <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-md" />
                        <div className="flex-1 sm:w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
