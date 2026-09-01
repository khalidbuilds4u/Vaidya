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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patient Cases
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track inquiries, update lead status, and manage the patient journey.
          </p>
        </div>
        <div className="bg-slate-100 p-1 rounded-lg inline-flex">
          <Link href="?view=list">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <LayoutList className="w-4 h-4" />
              List
            </button>
          </Link>
          <Link href="?view=board">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${view === 'board' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <Kanban className="w-4 h-4" />
              Board
            </button>
          </Link>
        </div>
      </div>

      {/* CRM Board / Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <form>
              <input type="hidden" name="view" value={view} />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by case ID or patient name..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              />
            </form>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
              Total Active: <span className="text-slate-900">{cases.length}</span>
            </div>
          </div>
        </div>

        {view === "board" ? (
          <div className="p-4 sm:p-5 bg-slate-50/50">
            <KanbanBoard cases={cases} />
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Case ID</th>
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Medical Need</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
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
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Case ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary/50" />
                        <span className="font-semibold text-slate-900">
                          {patientCase.referenceId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(patientCase.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Patient Info */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {patientCase.patient.firstName} {patientCase.patient.lastName}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {patientCase.patient.country || "Unknown Country"}
                        {patientCase.patient.age ? ` • ${patientCase.patient.age} yrs` : ""}
                        {patientCase.patient.dob && !patientCase.patient.age ? ` • DOB: ${new Date(patientCase.patient.dob).toLocaleDateString()}` : ""}
                      </div>
                    </td>

                    {/* Medical Need */}
                    <td className="px-6 py-4 max-w-[200px] truncate text-wrap">
                      <div className="text-slate-900 text-sm line-clamp-2">
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
                      <div className="text-sm text-slate-900 font-medium">
                        {patientCase.patient.email}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {patientCase.patient.phone || "No phone provided"}
                      </div>
                    </td>

                      <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-primary hover:text-teal-700 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
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
