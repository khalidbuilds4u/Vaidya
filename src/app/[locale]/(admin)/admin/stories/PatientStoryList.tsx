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
import { Edit2, Trash2, Eye } from "lucide-react"
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="text-slate-500 font-semibold">Title</TableHead>
            <TableHead className="text-slate-500 font-semibold">Patient Name</TableHead>
            <TableHead className="text-slate-500 font-semibold">Treatment</TableHead>
            <TableHead className="text-slate-500 font-semibold">Date Added</TableHead>
            <TableHead className="text-slate-500 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialStories.map((story) => (
            <TableRow key={story.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
              <TableCell className="font-medium text-slate-900">{story.title}</TableCell>
              <TableCell className="text-slate-600">{story.patientName}</TableCell>
              <TableCell className="text-slate-600">{story.treatment?.name || "General"}</TableCell>
              <TableCell className="text-slate-600">{new Date(story.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/en/patient-stories/${story.slug}`} target="_blank" title="Preview">
                      <Eye className="w-4 h-4 text-slate-500 hover:text-primary" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/stories/${story.id}`}>
                      <Edit2 className="w-4 h-4 text-slate-500 hover:text-slate-900" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
