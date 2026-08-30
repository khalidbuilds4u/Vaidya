import { Metadata } from 'next';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Asad Healthcare',
  description: 'Important medical disclaimer regarding the information and services provided by Asad Healthcare.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="relative min-h-screen py-16 md:py-24 transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Ambient Backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="glass-card dark:glass-card-dark rounded-3xl p-8 md:p-14 border border-white/20 dark:border-slate-800/50 shadow-2xl">
          
          <div className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-inner animate-float">
              <AlertCircle className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 tracking-tight">
                Medical Disclaimer
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide uppercase text-sm">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-teal-900 dark:prose-headings:text-teal-50 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-teal-800 dark:prose-h2:text-teal-300 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-500 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white marker:text-teal-500">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-8">
              Asad Healthcare helps users access and coordinate medical tourism services in India. Information on our website is for general informational purposes and does not replace professional medical advice. Diagnosis, treatment, surgery, prescriptions, and clinical decisions are made by qualified healthcare professionals and hospitals.
            </p>

            <h2>Not Professional Medical Advice</h2>
            <p>
              The content on this website, including text, graphics, images, and other materials, is intended for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            
            <h2>No Doctor-Patient Relationship</h2>
            <p>
              Use of this website and the information provided does not create a doctor-patient relationship between you and Asad Healthcare. We act as a facilitator connecting you with healthcare providers. Any medical decisions and treatments are strictly between you and the respective healthcare provider or hospital.
            </p>
            
            <h2>Assumption of Risk</h2>
            <p>
              Medical treatments and surgeries inherently carry risks. While we strive to connect you with accredited hospitals and qualified specialists, Asad Healthcare does not guarantee the outcome of any medical procedure or treatment. You assume full responsibility for your medical decisions and the outcomes thereof.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
