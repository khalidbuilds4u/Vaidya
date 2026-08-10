"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Why should I choose India for medical treatment?",
    answer: "India offers world-class medical facilities, internationally accredited hospitals (JCI & NABH), highly skilled doctors, and advanced medical technology at a fraction of the cost compared to Western countries. There are also virtually no waiting times for complex surgeries."
  },
  {
    question: "Will there be a language barrier?",
    answer: "No. English is widely spoken in Indian hospitals, especially those catering to international patients. Additionally, most top hospitals provide dedicated language translators for Arabic, Russian, French, Spanish, and other languages upon request."
  },
  {
    question: "How do I get a medical visa for India?",
    answer: "Once you share your medical reports and choose a hospital, we will provide a Medical Visa Invitation Letter from the hospital. You can use this letter to apply for a Medical Visa online or at the nearest Indian Embassy in your country."
  },
  {
    question: "Can my family member travel with me?",
    answer: "Yes, family members can travel with you on a Medical Attendant Visa. The Medical Visa Invitation Letter provided by the hospital will include the names of your attendants (up to two attendants are usually permitted)."
  },
  {
    question: "Is it safe to travel to India for medical reasons?",
    answer: "Absolutely. India receives hundreds of thousands of medical tourists every year. Our partnered hospitals provide end-to-end assistance, including airport pickups, accommodation arrangements, and a dedicated international patient coordinator to ensure your safety and comfort."
  },
  {
    question: "How do I pay for my treatment?",
    answer: "You do not need to pay anything to us. All payments are made directly to the hospital. Hospitals accept international credit cards, wire transfers, and sometimes cash in major currencies. You will receive an estimated cost before your travel."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600">
            Find answers to common questions about traveling to India for medical treatment.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-slate-200 rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-primary/30 ring-1 ring-primary/10' : 'hover:border-primary/50'}`}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-primary' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180 text-primary' : 'text-slate-400'}`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-5 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
