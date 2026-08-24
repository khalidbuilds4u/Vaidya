import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { BlogForm } from "../new/BlogForm"

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  const blog = await prisma.blogPost.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Blog Post</h2>
        <p className="text-slate-500 mt-1">Update the blog post and its translations.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <BlogForm initialData={blog} />
      </div>
    </div>
  )
}
