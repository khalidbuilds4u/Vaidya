import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { StoryForm } from "../new/StoryForm"

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  const story = await prisma.patientStory.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!story) {
    notFound()
  }

  const treatments = await prisma.treatment.findMany({
    select: { id: true, name: true }
  })

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Patient Story</h2>
        <p className="text-slate-500 mt-1">Update the patient story and its translations.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <StoryForm treatments={treatments} initialData={story} />
      </div>
    </div>
  )
}
