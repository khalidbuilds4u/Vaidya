import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { Image as ImageIcon } from "lucide-react"

export const revalidate = 3600;


export const metadata: Metadata = {
  title: "Gallery | Asad Healthcare",
  description: "View our medical facilities, successful treatments, and expert medical teams.",
}

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Group images by category
  const categories = Array.from(new Set(images.map(img => img.category)))

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')" }} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-teal-300 font-semibold text-sm mb-6">
            <ImageIcon className="w-4 h-4" /> Visual Journey
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Our Gallery
          </h1>
          <p className="text-lg text-slate-300">
            Take a look at our world-class partner hospitals, medical facilities, and the success stories of our patients.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 mt-12">
        {images.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/95 rounded-2xl shadow-xl dark:shadow-none p-12 text-center max-w-2xl mx-auto border border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4 transition-colors duration-500" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors duration-500">Gallery Coming Soon</h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-500">We are currently updating our image gallery. Please check back later!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map(category => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-2 transition-colors duration-500">{category}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {images.filter(img => img.category === category).map(image => (
                    <div key={image.id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-square bg-slate-200">
                      <img 
                        src={image.imageUrl} 
                        alt={image.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform">{image.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
