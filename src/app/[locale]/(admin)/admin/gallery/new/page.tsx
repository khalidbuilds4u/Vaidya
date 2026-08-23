import { Metadata } from "next"
import { GalleryForm } from "./GalleryForm"

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Upload Gallery Image | Admin Dashboard",
}

export default function NewGalleryImagePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Upload Image</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add a new image to the public gallery.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <GalleryForm />
      </div>
    </div>
  )
}
