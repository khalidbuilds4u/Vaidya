"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBlog } from "@/app/actions/cmsActions"
import { Switch } from "@/components/ui/switch"

export function BlogForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

    const data = {
      title,
      slug,
      excerpt: formData.get("excerpt") || null,
      content: formData.get("content"),
      coverImage: formData.get("coverImage") || null,
      authorName: formData.get("authorName") || "Admin",
      published: formData.get("published") === "on",
    }

    try {
      await createBlog(data)
      router.push("/admin/blogs")
    } catch (err: any) {
      setError(err.message || "Failed to publish blog post")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      
      <div className="space-y-2">
        <Label htmlFor="title">Post Title <span className="text-red-500">*</span></Label>
        <Input id="title" name="title" required placeholder="Enter an engaging title..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="authorName">Author Name</Label>
          <Input id="authorName" name="authorName" defaultValue="Admin" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input id="coverImage" name="coverImage" placeholder="https://example.com/image.jpg" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
        <Textarea 
          id="excerpt" 
          name="excerpt" 
          placeholder="A short summary of the post..." 
          className="min-h-[80px]" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Full Content <span className="text-red-500">*</span></Label>
        <Textarea 
          id="content" 
          name="content" 
          required 
          placeholder="Write your blog post here..." 
          className="min-h-[300px]" 
        />
      </div>

      <div className="flex items-center space-x-2 p-4 bg-slate-50 rounded-lg border border-slate-100">
        <Switch id="published" name="published" defaultChecked />
        <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Post"}
        </Button>
      </div>
    </form>
  )
}
