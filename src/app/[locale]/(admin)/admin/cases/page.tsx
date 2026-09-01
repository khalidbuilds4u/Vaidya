import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Search, FileText, Calendar, DollarSign, LayoutList, Kanban } from "lucide-react";
import { StatusDropdown } from "@/components/admin/StatusDropdown";
import { KanbanBoard } from "@/components/admin/KanbanBoard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Patient Cases | Asad Healthcare Admin",
};

export const dynamic = "force-dynamic";

export default async function CasesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const view = resolvedParams?.view || "list";
  const query = resolvedParams?.q || "";
  const cases = await prisma.patientCase.findMany({
    include: {
      patient: true,
      preferredCity: true,
      treatment: true,
    },
    where: {
      OR: [
        { referenceId: { contains: query, mode: "insensitive" } },
        { patient: { firstName: { contains: query, mode: "insensitive" } } },
        { patient: { lastName: { contains: query, mode: "insensitive" } } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Patient Cases
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track inquiries, update lead status, and manage the patient journey.
          </p>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] p-1 rounded-xl inline-flex">
          <Link href="?view=list">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
              <LayoutList className="w-4 h-4" />
              List
            </button>
          </Link>
          <Link href="?view=board">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'board' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
              <Kanban className="w-4 h-4" />
              Board
            </button>
          </Link>
        </div>
      </div>

      {/* CRM Board / Table */}
      <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.01]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <form>
              <input type="hidden" name="view" value={view} />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by case ID or patient name..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
              />
            </form>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-400 whitespace-nowrap">
              Total Active: <span className="text-white">{cases.length}</span>
            </div>
          </div>
        </div>

        {view === "board" ? (
          <div className="p-4 sm:p-5">
            <KanbanBoard cases={cases} />
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400 font-semibold">
              <tr>
                <th className="px-6 py-4">Case ID</th>
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Medical Need</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No patient cases found. Wait for users to submit inquiries.
                  </td>
                </tr>
              ) : (
                cases.map((patientCase) => (
                  <tr
                    key={patientCase.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Case ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="font-bold text-white">
                          {patientCase.referenceId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(patientCase.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Patient Info */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">
                        {patientCase.patient.firstName} {patientCase.patient.lastName}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {patientCase.patient.country || "Unknown Country"}
                        {patientCase.patient.age ? ` • ${patientCase.patient.age} yrs` : ""}
                        {patientCase.patient.dob && !patientCase.patient.age ? ` • DOB: ${new Date(patientCase.patient.dob).toLocaleDateString()}` : ""}
                      </div>
                    </td>

                    {/* Medical Need */}
                    <td className="px-6 py-4 max-w-[200px] truncate text-wrap">
                      <div className="text-slate-300 text-sm line-clamp-2">
                        {patientCase.medicalCondition || "Unspecified"}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4">
                      <StatusDropdown 
                        caseId={patientCase.id} 
                        currentStatus={patientCase.status} 
                      />
                    </td>

                    {/* Contact Info */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-white font-medium">
                        {patientCase.patient.email}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {patientCase.patient.phone || "No phone provided"}
                      </div>
                    </td>

                      <td className="px-6 py-4 text-right">
                      <button className="text-sm font-bold text-primary hover:text-teal-400 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
