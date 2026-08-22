"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createGalleryImage } from "@/app/actions/cmsActions"

export function GalleryForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
    }

    try {
      await createGalleryImage(data)
      router.push("/admin/gallery")
    } catch (err: any) {
      setError(err.message || "Failed to upload image")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      
      <div className="space-y-2">
        <Label htmlFor="title">Image Title / Description <span className="text-red-500">*</span></Label>
        <Input id="title" name="title" required placeholder="e.g. Modern ICU Facilities" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select 
          id="category" 
          name="category"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="Hospital Facilities">Hospital Facilities</option>
          <option value="Success Stories">Success Stories</option>
          <option value="Medical Team">Medical Team</option>
          <option value="Events">Events</option>
          <option value="General">General</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL <span className="text-red-500">*</span></Label>
        <Input id="imageUrl" name="imageUrl" required placeholder="https://example.com/image.jpg" />
        <p className="text-xs text-slate-500 mt-1">Paste a direct link to the image.</p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Upload Image"}
        </Button>
      </div>
    </form>
  )
}
