import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search, Building2, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HospitalsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || "";

  const hospitals = await prisma.hospital.findMany({
    where: {
      name: { contains: query, mode: "insensitive" },
    },
    include: {
      city: true,
      _count: {
        select: { doctors: true, treatments: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Hospitals
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your network of partner hospitals.
          </p>
        </div>
        <Link
          href="/admin/hospitals/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Hospital
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <form className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search hospitals..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </form>
        <div className="text-sm font-semibold text-slate-400 whitespace-nowrap">
          Total: <span className="text-white">{hospitals.length}</span>
        </div>
      </div>

      {/* Hospital List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {hospitals.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">
              No hospitals found
            </h3>
            <p className="text-sm text-slate-500">
              {query
                ? `No results for "${query}"`
                : "Get started by adding your first hospital."}
            </p>
          </div>
        ) : (
          hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.06] transition-colors relative group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white leading-tight pr-8">
                  {hospital.name}
                </h3>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">
                    {hospital.city.name}, {hospital.city.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    {hospital.beds || "N/A"} Beds • {hospital.icuBeds || "N/A"}{" "}
                    ICU
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-5">
                <div>
                  <span className="text-white text-base">
                    {hospital._count.doctors}
                  </span>{" "}
                  Doctors
                </div>
                <div>
                  <span className="text-white text-base">
                    {hospital._count.treatments}
                  </span>{" "}
                  Treatments
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {hospital.accreditations.slice(0, 2).map((acc) => (
                    <span
                      key={acc}
                      className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-300 uppercase"
                    >
                      {acc}
                    </span>
                  ))}
                  {hospital.accreditations.length > 2 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-300">
                      +{hospital.accreditations.length - 2}
                    </span>
                  )}
                </div>
                
                <Link
                  href={`/admin/hospitals/${hospital.id}`}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Edit Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
