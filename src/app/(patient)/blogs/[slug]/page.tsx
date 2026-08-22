import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  })
  if (!blog) return { title: "Not Found" }
  return {
    title: `${blog.title} | Asad Healthcare`,
    description: blog.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  })

  if (!blog || !blog.published) {
    notFound()
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Article Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        {blog.coverImage && (
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center" 
            style={{ backgroundImage: `url('${blog.coverImage}')` }} 
          />
        )}
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link href="/blogs" className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{blog.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-4xl mx-auto border border-slate-100">
          <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
        </div>
      </section>
    </div>
  )
}
