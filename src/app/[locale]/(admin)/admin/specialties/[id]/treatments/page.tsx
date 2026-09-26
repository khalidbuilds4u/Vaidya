import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, ArrowLeft, Search, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripHtml } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const specialty = await prisma.specialty.findUnique({ where: { id } });
  if (!specialty) return { title: "Not Found" };
  return { title: `Procedures | ${specialty.name} | Asad Healthcare` };
}

export default async function SpecialtyProceduresPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  
  const specialty = await prisma.specialty.findUnique({
    where: { id },
    include: {
      treatments: {
        include: {
          _count: { select: { patientCases: true } }
        },
        orderBy: { name: 'asc' }
      }
    }
  });

  if (!specialty) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href={`/admin/specialties/${specialty.id}`} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary mb-2 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to {specialty.name} Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Syringe className="w-6 h-6 text-blue-600" />
            {specialty.name} Procedures
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage surgical and medical procedures for this specialty.
          </p>
        </div>
        <Link href={`/admin/treatments/new?specialtyId=${specialty.id}`}>
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 shadow-md shadow-blue-600/20">
            <Plus className="w-4 h-4 mr-2" />
            Add Procedure
          </Button>
        </Link>
      </div>

      {/* List / Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search procedures..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
            Total: <span className="text-slate-900">{specialty.treatments.length}</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Procedure Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Patient Leads</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {specialty.treatments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No procedures found. Click "Add Procedure" to create one.
                  </td>
                </tr>
              ) : (
                specialty.treatments.map((treatment) => (
                  <tr
                    key={treatment.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {treatment.name}
                    </td>
                    <td className="px-6 py-4">
                      {treatment.isPublished ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                          Published
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-[300px] truncate text-slate-500">
                      {treatment.description ? stripHtml(treatment.description) : <span className="text-slate-400 italic">No description</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{treatment._count.patientCases}</span> Inquiries
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/${locale}/treatments/${treatment.slug}`} target="_blank">
                          <button className="px-3 py-1.5 text-xs font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                            Preview
                          </button>
                        </Link>
                        <Link href={`/admin/treatments/${treatment.id}`}>
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
