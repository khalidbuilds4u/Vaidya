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
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-8">
              At Asad Healthcare, patient safety is an important part of every medical tourism journey. We help users and international patients make informed decisions and prepare responsibly for medical treatment in India.
              These guidelines are intended for general safety and planning purposes and do not replace advice from qualified healthcare professionals.
            </p>

            <h2>1. Choose Qualified Healthcare Providers</h2>
            <p>
              Research your doctor, specialist, and hospital carefully. Consider their qualifications, experience, specialty, hospital accreditation, and the type of treatment they provide.
            </p>

            <h2>2. Share Accurate Medical Information</h2>
            <p>
              Provide complete and accurate medical history, reports, prescriptions, allergies, previous treatments, and other relevant health information to your healthcare provider.
              Accurate information helps doctors better understand your condition and plan appropriate care.
            </p>

            <h2>3. Discuss Your Treatment With Your Doctor</h2>
            <p>
              Before treatment or surgery, discuss:
            </p>
            <ul>
              <li>Diagnosis and treatment options</li>
              <li>Expected benefits and risks</li>
              <li>Possible complications</li>
              <li>Alternative treatments</li>
              <li>Recovery time</li>
              <li>Follow-up requirements</li>
              <li>Total expected costs</li>
            </ul>
            <p>
              Ask questions whenever you need clarification.
            </p>

            <h2>4. Verify Treatment & Cost Details</h2>
            <p>
              Treatment plans, hospital charges, doctor fees, and estimated costs can vary depending on your medical condition and treatment requirements.
              Confirm the final treatment plan and applicable charges directly with the hospital or healthcare provider before proceeding.
            </p>

            <h2>5. Prepare for Medical Travel</h2>
            <p>
              International travellers should make appropriate preparations before travelling to India, including:
            </p>
            <ul>
              <li>Valid passport and required visa</li>
              <li>Medical records and reports</li>
              <li>Prescribed medicines</li>
              <li>Travel and accommodation arrangements</li>
              <li>Emergency contact information</li>
              <li>Appropriate travel or medical insurance where available</li>
            </ul>
            <p>
              Follow all travel and healthcare requirements applicable to your situation.
            </p>

            <h2>6. Follow Medical Instructions</h2>
            <p>
              Follow your doctor's instructions before and after treatment. Take prescribed medicines as directed, attend follow-up appointments, and inform your healthcare provider about any unexpected symptoms or concerns.
            </p>

            <h2>7. Plan Your Recovery</h2>
            <p>
              Before returning home, discuss with your doctor whether you are medically fit to travel and understand any restrictions, follow-up needs, medicines, and warning signs that require medical attention.
            </p>

            <h2>8. Protect Your Personal Information</h2>
            <p>
              Share medical reports and personal information only through trusted communication channels and with authorized healthcare providers or service partners.
              Avoid sharing sensitive medical information through unsecured public platforms.
            </p>

            <h2>9. In Case of an Emergency</h2>
            <p>
              If you experience a medical emergency during your stay, seek immediate assistance from the nearest hospital or emergency medical service.
              Do not rely solely on website information or online communication for emergency medical care.
            </p>

            <h2>10. Our Role</h2>
            <p>
              Asad Healthcare helps users coordinate medical tourism services and connect with healthcare providers in India.
              We do not replace doctors, hospitals, or emergency medical services. Medical diagnosis, treatment decisions, procedures, and clinical care remain the responsibility of qualified healthcare professionals.
            </p>

            <div className="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800/50 rounded-xl p-6 mt-8 not-prose">
              <h3 className="text-teal-800 dark:text-teal-400 font-bold mb-2">Your Safety Comes First</h3>
              <p className="text-teal-700 dark:text-teal-300 text-sm">
                Always follow the advice of your treating healthcare professional and seek immediate medical attention when necessary.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
