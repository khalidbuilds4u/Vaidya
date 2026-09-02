export default function ProfileLoading() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Header Banner Skeleton */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-900 border-b border-teal-900/40 animate-pulse">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="w-24 h-6 rounded-full bg-slate-800 mb-4" />
            <div className="w-3/4 h-12 bg-slate-800 rounded-xl mb-4" />
            <div className="w-1/2 h-5 bg-slate-800 rounded-md" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          {/* Main Content Area Skeleton */}
          <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6 sm:space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse">
              <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-md mb-6" />
              <div className="space-y-3">
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                <div className="w-5/6 h-4 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
                <div className="w-4/6 h-4 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse">
              <div className="w-40 h-6 bg-slate-200 dark:bg-slate-800 rounded-md mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      <div className="w-2/3 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Skeleton */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/90 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse">
              <div className="w-24 h-5 bg-slate-200 dark:bg-slate-800 rounded-md mb-4 mx-auto" />
              <div className="w-32 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6 mx-auto" />
              <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded-full mb-4" />
              <div className="w-full h-12 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
