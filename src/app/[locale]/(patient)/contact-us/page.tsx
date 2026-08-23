import { Metadata } from "next"
import { ContactForm } from "./ContactForm"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "Contact Us | Asad Healthcare",
  description: "Get in touch with Asad Healthcare for your medical travel needs. We're here to help you 24/7.",
}

export default function ContactUsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-300">
            Have questions about medical treatments in India? Our international care team is available 24/7 to assist you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Contact Information */}
            <div className="lg:col-span-2 bg-primary p-8 sm:p-12 text-white">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                Reach out to us for free medical estimates, visa assistance, or any inquiries regarding your travel.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 shrink-0 text-teal-300" />
                  <div>
                    <h4 className="font-semibold">Phone / WhatsApp</h4>
                    <a href="tel:+919451187513" className="text-primary-foreground/90 hover:text-white mt-1 block">
                      +91 94511 87513
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 shrink-0 text-teal-300" />
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <a href="mailto:care@asadhealthcare.com" className="text-primary-foreground/90 hover:text-white mt-1 block">
                      care@asadhealthcare.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 shrink-0 text-teal-300" />
                  <div>
                    <h4 className="font-semibold">Head Office</h4>
                    <p className="text-primary-foreground/90 mt-1 leading-relaxed">
                      Sector 62, Noida<br />
                      Delhi NCR, India 201309
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 shrink-0 text-teal-300" />
                  <div>
                    <h4 className="font-semibold">Working Hours</h4>
                    <p className="text-primary-foreground/90 mt-1">
                      24/7 Support for International Patients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 sm:p-12 bg-white">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
