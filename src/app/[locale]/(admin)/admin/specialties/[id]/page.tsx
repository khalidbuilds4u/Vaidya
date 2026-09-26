import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Edit, ArrowLeft, Syringe, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const specialty = await prisma.specialty.findUnique({ where: { id } });
  if (!specialty) return { title: "Not Found" };
  return { title: `${specialty.name} Management | Asad Healthcare` };
}

export default async function SpecialtyDashboardPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  
  const specialty = await prisma.specialty.findUnique({
    where: { id },
    include: {
      _count: {
        select: { treatments: true, conditions: true }
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
          <div className="h-40 sm:h-48 bg-slate-100 relative">
            {specialty.imageUrl ? (
              <img src={specialty.imageUrl} alt={specialty.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary to-teal-500"></div>
            )}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  {specialty.name}
                </h1>
                <p className="text-white/80 font-medium mt-2 text-lg">
                  Select a category below to manage its content
                </p>
              </div>
              <Link href={`/admin/specialties/${specialty.id}/edit`}>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md h-11 px-6">
                  <Edit className="w-4 h-4 mr-2" /> Edit Specialty
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Tabs / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Procedures Card */}
        <Link href={`/admin/specialties/${specialty.id}/treatments`}>
          <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col h-full">
            <div className="p-8 flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Syringe className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Procedures</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Manage all surgical and medical treatments associated with {specialty.name}.
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <span className="text-2xl font-black text-blue-600">{specialty._count.treatments}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">Total</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Conditions Card */}
        <Link href={`/admin/specialties/${specialty.id}/conditions`}>
          <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300 cursor-pointer flex flex-col h-full">
            <div className="p-8 flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Conditions</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Manage medical conditions, diseases, and symptoms associated with {specialty.name}.
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <span className="text-2xl font-black text-emerald-600">{specialty._count.conditions}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">Total</span>
                  </div>
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
