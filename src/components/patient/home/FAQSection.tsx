"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall, Sparkles } from "lucide-react";
import { EnquiryForm } from "@/components/patient/EnquiryForm";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const FAQS = [
  {
    question: "Why should I choose India for medical treatment?",
    answer: "India offers world-class medical facilities, internationally accredited hospitals (JCI & NABH), highly skilled doctors trained in the US/UK, and advanced medical technology at 60–80% lower costs compared to Western nations, with virtually zero waiting times."
  },
  {
    question: "Will there be a language barrier during my hospital stay?",
    answer: "No. English is the official operational language across all accredited Indian hospitals. Furthermore, our team assigns a dedicated translator (Arabic, Russian, French, Bengali, Swahili) to assist you during all consultations and hospital admissions."
  },
  {
    question: "How do I obtain an Indian Medical Visa (Med Visa)?",
    answer: "Once you share your medical reports and select your preferred hospital, we arrange an official Visa Invitation Letter (VIL) from the hospital. You can use this to obtain an e-Medical Visa online within 48 to 72 hours."
  },
  {
    question: "Can family members or attendants travel with me?",
    answer: "Yes, up to two family members or attendants can travel with you on a Medical Attendant Visa (MED-X). The official hospital invitation letter will explicitly include their details."
  },
  {
    question: "How does the quotation and payment process work?",
    answer: "Our consultation and concierge coordination is 100% free for patients. All treatment payments are settled directly with the hospital upon arrival via credit card, bank wire transfer, or foreign currency."
  },
  {
    question: "What happens when I land at the airport in India?",
    answer: "Our representative will receive you directly at the airport terminal with a personalized name placard, transport you to your hotel or hospital room, and provide you with a local SIM card and currency exchange assistance."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const t = useTranslations('FAQ');
  const localizedFaqs = Array.from({ length: 26 }, (_, i) => {
    const key = `q${i + 1}` as any;
    return {
      question: t(`faqs.${key}.question`),
      answer: t(`faqs.${key}.answer`)
    };
  });

  const visibleFaqs = showAll ? localizedFaqs : localizedFaqs.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50/70">
      {/* Ambient Lighting */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[400px] ambient-glow rounded-full -z-10 opacity-50" />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t('tag')}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('desc')}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-primary/40 shadow-md sm:shadow-lg bg-white' : 'hover:border-slate-300 bg-white/90'
                }`}
              >
                <button
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-5 text-left flex justify-between items-center bg-transparent cursor-pointer transition-colors gap-2"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="flex items-center gap-2.5 sm:gap-3 pr-2">
                    <HelpCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isOpen ? 'text-primary' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm sm:text-lg ${isOpen ? 'text-primary' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                    }`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-base leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-5 border-slate-300 text-slate-700 hover:text-primary hover:bg-slate-50 hover:border-primary font-bold shadow-sm transition-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less Questions' : 'Read All Questions'}
          </Button>
        </div>

        {/* Bottom Help Glass Box with Perfect Alignment */}
        <div className="mt-10 sm:mt-14 glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5 border border-white bg-white/95 shadow-lg">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-1">{t('bottom.title')}</h3>
            <p className="text-xs sm:text-sm text-slate-600">{t('bottom.desc')}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a 
              href="tel:+919451187513"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 whitespace-nowrap active:scale-95 border border-slate-200/70"
            >
              <PhoneCall className="w-4 h-4 text-primary shrink-0" />
              <span className="whitespace-nowrap font-mono tracking-tight">+91&nbsp;94511&nbsp;87513</span>
            </a>
            
            <EnquiryForm>
              <Button className="w-full sm:w-auto rounded-full shadow-md bg-primary hover:bg-primary/90 font-bold px-6 text-xs sm:text-sm h-11 shrink-0 whitespace-nowrap text-white active:scale-95">
                {t('bottom.button')}
              </Button>
            </EnquiryForm>
          </div>
        </div>

      </div>
    </section>
  );
}
