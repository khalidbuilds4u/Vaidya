import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Search, ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Specialties Management | Asad Healthcare",
};

export const dynamic = "force-dynamic";

export default async function SpecialtiesAdminPage() {
  const specialties = await prisma.specialty.findMany({
    include: {
      _count: {
        select: {
          treatments: true,
          conditions: true,
          doctors: true,
        }
      }
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-primary" />
            Specialties Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your medical departments. Click a specialty to manage its procedures and conditions.
          </p>
        </div>
        <Link href="/admin/specialties/new">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl h-11 px-6 shadow-md shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Add Specialty
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="p-4 sm:p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-center bg-white shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search specialties..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50 text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <div className="text-sm font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
          Total Specialties: <span className="text-slate-900">{specialties.length}</span>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {specialties.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200 border-dashed">
            <p className="text-slate-500">No specialties found. Click "Add Specialty" to create one.</p>
          </div>
        ) : (
          specialties.map((specialty) => (
            <Link key={specialty.id} href={`/admin/specialties/${specialty.id}`}>
              <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="h-32 bg-slate-100 relative overflow-hidden">
                  {specialty.imageUrl ? (
                    <img 
                      src={specialty.imageUrl} 
                      alt={specialty.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <LayoutGrid className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white tracking-tight drop-shadow-sm truncate">
                    {specialty.name}
                  </h3>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Procedures</p>
                      <p className="text-xl font-black text-slate-900">{specialty._count.treatments}</p>
                    </div>
                    <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/50">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Conditions</p>
                      <p className="text-xl font-black text-slate-900">{specialty._count.conditions}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-500 group-hover:text-primary transition-colors mt-auto">
                    <span>Manage Department</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
