import { Metadata } from "next"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Heart, Quote } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600;


import { getTranslation, stripHtml } from "@/lib/utils"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Patient Success Stories | Asad Healthcare",
  description: "Read inspiring stories from our patients who travelled to India for world-class medical treatments.",
}

export default async function PatientStoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const t = await getTranslations("PatientStories");
  const stories = await prisma.patientStory.findMany({
    orderBy: { createdAt: "desc" },
    include: { treatment: true, specialty: true }
  })

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop" alt="Patient Stories Background" fill priority className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-teal-300 font-semibold text-sm mb-6">
            <Heart className="w-4 h-4" /> {t('page.tag')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            {t('page.title')}
          </h1>
          <p className="text-lg text-slate-300">
            {t('page.desc')}
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        {stories.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <Heart className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{t('page.emptyTitle')}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t('page.emptyDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map(story => (
              <Link key={story.id} href={`/${resolvedParams.locale}/patient-stories/${story.slug}`} className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:shadow-none transition-all duration-500 flex flex-col group">
                {story.imageUrl && (
                  <div className="w-full h-48 relative overflow-hidden">
                    <Image src={story.imageUrl} alt={getTranslation(story, 'title', resolvedParams.locale) || "Story image"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  {story.treatment && (
                    <span className="text-xs font-bold text-primary dark:text-teal-400 uppercase tracking-wider mb-2">
                      {getTranslation(story.treatment, 'name', resolvedParams.locale)}
                    </span>
                  )}
                  {!story.treatment && story.specialty && (
                    <span className="text-xs font-bold text-primary dark:text-teal-400 uppercase tracking-wider mb-2">
                      {getTranslation(story.specialty, 'name', resolvedParams.locale)}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">{getTranslation(story, 'title', resolvedParams.locale)}</h3>
                  
                  {(story.hospital || story.country) && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                      {story.hospital && <span>📍 {story.hospital}</span>}
                      {story.hospital && story.country && <span>•</span>}
                      {story.country && <span>🌍 {story.country}</span>}
                    </div>
                  )}
                  <div className="relative mb-4 flex-1">
                    <Quote className="absolute -top-1 -left-2 w-8 h-8 text-slate-100 dark:text-slate-800 -z-10 transform rotate-180 transition-colors" />
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-4 relative z-10 transition-colors">{stripHtml(getTranslation(story, 'content', resolvedParams.locale))}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-teal-400/10 text-primary dark:text-teal-400 flex items-center justify-center font-bold">
                        {story.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{story.patientName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(story.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="text-primary dark:text-teal-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">{t('page.readStory')}</span>
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
