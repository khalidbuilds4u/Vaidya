export default function TreatmentsLoading() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-20 animate-pulse">
      <section className="relative py-12 sm:py-20 overflow-hidden bg-slate-900 border-b border-teal-900/40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="h-6 w-48 bg-white/10 rounded-full mb-6"></div>
            <div className="h-12 sm:h-16 w-3/4 bg-white/10 rounded-xl mb-4"></div>
            <div className="h-6 w-full max-w-2xl bg-white/5 rounded-lg mb-8"></div>
            <div className="p-1.5 sm:p-2 rounded-xl sm:rounded-full flex items-center gap-2 bg-white/10 max-w-xl h-12 sm:h-14"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-14 sm:mb-16">
          <div className="h-8 w-64 bg-slate-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="rounded-2xl sm:rounded-3xl bg-slate-200 h-36 sm:h-44"></div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-8 w-72 bg-slate-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl sm:rounded-3xl h-72 bg-white border border-slate-100 flex flex-col p-5">
                <div className="flex gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200"></div>
                  <div className="flex-1">
                    <div className="h-4 w-20 bg-slate-200 rounded mb-2"></div>
                    <div className="h-6 w-full bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-slate-100 rounded"></div>
                  <div className="h-4 w-full bg-slate-100 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                </div>
                <div className="mt-auto h-16 bg-slate-50 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
