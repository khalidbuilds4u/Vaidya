import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, ArrowLeft, Search, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripHtml } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const specialty = await prisma.specialty.findUnique({ where: { id } });
  if (!specialty) return { title: "Not Found" };
  return { title: `Conditions | ${specialty.name} | Asad Healthcare` };
}

export default async function SpecialtyConditionsPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  
  const specialty = await prisma.specialty.findUnique({
    where: { id },
    include: {
      conditions: {
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
            <Activity className="w-6 h-6 text-emerald-600" />
            {specialty.name} Conditions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage medical conditions, diseases, and symptoms for this specialty.
          </p>
        </div>
        <Link href={`/admin/conditions/new?specialtyId=${specialty.id}`}>
          <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 px-6 shadow-md shadow-emerald-600/20">
            <Plus className="w-4 h-4 mr-2" />
            Add Condition
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
              placeholder="Search conditions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
            Total: <span className="text-slate-900">{specialty.conditions.length}</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Condition Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {specialty.conditions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    No conditions found. Click "Add Condition" to create one.
                  </td>
                </tr>
              ) : (
                specialty.conditions.map((condition) => (
                  <tr
                    key={condition.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {condition.name}
                    </td>
                    <td className="px-6 py-4 max-w-[400px] truncate text-slate-500">
                      {condition.description ? stripHtml(condition.description) : <span className="text-slate-400 italic">No description</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/conditions/${condition.id}`}>
                          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
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
