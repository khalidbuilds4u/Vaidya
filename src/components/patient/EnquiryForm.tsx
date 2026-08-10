"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function EnquiryForm({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <DialogTrigger render={children as React.ReactElement} />
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get a Free Treatment Plan</DialogTitle>
          <DialogDescription>
            Submit your details and medical condition. Our patient assistance team will review your case and connect you with top hospitals.
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); alert("Enquiry submitted successfully!"); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input placeholder="John" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input type="email" placeholder="john@example.com" required />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone / WhatsApp</label>
            <Input type="tel" placeholder="+1 234 567 8900" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country of Residence</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" required>
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="NG">Nigeria</option>
              <option value="KE">Kenya</option>
              <option value="AE">UAE</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Medical Condition / Required Treatment</label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Please briefly describe your medical condition..."
              required
            ></textarea>
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
