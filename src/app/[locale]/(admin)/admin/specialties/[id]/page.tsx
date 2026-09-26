import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, ArrowLeft, Syringe, Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripHtml } from "@/lib/utils";

// Make the page dynamic
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const specialty = await prisma.specialty.findUnique({ where: { id } });
  if (!specialty) return { title: "Not Found" };
  return { title: `${specialty.name} Management | Asad Healthcare` };
}

export default async function SpecialtyDetailPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  
  const specialty = await prisma.specialty.findUnique({
    where: { id },
    include: {
      treatments: {
        include: {
          _count: { select: { patientCases: true } }
        },
        orderBy: { name: 'asc' }
      },
      conditions: {
        orderBy: { name: 'asc' }
      }
    }
  });

  if (!specialty) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/admin/specialties" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Specialties Gallery
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="h-32 sm:h-40 bg-slate-100 relative">
            {specialty.imageUrl ? (
              <img src={specialty.imageUrl} alt={specialty.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary to-teal-500"></div>
            )}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  {specialty.name}
                </h1>
                <p className="text-white/80 font-medium mt-1">Manage procedures and conditions</p>
              </div>
              <Link href={`/admin/specialties/${specialty.id}/edit`}>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                  <Edit className="w-4 h-4 mr-2" /> Edit Specialty
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Procedures Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Syringe className="w-4 h-4 text-blue-600" />
              </div>
              Procedures ({specialty.treatments.length})
            </h2>
            <Link href={`/admin/treatments/new?specialtyId=${specialty.id}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm">
                <Plus className="w-4 h-4 mr-1.5" /> Add New
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {specialty.treatments.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No procedures found for this specialty.
                </div>
              ) : (
                specialty.treatments.map(treatment => (
                  <div key={treatment.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 truncate">{treatment.name}</h3>
                        {treatment.isPublished ? (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">Live</span>
                        ) : (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold uppercase tracking-wider">Draft</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {treatment.description ? stripHtml(treatment.description) : 'No description'}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded-md">
                        {treatment._count.patientCases} Inquiries
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1">
                      <Link href={`/${locale}/treatments/${treatment.slug}`} target="_blank">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Preview">
                          <Search className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/treatments/${treatment.id}`}>
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Conditions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              Conditions ({specialty.conditions.length})
            </h2>
            <Link href={`/admin/conditions/new?specialtyId=${specialty.id}`}>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm">
                <Plus className="w-4 h-4 mr-1.5" /> Add New
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {specialty.conditions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No conditions found for this specialty.
                </div>
              ) : (
                specialty.conditions.map(condition => (
                  <div key={condition.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 truncate mb-1">{condition.name}</h3>
                      <p className="text-xs text-slate-500 truncate">
                        {condition.description ? stripHtml(condition.description) : 'No description'}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1">
                      <Link href={`/admin/conditions/${condition.id}`}>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
