import { Metadata } from 'next';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | Asad Healthcare',
  description: 'Important medical disclaimer regarding the information and services provided by Asad Healthcare.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 md:py-20 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Medical Disclaimer
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-primary hover:prose-a:text-primary/80">
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
