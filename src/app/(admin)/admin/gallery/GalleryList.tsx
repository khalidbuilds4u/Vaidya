"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

import { deleteGalleryImage } from "@/app/actions/cmsActions"

export function GalleryList({ initialImages }: { initialImages: any[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return
    
    setIsDeleting(id)
    try {
      await deleteGalleryImage(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete image:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (initialImages.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-xl border border-dashed">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No images yet</h3>
        <p className="text-slate-500 mb-4">Upload images to display on the public gallery.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {initialImages.map((image) => (
        <div key={image.id} className="group relative bg-white rounded-xl border overflow-hidden">
          <div className="aspect-square bg-slate-100 relative">
            {image.imageUrl ? (
              <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleDelete(image.id)}
                disabled={isDeleting === image.id}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm truncate">{image.title}</h4>
            <p className="text-xs text-muted-foreground">{image.category}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
