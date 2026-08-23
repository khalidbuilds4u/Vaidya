import { Metadata } from "next"
import { BlogForm } from "./BlogForm"

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Write Blog Post | Admin Dashboard",
}

export default function NewBlogPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Write Blog Post</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Publish a new article to your blog.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <BlogForm />
      </div>
    </div>
  )
}
