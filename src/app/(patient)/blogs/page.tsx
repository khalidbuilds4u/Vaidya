import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "Health & Wellness Blog | Asad Healthcare",
  description: "Read the latest insights, news, and tips on medical treatments and wellness.",
}

export default async function BlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop')" }} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-teal-300 font-semibold text-sm mb-6">
            <FileText className="w-4 h-4" /> Medical Insights
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Our Blog
          </h1>
          <p className="text-lg text-slate-300">
            Expert articles on health, treatments, and medical tourism.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-slate-100">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Articles Yet</h2>
            <p className="text-slate-500">We are currently writing some amazing content. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link href={`/blogs/${blog.slug}`} key={blog.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                <div className="aspect-video bg-slate-100 overflow-hidden relative">
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-200">
                      <FileText className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-slate-500 font-medium mb-3">{new Date(blog.createdAt).toLocaleDateString()} • By {blog.authorName}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-slate-600 line-clamp-3 mb-6 flex-1">{blog.excerpt || blog.content.substring(0, 150) + "..."}</p>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
