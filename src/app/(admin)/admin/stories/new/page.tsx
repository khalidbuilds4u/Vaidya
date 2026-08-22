import { Metadata } from "next"
import { StoryForm } from "./StoryForm"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Add Patient Story | Admin Dashboard",
}

export default async function NewStoryPage() {
  const treatments = await prisma.treatment.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Add Patient Story</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Publish a new success story.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <StoryForm treatments={treatments} />
      </div>
    </div>
  )
}
