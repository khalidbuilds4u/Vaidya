"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"
import Link from "next/link"

import { deleteStory } from "@/app/actions/cmsActions"

export function PatientStoryList({ initialStories }: { initialStories: any[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return
    
    setIsDeleting(id)
    try {
      await deleteStory(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete story:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (initialStories.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-xl border border-dashed">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No stories yet</h3>
        <p className="text-slate-500 mb-4">Add your first patient success story to display on the frontend.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Treatment</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialStories.map((story) => (
            <TableRow key={story.id}>
              <TableCell className="font-medium">{story.title}</TableCell>
              <TableCell>{story.patientName}</TableCell>
              <TableCell>{story.treatment?.name || "General"}</TableCell>
              <TableCell>{new Date(story.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/stories/${story.id}`}>
                      <Edit2 className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(story.id)}
                    disabled={isDeleting === story.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
