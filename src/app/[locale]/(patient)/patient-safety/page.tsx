import { Metadata } from 'next';
import { HeartPulse } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patient Safety Guidelines | Asad Healthcare',
  description: 'Our commitment to patient safety, quality of care, and safety guidelines for international medical travel.',
};

export default function PatientSafetyPage() {
  return (
    <div className="relative min-h-screen py-16 md:py-24 transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Ambient Backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="glass-card dark:glass-card-dark rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-white/20 dark:border-slate-800/50 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-inner animate-float">
              <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 tracking-tight">
                Patient Safety Guidelines
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide uppercase text-sm">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-teal-900 dark:prose-headings:text-teal-50 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-teal-800 dark:prose-h2:text-teal-300 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-500 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white marker:text-teal-500">
            {/* PASTE YOUR CONTENT HERE */}
            <p>
              Please provide your Patient Safety Guidelines content here.
            </p>
            <h2>Pre-Travel Medical Safety</h2>
            <p>
              [Your content goes here]
            </p>
            <h2>Hospital Safety Standards (JCI & NABH)</h2>
            <p>
              [Your content goes here]
            </p>
            <h2>Post-Procedure Care and Travel</h2>
            <p>
              [Your content goes here]
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
