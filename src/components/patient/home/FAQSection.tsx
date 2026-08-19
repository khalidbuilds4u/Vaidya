"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import { EnquiryForm } from "@/components/patient/EnquiryForm";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/70">
      {/* Ambient Lighting */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] ambient-glow rounded-full -z-10 opacity-50" />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Patient Support
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about planning your medical journey, visa assistance, and hospital stay in India.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-primary/40 shadow-lg bg-white' : 'hover:border-slate-300'
                }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-transparent cursor-pointer transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-primary' : 'text-slate-400'}`} />
                    <span className={`font-bold text-base sm:text-lg ${isOpen ? 'text-primary' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : 'text-slate-400'
                    }`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Glass Box */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl text-center flex flex-col sm:flex-row items-center justify-between gap-6 border border-white">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg text-slate-900 mb-1">Still have questions?</h3>
            <p className="text-sm text-slate-600">Our medical assistance team is available 24/7 on WhatsApp &amp; Phone.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="tel:+919451187513"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-primary" />
              <span>+91 94511 87513</span>
            </a>
            <EnquiryForm>
              <Button className="rounded-full shadow-md bg-primary hover:bg-primary/90 font-semibold px-6">
                Ask a Specialist
              </Button>
            </EnquiryForm>
          </div>
        </div>
      </div>
    </section>
  );
}
