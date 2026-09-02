import { Metadata } from "next"
import { ContactForm } from "./ContactForm"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us | Asad Healthcare",
  description: "Get in touch with Asad Healthcare for your medical travel needs. We're here to help you 24/7.",
}

export default async function ContactUsPage() {
  const t = await getTranslations('ContactUs');
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-slate-900 dark:bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden transition-colors duration-500 border-b dark:border-slate-800">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-slate-300">
            {t('hero.desc')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden max-w-5xl mx-auto transition-colors duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Contact Information */}
            <div className="lg:col-span-2 bg-primary dark:bg-slate-800 p-8 sm:p-12 text-white transition-colors duration-500">
              <h2 className="text-2xl font-bold mb-6">{t('info.title')}</h2>
              <p className="text-teal-50/90 dark:text-slate-300 mb-8 leading-relaxed transition-colors duration-500">
                {t('info.desc')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 shrink-0 text-teal-300 dark:text-teal-400" />
                  <div>
                    <h4 className="font-semibold">{t('info.phone')}</h4>
                    <a href="tel:+919918053077" className="text-teal-50/90 dark:text-slate-300 hover:text-white dark:hover:text-white mt-1 block transition-colors">
                      +91 99180 53077
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 shrink-0 text-teal-300 dark:text-teal-400" />
                  <div>
                    <h4 className="font-semibold">{t('info.email')}</h4>
                    <a href="mailto:asadhealthcareindia@gmail.com" className="text-teal-50/90 dark:text-slate-300 hover:text-white dark:hover:text-white mt-1 block transition-colors">
                      asadhealthcareindia@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 shrink-0 text-teal-300 dark:text-teal-400" />
                  <div>
                    <h4 className="font-semibold">{t('info.office')}</h4>
                    <p className="text-teal-50/90 dark:text-slate-300 mt-1 leading-relaxed whitespace-pre-line transition-colors duration-500">
                      {t('info.officeAddress')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 shrink-0 text-teal-300 dark:text-teal-400" />
                  <div>
                    <h4 className="font-semibold">{t('info.hours')}</h4>
                    <p className="text-teal-50/90 dark:text-slate-300 mt-1 transition-colors duration-500">
                      {t('info.hoursDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 sm:p-12 bg-white dark:bg-slate-900/95 transition-colors duration-500">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('form.title')}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
