import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { BlogList } from "./BlogList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blogs | Admin Dashboard",
}

export default async function AdminBlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage blog posts and articles.
          </p>
        </div>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Write Post
          </Button>
        </Link>
      </div>

      <BlogList initialBlogs={blogs} />
    </div>
  )
}
