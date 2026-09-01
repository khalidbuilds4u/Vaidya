import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Conditions Management | Asad Healthcare",
};

export const dynamic = "force-dynamic";

export default async function ConditionsAdminPage() {
  const conditions = await prisma.condition.findMany({
    include: {
      specialty: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Medical Conditions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage the medical conditions treated by your specialties.
          </p>
        </div>
        <Link href="/admin/conditions/new">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl h-11 px-6 shadow-md shadow-primary/20">
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
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
            />
          </div>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
            Total: <span className="text-slate-900">{conditions.length}</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Condition Name</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {conditions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No conditions found. Click "Add Condition" to create one.
                  </td>
                </tr>
              ) : (
                conditions.map((condition) => (
                  <tr
                    key={condition.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {condition.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        {condition.specialty.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[400px] truncate">
                      {condition.description || <span className="text-slate-400 italic">No description</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/en/conditions/${condition.slug}`} target="_blank">
                          <button className="px-3 py-1.5 text-xs font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
                            Preview
                          </button>
                        </Link>
                        <Link href={`/admin/conditions/${condition.id}`}>
                          <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
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
