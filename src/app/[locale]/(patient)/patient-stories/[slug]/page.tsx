import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Heart, Quote, ArrowLeft, MapPin, Globe, Calendar, Stethoscope } from "lucide-react"
import { getTranslation } from "@/lib/utils"

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug } = await params
  const story = await prisma.patientStory.findUnique({ where: { slug } })
  
  if (!story) return { title: "Story Not Found" }
  
  return {
    title: `${story.title} | Patient Story | Asad Healthcare`,
    description: story.content.substring(0, 160) + "...",
  }
}

export default async function PatientStoryDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const resolvedParams = await params
  
  const story = await prisma.patientStory.findUnique({
    where: { slug: resolvedParams.slug },
    include: { treatment: true, specialty: true }
  })

  if (!story) {
    notFound()
  }

  // Fetch other stories for "More Stories" section
  const otherStories = await prisma.patientStory.findMany({
    where: { id: { not: story.id } },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { treatment: true, specialty: true }
  })

  const title = getTranslation(story, 'title', resolvedParams.locale) || story.title
  const content = getTranslation(story, 'content', resolvedParams.locale) || story.content
  const specialtyName = story.treatment 
    ? getTranslation(story.treatment, 'name', resolvedParams.locale) 
    : story.specialty 
      ? getTranslation(story.specialty, 'name', resolvedParams.locale) 
      : null

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {story.imageUrl && (
            <Image src={story.imageUrl} alt={title} fill priority className="object-cover" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/90" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link 
            href={`/${resolvedParams.locale}/patient-stories`}
            className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Stories
          </Link>
          
          {specialtyName && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-teal-300 font-semibold text-sm mb-4">
              <Stethoscope className="w-4 h-4" /> {specialtyName}
            </div>
          )}
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-lg">
                {story.patientName.charAt(0)}
              </div>
              <span className="font-semibold text-white">{story.patientName}</span>
            </div>
            {story.hospital && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>{story.hospital}</span>
              </div>
            )}
            {story.country && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-teal-400" />
                <span>{story.country}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>{new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 max-w-4xl">
        <div className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 transition-colors duration-500">
          
          {story.imageUrl && (
            <div className="w-full h-64 sm:h-80 md:h-96 relative rounded-xl overflow-hidden mb-8">
              <Image 
                src={story.imageUrl} 
                alt={title} 
                fill 
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover" 
                priority
              />
            </div>
          )}

          <div className="relative">
            <Quote className="absolute -top-2 -left-4 w-12 h-12 text-slate-100 dark:text-slate-800 -z-10 transform rotate-180 transition-colors" />
            <div 
              className="prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </div>

          {/* Patient Info Card */}
          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-teal-400/10 text-primary dark:text-teal-400 flex items-center justify-center font-bold text-2xl">
                {story.patientName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-xl text-slate-900 dark:text-white">{story.patientName}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {story.country && <span>🌍 {story.country}</span>}
                  {story.hospital && <span>📍 {story.hospital}</span>}
                  {specialtyName && <span>🩺 {specialtyName}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories */}
      {otherStories.length > 0 && (
        <section className="container mx-auto px-4 mt-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">More Patient Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStories.map(other => (
              <Link 
                key={other.id} 
                href={`/${resolvedParams.locale}/patient-stories/${other.slug}`}
                className="bg-white dark:bg-slate-900/95 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {other.imageUrl && (
                  <div className="w-full h-36 relative">
                    <Image 
                      src={other.imageUrl} 
                      alt={getTranslation(other, 'title', resolvedParams.locale) || "Story"} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">
                    {getTranslation(other, 'title', resolvedParams.locale)}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{other.patientName}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
