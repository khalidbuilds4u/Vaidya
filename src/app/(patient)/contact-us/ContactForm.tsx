"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createContactMessage } from "@/app/actions/cmsActions"
import { CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || null,
      subject: formData.get("subject") as string || null,
      message: formData.get("message") as string,
    }

    try {
      await createContactMessage(data)
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again later.")
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl border border-emerald-100 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500" />
        <h3 className="text-xl font-bold">Message Sent Successfully!</h3>
        <p className="text-emerald-700/80">
          Thank you for reaching out to Asad Healthcare. Our international care team will review your message and get back to you shortly.
        </p>
        <Button 
          variant="outline" 
          className="mt-4 bg-white border-emerald-200 hover:bg-emerald-100 text-emerald-700"
          onClick={() => setIsSuccess(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input id="name" name="name" required placeholder="John Doe" className="bg-slate-50" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-slate-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" className="bg-slate-50" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="How can we help?" className="bg-slate-50" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          placeholder="Please describe your medical condition or inquiry..." 
          className="min-h-[150px] bg-slate-50" 
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
