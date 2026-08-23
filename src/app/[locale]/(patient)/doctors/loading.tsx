import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DoctorsLoading() {
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
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm sticky top-24 h-96"></div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-32 bg-slate-200 rounded-md"></div>
              <div className="h-4 w-40 bg-slate-200 rounded-md"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-5">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl bg-slate-200 shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-5 w-3/4 bg-slate-200 rounded-md mb-2"></div>
                      <div className="h-4 w-1/2 bg-slate-100 rounded-md mb-3"></div>
                      <div className="h-4 w-full bg-slate-100 rounded-md mb-1"></div>
                      <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                    <div className="h-10 flex-1 bg-slate-100 rounded-lg"></div>
                    <div className="h-10 flex-1 bg-slate-200 rounded-lg"></div>
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
