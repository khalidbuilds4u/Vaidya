import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Asad Healthcare',
  description: 'Our privacy policy detailing how we protect and manage your personal and medical information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 md:py-20 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-primary hover:prose-a:text-primary/80">
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
                <li><strong>Phone/WhatsApp:</strong> +91 94511 87513</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
