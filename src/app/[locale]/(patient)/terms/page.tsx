import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Asad Healthcare',
  description: 'Terms and conditions for using Asad Healthcare services for medical tourism in India.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 md:py-20 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Terms of Service
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-primary hover:prose-a:text-primary/80">
            {/* PASTE YOUR CONTENT HERE */}
            <p>
              Please provide your Terms of Service content here. 
            </p>
            <h2>1. Acceptance of Terms</h2>
            <p>
              [Your content goes here]
            </p>
            <h2>2. Medical Services and Facilitation</h2>
            <p>
              [Your content goes here]
            </p>
            <h2>3. Payment and Cancellations</h2>
            <p>
              [Your content goes here]
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
