"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createStory, updateStory } from "@/app/actions/cmsActions"

export function StoryForm({ treatments, initialData }: { treatments: any[], initialData?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    
    // Auto-generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

    const data = {
      title,
      slug,
      patientName: formData.get("patientName"),
      treatmentId: formData.get("treatmentId") || null,
      imageUrl: formData.get("imageUrl") || null,
      content: formData.get("content"),
      title_ar: formData.get("title_ar") || null,
      content_ar: formData.get("content_ar") || null,
    }

    try {
      if (initialData) {
        await updateStory(initialData.id, data)
      } else {
        await createStory(data)
      }
      router.push("/admin/stories")
    } catch (err: any) {
      setError(err.message || "Failed to create story")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Story Title <span className="text-red-500">*</span></Label>
          <Input id="title" name="title" defaultValue={initialData?.title} required placeholder="e.g. Life changing surgery in India" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="patientName">Patient Name <span className="text-red-500">*</span></Label>
          <Input id="patientName" name="patientName" defaultValue={initialData?.patientName} required placeholder="e.g. John Doe" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="treatmentId">Related Treatment</Label>
          <select 
            id="treatmentId" 
            name="treatmentId"
            defaultValue={initialData?.treatmentId || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">None / General</option>
            {treatments.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={initialData?.imageUrl || ""} placeholder="https://example.com/image.jpg" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Story Content <span className="text-red-500">*</span></Label>
        <Textarea 
          id="content" 
          name="content" 
          defaultValue={initialData?.content}
          required 
          placeholder="Write the patient's story here..." 
          className="min-h-[200px]" 
        />
      </div>



      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Publish Story"}
        </Button>
      </div>
    </form>
  )
}
