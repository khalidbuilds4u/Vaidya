import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getTranslation } from "@/lib/utils"

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "Health & Wellness Blog | Asad Healthcare",
  description: "Read the latest insights, news, and tips on medical treatments and wellness.",
}

export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
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
          <div className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4 transition-colors duration-500" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors duration-500">No Articles Yet</h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-500">We are currently writing some amazing content. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/${resolvedParams.locale}/blogs/${blog.slug}`} className="group h-full flex flex-col bg-white dark:bg-slate-900/95 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={getTranslation(blog, 'title', resolvedParams.locale) || blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3 transition-colors duration-500">{new Date(blog.createdAt).toLocaleDateString()} • By {blog.authorName}</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                    {getTranslation(blog, 'title', resolvedParams.locale)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-1 transition-colors duration-500">
                    {getTranslation(blog, 'excerpt', resolvedParams.locale)}
                  </p>
                  <div className="flex items-center text-primary dark:text-teal-400 font-semibold text-sm group-hover:gap-2 transition-all">
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
