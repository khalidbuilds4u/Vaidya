"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    condition: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    // Format the WhatsApp message with clear markdown structure
    const message = 
`🏥 *New Treatment Plan Request | AsadHealthcare*
━━━━━━━━━━━━━━━━━━━━━

👤 *Patient Information:*
• *Name:* ${fullName || 'Not provided'}
• *Email:* ${formData.email.trim() || 'Not provided'}
• *Phone/WhatsApp:* ${formData.phone.trim() || 'Not provided'}
• *Country:* ${formData.country || 'Not specified'}

🩺 *Medical Condition / Treatment Required:*
${formData.condition.trim()}

━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* AsadHealthcare Website`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset form and close dialog
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      condition: '',
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <DialogTrigger render={children as React.ReactElement} />
      )}
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Get a Free Treatment Plan</DialogTitle>
          <DialogDescription>
            Submit your medical details. Our patient assistance team will review your case and connect directly with you on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">First Name *</label>
              <Input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. John" 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Last Name</label>
              <Input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Doe" 
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Email Address *</label>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com" 
              required 
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Phone / WhatsApp Number *</label>
            <Input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 8900" 
              required 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Country of Residence *</label>
            <select 
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              required
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Medical Condition / Required Treatment *</label>
            <textarea 
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              rows={3}
              className="flex min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-slate-800"
              placeholder="Briefly describe your diagnosis, symptoms, or requested procedure..."
              required
            ></textarea>
          </div>
          
          <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-2.5">
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" className="shadow-md bg-primary hover:bg-primary/90">
              Submit & Send to WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
