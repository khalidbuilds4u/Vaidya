import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { PatientStoryList } from "./PatientStoryList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Patient Stories | Admin Dashboard",
}

export default async function AdminStoriesPage() {
  const stories = await prisma.patientStory.findMany({
    orderBy: { createdAt: "desc" },
    include: { treatment: true }
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patient Stories</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage success stories and patient testimonials.
          </p>
        </div>
        <Link href="/admin/stories/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Story
          </Button>
        </Link>
      </div>

      <PatientStoryList initialStories={stories} />
    </div>
  )
}
