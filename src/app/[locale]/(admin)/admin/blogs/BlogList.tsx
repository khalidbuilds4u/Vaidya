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
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

import { deleteBlog } from "@/app/actions/cmsActions"

export function BlogList({ initialBlogs }: { initialBlogs: any[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    
    setIsDeleting(id)
    try {
      await deleteBlog(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete blog:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (initialBlogs.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-xl border border-dashed">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No blogs yet</h3>
        <p className="text-slate-500 mb-4">Write your first blog post to engage your patients.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>{blog.authorName}</TableCell>
              <TableCell>
                {blog.published ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                    <Eye className="w-3.5 h-3.5" /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium">
                    <EyeOff className="w-3.5 h-3.5" /> Draft
                  </span>
                )}
              </TableCell>
              <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/en/blogs/${blog.slug}`} target="_blank" title="Preview">
                      <Eye className="w-4 h-4 text-slate-500 hover:text-primary" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/blogs/${blog.id}`} title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(blog.id)}
                    disabled={isDeleting === blog.id}
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
