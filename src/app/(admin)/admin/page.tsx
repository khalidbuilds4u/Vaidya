import {
  Building2,
  Stethoscope,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalCases,
    totalHospitals,
    totalDoctors,
    totalPatients,
    newLeadsCount,
    inProgressCount,
    completedCount
  ] = await Promise.all([
    prisma.patientCase.count(),
    prisma.hospital.count(),
    prisma.doctor.count(),
    prisma.patient.count(),
    prisma.patientCase.count({ where: { status: "NEW" } }),
    prisma.patientCase.count({ 
      where: { 
        status: { in: ["UNDER_REVIEW", "ASSIGNED", "HOSPITAL_MATCHING", "HOSPITAL_CONTACTED", "QUOTE_PENDING", "QUOTE_RECEIVED", "PATIENT_REVIEWING"] } 
      } 
    }),
    prisma.patientCase.count({ 
      where: { 
        status: { in: ["COMPLETED", "LOST"] } 
      } 
    }),
  ]);

  const STATS = [
    {
      label: "Total Cases",
      value: totalCases.toString(),
      change: "Active pipeline",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
    },
    {
      label: "Hospitals",
      value: totalHospitals.toString(),
      change: "Active partners",
      icon: Building2,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-400",
    },
    {
      label: "Doctors",
      value: totalDoctors.toString(),
      change: "Specialists on panel",
      icon: Stethoscope,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-500/10",
      textColor: "text-violet-400",
    },
    {
      label: "Patients",
      value: totalPatients.toString(),
      change: "Total registered",
      icon: Users,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-400",
    },
  ];

  const CASE_STATUSES = [
    { label: "New Leads", count: newLeadsCount, icon: AlertCircle, color: "text-blue-400" },
    { label: "In Progress", count: inProgressCount, icon: Clock, color: "text-amber-400" },
    { label: "Completed", count: completedCount, icon: CheckCircle2, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Overview of your medical tourism operations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.06] p-5 hover:bg-white/[0.06] transition-colors group"
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.07] rounded-full -translate-y-8 translate-x-8 group-hover:opacity-[0.12] transition-opacity`}
              />

              <div className="flex items-start justify-between relative">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                    {stat.value}
                  </p>
                  <p className={`text-xs font-medium mt-1.5 ${stat.textColor}`}>
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center shrink-0 backdrop-blur-xl border border-white/5`}
                >
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Pipeline + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Case Pipeline */}
        <div className="lg:col-span-2 rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-white">Case Pipeline</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {CASE_STATUSES.map((status) => {
              const Icon = status.icon;
              return (
                <div
                  key={status.label}
                  className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${status.color}`} />
                  <p className="text-2xl font-extrabold text-white">
                    {status.count}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {status.label}
                  </p>
                </div>
              );
            })}
          </div>

          {totalCases === 0 && (
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center">
              <p className="text-slate-500 text-sm">
                No cases yet. Cases will appear here as patients submit enquiries.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6">
          <h2 className="text-lg font-bold text-white mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: "Add Hospital", href: "/admin/hospitals", icon: Building2 },
              { label: "Add Doctor", href: "/admin/doctors", icon: Stethoscope },
              { label: "View Cases", href: "/admin/cases", icon: Users },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-primary/10 hover:border-primary/20 transition-all group"
                >
                  <Icon className="w-4.5 h-4.5 text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
