"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createContactMessage } from "@/app/actions/cmsActions"
import { CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function ContactForm() {
  const t = useTranslations("ContactUs.form")
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
      setError(err.message || t("error"))
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center space-y-4 transition-colors duration-500">
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 dark:text-emerald-400" />
        <h3 className="text-xl font-bold">{t("success.title")}</h3>
        <p className="text-emerald-700/80 dark:text-emerald-400/80">
          {t("success.desc")}
        </p>
        <Button 
          variant="outline" 
          className="mt-4 bg-white dark:bg-transparent border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 transition-colors"
          onClick={() => setIsSuccess(false)}
        >
          {t("buttons.sendAnother")}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm transition-colors duration-500">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="dark:text-slate-200">{t("labels.name")} <span className="text-red-500 dark:text-red-400">*</span></Label>
          <Input id="name" name="name" required placeholder={t("placeholders.name")} className="bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-colors duration-500" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="dark:text-slate-200">{t("labels.email")} <span className="text-red-500 dark:text-red-400">*</span></Label>
          <Input id="email" name="email" type="email" required placeholder={t("placeholders.email")} className="bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-colors duration-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="dark:text-slate-200">{t("labels.phone")}</Label>
          <Input id="phone" name="phone" placeholder={t("placeholders.phone")} className="bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-colors duration-500" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject" className="dark:text-slate-200">{t("labels.subject")}</Label>
          <Input id="subject" name="subject" placeholder={t("placeholders.subject")} className="bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-colors duration-500" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="dark:text-slate-200">{t("labels.message")} <span className="text-red-500 dark:text-red-400">*</span></Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          placeholder={t("placeholders.message")} 
          className="min-h-[150px] bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-colors duration-500" 
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? t("buttons.sending") : t("buttons.send")}
      </Button>
    </form>
  )
}
