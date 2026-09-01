import { Filter } from 'lucide-react';

export default function HospitalsLoading() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20">
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

          {/* Hospital List Skeleton */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4 sm:mb-6 animate-pulse">
              <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="w-24 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row bg-white dark:bg-slate-900 animate-pulse shadow-sm">
                  <div className="w-full sm:w-[35%] lg:w-[40%] h-48 sm:h-auto bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                    <div>
                      <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-800 rounded-md mb-3" />
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="w-16 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                        <div className="w-20 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                        <div className="w-16 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full mb-2" />
                      <div className="w-5/6 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                    </div>
                    <div className="flex gap-2 mt-6 pt-2">
                      <div className="flex-1 h-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      <div className="flex-1 h-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
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
