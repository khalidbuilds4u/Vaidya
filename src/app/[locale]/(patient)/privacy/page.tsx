import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Asad Healthcare',
  description: 'Our privacy policy detailing how we protect and manage your personal and medical information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen py-16 md:py-24 transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Ambient Backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="glass-card dark:glass-card-dark rounded-3xl p-8 md:p-14 border border-white/20 dark:border-slate-800/50 shadow-2xl">
          
          <div className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-inner animate-float">
              <ShieldCheck className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium tracking-wide uppercase text-sm">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-teal-900 dark:prose-headings:text-teal-50 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-teal-800 dark:prose-h2:text-teal-300 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-500 prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-white marker:text-teal-500">
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-8">
              At Asad Healthcare, we respect your privacy and are committed to protecting the personal information of visitors, users, prospective patients, international patients, and anyone who interacts with our website or services.
              As a medical tourism company, we provide information and assistance related to hospitals, doctors, treatments, surgeries, and healthcare services in India.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              Depending on how you use our website or services, we may collect:
            </p>
            <ul>
              <li>Name, email address, phone number, WhatsApp number, and country</li>
              <li>Enquiry and communication details</li>
              <li>Medical information or reports when voluntarily provided for healthcare assistance</li>
              <li>Passport, visa, and travel information when required for medical travel</li>
              <li>Website and technical information such as IP address, browser, device, and pages visited</li>
            </ul>
            <p>
              You can browse most areas of our website without providing medical information.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We may use your information to:
            </p>
            <ul>
              <li>Respond to enquiries and requests</li>
              <li>Provide information about hospitals, doctors, treatments, and procedures</li>
              <li>Coordinate medical consultations and healthcare services</li>
              <li>Connect you with hospitals and healthcare professionals</li>
              <li>Assist with medical travel arrangements</li>
              <li>Communicate about requested services</li>
              <li>Improve our website and services</li>
              <li>Maintain website security and meet legal requirements</li>
            </ul>

            <h2>3. Medical Information</h2>
            <p>
              If you voluntarily provide medical reports or health information, we may use and share relevant information with appropriate doctors, hospitals, or healthcare providers to help coordinate the services you request. We do not independently diagnose or prescribe treatment. Medical decisions are made by qualified healthcare professionals.
            </p>

            <h2>4. Sharing Your Information</h2>
            <p>
              Where necessary, we may share relevant information with hospitals, doctors, healthcare providers, travel or accommodation providers, technology service providers, and other trusted partners involved in providing the requested service. We do not sell your personal or medical information.
            </p>

            <h2>5. International Data Transfers</h2>
            <p>
              As we serve users and patients from different countries, information may be transferred to or processed in India or other countries where our service providers operate. We take reasonable steps to protect information and handle it in accordance with applicable privacy and data protection requirements.
            </p>

            <h2>6. Cookies & Analytics</h2>
            <p>
              Our website may use cookies and similar technologies to operate the website, understand visitor activity, improve performance, and support analytics or marketing. You can manage cookies through your browser settings.
            </p>

            <h2>7. Data Security & Retention</h2>
            <p>
              We use reasonable security measures to protect your information. We retain information only for as long as reasonably necessary for providing services, maintaining records, meeting legal requirements, and protecting our legitimate interests.
            </p>

            <h2>8. Your Privacy Rights</h2>
            <p>
              Depending on your location and applicable law, you may have rights to access, correct, delete, or restrict the use of your personal information, withdraw consent, or raise a privacy concern.
            </p>

            <h2>9. Third-Party Websites</h2>
            <p>
              Our website may contain links to hospitals, doctors, healthcare organizations, travel providers, and other third-party websites. Their privacy practices are governed by their own policies.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated "Last Updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              For questions or privacy-related requests, please contact:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl mt-4 not-prose">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Asad Healthcare</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><strong>Email:</strong> info@asadhealthcare.com</li>
                <li><strong>Website:</strong> www.asadhealthcare.com</li>
                <li><strong>Phone/WhatsApp:</strong> +91 99180 53077</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
