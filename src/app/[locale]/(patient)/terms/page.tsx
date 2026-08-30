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
            <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-8">
              Welcome to Asad Healthcare. These Terms of Service govern your access to and use of the Asad Healthcare website and the medical tourism information and support services we provide.
              By accessing or using our website, you agree to these Terms of Service. If you do not agree with these terms, please do not use our website or services.
            </p>

            <h2>1. About Asad Healthcare</h2>
            <p>
              Asad Healthcare is a medical tourism service provider that helps individuals explore and access healthcare services in India.
              We may assist users with information and coordination relating to:
            </p>
            <ul>
              <li>Hospitals and healthcare facilities</li>
              <li>Doctors and medical specialists</li>
              <li>Treatments and procedures</li>
              <li>Surgeries</li>
              <li>Medical consultations</li>
              <li>Treatment estimates</li>
              <li>Hospital appointments</li>
              <li>Medical travel</li>
              <li>Visa and travel assistance</li>
              <li>Accommodation and transportation</li>
            </ul>
            <p>
              Asad Healthcare is not a hospital, doctor, or healthcare provider unless specifically stated otherwise.
            </p>

            <h2>2. Use of Our Website</h2>
            <p>
              You may use our website for lawful purposes, including:
            </p>
            <ul>
              <li>Researching healthcare options</li>
              <li>Learning about doctors, hospitals, treatments, and procedures</li>
              <li>Submitting enquiries</li>
              <li>Requesting medical tourism assistance</li>
              <li>Requesting consultation or treatment coordination</li>
            </ul>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the website for unlawful purposes</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Copy or misuse our content without permission</li>
              <li>Interfere with the website's operation or security</li>
              <li>Use the website to harm or mislead other users</li>
            </ul>

            <h2>3. Medical Information & Disclaimer</h2>
            <p>
              Information published on the Asad Healthcare website about diseases, treatments, surgeries, doctors, hospitals, and medical procedures is provided for general informational and medical tourism purposes.
              It should not be considered medical diagnosis, medical advice, or a substitute for consultation with a qualified healthcare professional.
              Medical diagnosis, treatment recommendations, prescriptions, surgeries, procedures, and clinical decisions are made by the relevant doctors, specialists, and healthcare institutions.
              You should consult a qualified medical professional before making decisions about your health or treatment.
            </p>

            <h2>4. Healthcare Providers</h2>
            <p>
              Asad Healthcare may connect users with hospitals, doctors, specialists, diagnostic centres, and other healthcare providers.
              The healthcare providers are independent entities. Their services, qualifications, treatment recommendations, availability, costs, and clinical decisions are their responsibility.
              Asad Healthcare does not guarantee:
            </p>
            <ul>
              <li>A particular treatment outcome</li>
              <li>Successful surgery or recovery</li>
              <li>Availability of a specific doctor</li>
              <li>A specific treatment cost</li>
              <li>A particular hospital admission date</li>
              <li>Any specific medical result</li>
            </ul>
            <p>
              Users should independently discuss treatment options, risks, benefits, costs, and expected outcomes with the treating healthcare provider.
            </p>

            <h2>5. Treatment Costs & Estimates</h2>
            <p>
              Any treatment cost, package price, estimate, or quotation displayed or communicated by Asad Healthcare may be subject to change.
              Actual costs may vary depending on:
            </p>
            <ul>
              <li>Patient condition</li>
              <li>Diagnosis</li>
              <li>Treatment requirements</li>
              <li>Additional procedures</li>
              <li>Hospital stay</li>
              <li>Doctor's fees</li>
              <li>Medicines</li>
              <li>Diagnostic tests</li>
              <li>Complications</li>
              <li>Changes in treatment plans</li>
              <li>Other healthcare-related requirements</li>
            </ul>
            <p>
              The final cost is determined by the relevant hospital or healthcare provider.
            </p>

            <h2>6. Medical Tourism Services</h2>
            <p>
              Where requested, Asad Healthcare may assist with medical travel arrangements, including:
            </p>
            <ul>
              <li>Hospital coordination</li>
              <li>Doctor appointments</li>
              <li>Travel assistance</li>
              <li>Visa-related assistance</li>
              <li>Accommodation</li>
              <li>Transportation</li>
              <li>Local coordination</li>
            </ul>
            <p>
              Third-party services may be provided by independent providers. Their terms, availability, charges, and responsibilities may apply separately.
            </p>

            <h2>7. User Information</h2>
            <p>
              When submitting an enquiry or requesting services, you agree to provide accurate and current information.
              If you provide medical reports or other health information, you confirm that you are authorized to provide that information.
              Our collection and use of personal information is governed by our Privacy Policy.
            </p>

            <h2>8. International Users</h2>
            <p>
              Asad Healthcare serves users and prospective patients from different countries.
              You are responsible for ensuring that you comply with the laws and requirements applicable to you when travelling to India or obtaining medical services in India.
              Visa approval, immigration decisions, travel permissions, and entry into India are determined by the relevant authorities.
            </p>

            <h2>9. Third-Party Websites & Services</h2>
            <p>
              Our website may contain links to third-party websites, including hospitals, doctors, travel companies, accommodation providers, payment services, and other organizations.
              We do not control third-party websites and are not responsible for their content, availability, security, services, or privacy practices.
              Your use of third-party services may be subject to their own terms and policies.
            </p>

            <h2>10. Website Content</h2>
            <p>
              We make reasonable efforts to provide useful and accurate information. However, medical information, hospital details, doctor profiles, treatment information, prices, availability, and other website content may change.
              We do not guarantee that all website information will always be complete, current, or error-free.
              You should verify important medical, financial, and treatment-related information with the relevant healthcare provider before making a decision.
            </p>

            <h2>11. Intellectual Property</h2>
            <p>
              Unless otherwise stated, the content on the Asad Healthcare website, including text, graphics, logos, images, designs, and other materials, is owned by or licensed to Asad Healthcare.
              You may view the website for personal and informational purposes.
              You may not reproduce, copy, modify, distribute, publish, sell, or commercially use our content without prior written permission, except where permitted by applicable law.
            </p>

            <h2>12. Website Availability</h2>
            <p>
              We aim to keep our website available and functioning properly, but we do not guarantee uninterrupted or error-free access.
              We may temporarily suspend, modify, update, or discontinue any part of the website without prior notice when reasonably necessary.
            </p>

            <h2>13. Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, Asad Healthcare will not be responsible for losses or damages arising from:
            </p>
            <ul>
              <li>Medical treatment or clinical decisions made by healthcare providers</li>
              <li>Treatment outcomes or complications</li>
              <li>Actions or omissions of hospitals or doctors</li>
              <li>Third-party travel or accommodation services</li>
              <li>Visa or immigration decisions</li>
              <li>Changes in treatment costs</li>
              <li>Travel delays or cancellations</li>
              <li>Information provided by third parties</li>
              <li>Temporary website interruptions</li>
              <li>Reliance on general information published on our website</li>
            </ul>
            <p>
              Nothing in these Terms limits any liability that cannot legally be excluded or limited under applicable law.
            </p>

            <h2>14. Indemnity</h2>
            <p>
              To the extent permitted by applicable law, you agree to hold Asad Healthcare harmless from claims, losses, liabilities, or expenses arising from your misuse of the website, violation of these Terms, or unlawful use of our services.
            </p>

            <h2>15. Privacy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect personal information.
            </p>

            <h2>16. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time to reflect changes in our services, website, business practices, or applicable legal requirements.
              Any updates will be published on this page with a revised "Last Updated" date.
              Your continued use of the website after changes are published means that you accept the updated Terms, to the extent permitted by applicable law.
            </p>

            <h2>17. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and interpreted in accordance with the applicable laws of India, unless applicable law requires otherwise.
              Any dispute arising in connection with these Terms will be subject to the jurisdiction of the appropriate courts or authorities in India, subject to applicable law.
            </p>

            <h2>18. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service or our medical tourism services, please contact us:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl mt-4 mb-8 not-prose">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Asad Healthcare</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li><strong>Email:</strong> info@asadhealthcare.com</li>
                <li><strong>Phone/WhatsApp:</strong> +91 99180 53077</li>
                <li><strong>Address:</strong> [Official Business Address]</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 not-prose">
              <h3 className="text-amber-800 dark:text-amber-500 font-bold mb-2">Important Medical Notice</h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                Asad Healthcare helps users explore and coordinate medical tourism services in India. We do not replace qualified doctors, hospitals, or other healthcare professionals. Medical decisions should always be made after consultation with an appropriate qualified healthcare provider.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
