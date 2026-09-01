import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { GalleryList } from "./GalleryList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Gallery | Admin Dashboard",
}

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">Gallery Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage images displayed on the public gallery page.
          </p>
        </div>
        <Link href="/admin/gallery/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </Link>
      </div>

      <GalleryList initialImages={images} />
    </div>
  )
}
