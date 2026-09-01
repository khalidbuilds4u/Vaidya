import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getTranslation } from "@/lib/utils"
import { getTranslations } from "next-intl/server"

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug }
  })
  if (!blog) return { title: "Not Found" }
  return {
    title: `${getTranslation(blog, 'title', resolvedParams.locale)} | Asad Healthcare`,
    description: getTranslation(blog, 'excerpt', resolvedParams.locale),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations("BlogDetail");
  const blog = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug }
  })

  if (!blog || !blog.published) {
    notFound()
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      {/* Article Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        {blog.coverImage && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image 
              src={blog.coverImage} 
              alt={getTranslation(blog, 'title', resolvedParams.locale) || "Blog Cover"} 
              fill 
              priority 
              className="object-cover object-center" 
            />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link href={`/${resolvedParams.locale}/blogs`} className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t('backToBlogs', { fallback: "Back to Blogs" })}
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            {getTranslation(blog, 'title', resolvedParams.locale)}
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
        <div className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-xl dark:shadow-none p-8 sm:p-12 max-w-4xl mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-500">
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: getTranslation(blog, 'content', resolvedParams.locale) || blog.content }} />
        </div>
      </section>
    </div>
  )
}
