"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { submitPatientLead } from '@/app/actions/publicLeadActions';
import { Loader2, ClipboardList, X, UserCircle, Phone, Stethoscope, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Oman",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Iraq",
  "Bangladesh",
  "Kenya",
  "Nigeria",
  "Tanzania",
  "Uganda",
  "Ghana",
  "Uzbekistan",
  "Russia",
  "Kazakhstan",
  "Canada",
  "Australia",
  "Other"
];

const WHATSAPP_NUMBER = "919451187513";

export function EnquiryForm({ children }: { children: React.ReactNode }) {
  const t = useTranslations('EnquiryForm');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    dob: '',
    age: '',
    condition: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Database (Supabase) via Server Action
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('country', formData.country);
      data.append('dob', formData.dob);
      data.append('age', formData.age);
      data.append('condition', formData.condition);

      await submitPatientLead(data);

      // Show success state
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to submit lead", error);
      alert(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    
    // Only reset form state when closing
    if (!open) {
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        dob: '',
        age: '',
        condition: '',
      });
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {children && (
        <span onClick={() => setIsOpen(true)} className="contents cursor-pointer">
          {children}
        </span>
      )}
      <DialogContent className="w-[95vw] sm:max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border-0 shadow-2xl p-0 bg-white" showCloseButton={false}>
        
        {isSuccess ? (
          <div className="py-12 px-6 text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t('success.title')}</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              {t('success.desc')}
            </p>
            <div className="pt-6">
              <Button onClick={() => handleClose(false)} className="rounded-xl shadow-lg bg-[#123654] hover:bg-[#0d2a42] h-12 px-10 font-bold text-sm w-full sm:w-auto">
                {t('success.button')}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Premium Header */}
            <div className="relative bg-gradient-to-br from-[#123654] to-[#0a2440] px-6 sm:px-8 py-7 rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <ClipboardList className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{t('header.title')}</DialogTitle>
                  </div>
                  <button onClick={() => handleClose(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <DialogDescription className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {t('header.desc')}
                </DialogDescription>
              </div>
            </div>

            {/* Form Body */}
            <form className="px-6 sm:px-8 py-6 space-y-5" onSubmit={handleSubmit}>
              
              {/* Personal Info Group */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <UserCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('form.personalInfo') || 'Personal Information'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.firstName')}</label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t('form.firstNamePlaceholder')} 
                      className="rounded-xl h-11 border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium placeholder:text-slate-300 transition-colors"
                      required 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.lastName')}</label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t('form.lastNamePlaceholder')} 
                      className="rounded-xl h-11 border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium placeholder:text-slate-300 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.dob')}</label>
                    <Input 
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="rounded-xl h-11 border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium text-slate-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.age')}</label>
                    <Input 
                      type="number"
                      name="age"
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder={t('form.agePlaceholder')} 
                      className="rounded-xl h-11 border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium placeholder:text-slate-300 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Contact Info Group */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('form.contactInfo') || 'Contact Details'}</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.email')}</label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('form.emailPlaceholder')} 
                    className="rounded-xl h-11 border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium placeholder:text-slate-300 transition-colors"
                    required 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.phone')}</label>
                  <Input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('form.phonePlaceholder')} 
                    className="rounded-xl h-11 border-slate-200 bg-slate-50/50 focus:bg-white text-sm font-medium placeholder:text-slate-300 transition-colors"
                    required 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.country')}</label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white px-3.5 py-2 text-sm text-slate-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-colors" 
                    required
                  >
                    <option value="">{t('form.countryPlaceholder')}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {t(`countries.${c}`) || c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Medical Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('form.medicalInfo') || 'Medical Information'}</span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('form.condition')}</label>
                  <textarea 
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    rows={3}
                    className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white px-3.5 py-3 text-sm placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-slate-700 font-medium resize-none transition-colors"
                    placeholder={t('form.conditionPlaceholder')}
                    required
                  ></textarea>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-100 mt-2 pt-5">
                <Button variant="outline" type="button" className="rounded-xl h-11 px-6 font-semibold border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50" onClick={() => handleClose(false)} disabled={isSubmitting}>{t('form.cancel')}</Button>
                <Button type="submit" className="rounded-xl shadow-lg shadow-primary/20 bg-[#123654] hover:bg-[#0d2a42] h-11 px-8 font-bold text-sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    t('form.submit')
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

