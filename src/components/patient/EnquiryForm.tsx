"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { submitPatientLead } from '@/app/actions/publicLeadActions';
import { Loader2 } from 'lucide-react';

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
      alert("Something went wrong. Please try again.");
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
        <span onClick={() => setIsOpen(true)} className="inline-block cursor-pointer w-full text-center">
          {children}
        </span>
      )}
      <DialogContent className="w-[95vw] sm:max-w-[540px] max-h-[85vh] overflow-y-auto glass-panel rounded-2xl sm:rounded-3xl border border-white shadow-2xl p-4 sm:p-8 bg-white/95">
        
        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Request Received!</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you for submitting your medical details. Our expert care coordinators are reviewing your case and will contact you shortly to discuss your treatment plan.
            </p>
            <div className="pt-6">
              <Button onClick={() => handleClose(false)} className="rounded-full shadow-lg bg-primary hover:bg-primary/90 h-11 px-8 font-semibold w-full sm:w-auto">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Get a Free Treatment Plan</DialogTitle>
              <DialogDescription className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Submit your medical details. Our expert international care coordinators will review your case and connect with you shortly.
              </DialogDescription>
            </DialogHeader>
        
        <form className="space-y-4 mt-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">First Name *</label>
              <Input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. John" 
                className="glass-input rounded-xl h-11"
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Last Name</label>
              <Input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Doe" 
                className="glass-input rounded-xl h-11"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com" 
              className="glass-input rounded-xl h-11"
              required 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone / WhatsApp Number *</label>
            <Input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 8900" 
              className="glass-input rounded-xl h-11"
              required 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Date of Birth</label>
              <Input 
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="glass-input rounded-xl h-11"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Age</label>
              <Input 
                type="number"
                name="age"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 45" 
                className="glass-input rounded-xl h-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Country of Residence *</label>
            <select 
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="flex h-11 w-full rounded-xl glass-input px-3.5 py-2 text-sm text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-medium" 
              required
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Medical Condition / Required Treatment *</label>
            <textarea 
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[95px] w-full rounded-xl glass-input px-3.5 py-2.5 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-slate-900"
              placeholder="Briefly describe your diagnosis, symptoms, or requested procedure..."
              required
            ></textarea>
          </div>
          
          <div className="pt-3 flex flex-col-reverse sm:flex-row justify-end gap-2.5">
            <Button variant="outline" type="button" className="rounded-full h-11" onClick={() => handleClose(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="rounded-full shadow-lg bg-primary hover:bg-primary/90 h-11 px-6 font-semibold" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit Request"
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
