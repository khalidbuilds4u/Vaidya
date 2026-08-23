import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Doctors Management | Asad Healthcare",
};

export const dynamic = "force-dynamic";

export default async function DoctorsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ cityId?: string }>;
}) {
  const { cityId } = await searchParams;

  const doctors = await prisma.doctor.findMany({
    where: cityId ? { cityId } : {},
    include: {
      hospital: true,
      specialty: true,
      city: true,
    },
    orderBy: { name: "asc" },
  });

  const cities = await prisma.city.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Doctors
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your network of specialized doctors.
          </p>
        </div>
        <Link href="/admin/doctors/new">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl h-11 px-6 shadow-md shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </Link>
      </div>

      {/* List / Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <form method="GET" action="/admin/doctors" className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="search"
                placeholder="Search doctors..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              />
            </div>
            
            <select
              name="cityId"
              defaultValue={cityId || ""}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
            >
              <option value="">All Cities</option>
              {cities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            
            <button type="submit" className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors border border-slate-200">
              Filter
            </button>
          </form>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
            Total: <span className="text-slate-900">{doctors.length}</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Hospital</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No doctors found. Click "Add Doctor" to create one.
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {doctor.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {doctor.specialty.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {doctor.city?.name ? (
                        <span className="text-slate-900 font-medium">{doctor.city.name}</span>
                      ) : (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{doctor.hospital.name}</td>
                    <td className="px-6 py-4">{doctor.experienceYears} Years</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/doctors/${doctor.id}`}>
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
