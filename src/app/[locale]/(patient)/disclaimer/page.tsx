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
        <div className="glass-card dark:glass-card-dark rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 border border-white/20 dark:border-slate-800/50 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-inner animate-float">
              <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 tracking-tight">
                Medical Disclaimer
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide uppercase text-sm">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-teal-900 dark:prose-headings:text-teal-50 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-teal-800 dark:prose-h2:text-teal-300 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-500 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white marker:text-teal-500">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-8">
              The information provided by Asad Healthcare is intended for general informational and medical tourism purposes. It is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>

            <h2>1. Medical Information</h2>
            <p>
              Our website may provide information about:
            </p>
            <ul>
              <li>Doctors and specialists</li>
              <li>Hospitals and healthcare facilities</li>
              <li>Diseases and health conditions</li>
              <li>Treatments and procedures</li>
              <li>Surgeries</li>
              <li>Medical technologies</li>
              <li>Healthcare services in India</li>
            </ul>
            <p>
              This information is provided to help users understand their available healthcare options. It should not be used to diagnose or treat a medical condition.
            </p>

            <h2>2. No Medical Advice</h2>
            <p>
              Asad Healthcare does not provide medical diagnosis or treatment through its website.
              Medical decisions should always be made after consultation with a qualified doctor or healthcare professional who understands your individual medical condition.
            </p>

            <h2>3. Doctors & Hospitals</h2>
            <p>
              Asad Healthcare may help users connect with hospitals, doctors, specialists, and other healthcare providers.
              These healthcare providers are independent professionals or organizations and are responsible for their own medical services, recommendations, treatment decisions, and outcomes.
            </p>

            <h2>4. Treatment Outcomes</h2>
            <p>
              Medical treatment results vary from person to person. Asad Healthcare does not guarantee any specific treatment outcome, recovery time, surgical result, or medical benefit.
              Treatment decisions and expected outcomes should be discussed directly with your treating doctor.
            </p>

            <h2>5. Treatment Costs</h2>
            <p>
              Any treatment prices, estimates, packages, or cost information provided on our website are for general guidance and may change.
              The final cost may depend on the patient's condition, treatment requirements, hospital, doctor, procedures, medicines, length of stay, and other factors.
            </p>

            <h2>6. Emergency Medical Care</h2>
            <p>
              Our website and services are not intended for medical emergencies.
              If you are experiencing a medical emergency, contact your local emergency medical service or seek immediate care from the nearest hospital.
            </p>

            <h2>7. Third-Party Information</h2>
            <p>
              Our website may contain information or links related to hospitals, doctors, healthcare organizations, and other third parties.
              We aim to provide useful and accurate information, but third-party information may change. Users should verify important medical information directly with the relevant healthcare provider.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have questions about our medical tourism services or website information, please contact:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl mt-4 mb-8 not-prose">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Asad Healthcare</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><strong>Email:</strong> info@asadhealthcare.com</li>
                <li><strong>Phone/WhatsApp:</strong> +91 99180 53077</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 not-prose">
              <h3 className="text-amber-800 dark:text-amber-500 font-bold mb-2">Important Medical Notice</h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                By using our website, you acknowledge that the information provided is for general informational and medical tourism purposes and does not replace professional medical advice.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
