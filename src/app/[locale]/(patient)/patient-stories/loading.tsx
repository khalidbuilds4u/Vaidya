export default function PatientStoriesLoading() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-pulse">
      <section className="bg-slate-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="h-6 w-48 bg-white/10 rounded-full mx-auto mb-6"></div>
          <div className="h-12 sm:h-14 w-80 bg-white/10 rounded-xl mx-auto mb-6"></div>
          <div className="h-6 w-full bg-white/5 rounded-lg mx-auto mb-2"></div>
          <div className="h-6 w-3/4 bg-white/5 rounded-lg mx-auto"></div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden h-[420px] flex flex-col">
              <div className="h-48 bg-slate-200 w-full shrink-0"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="h-4 w-24 bg-slate-100 mb-3 rounded"></div>
                <div className="h-7 w-full bg-slate-200 mb-4 rounded"></div>
                
                <div className="h-4 w-full bg-slate-100 mb-2 rounded"></div>
                <div className="h-4 w-full bg-slate-100 mb-2 rounded"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                
                <div className="pt-4 mt-auto flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                  <div className="w-full">
                    <div className="h-4 w-32 bg-slate-200 mb-1 rounded"></div>
                    <div className="h-3 w-20 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
