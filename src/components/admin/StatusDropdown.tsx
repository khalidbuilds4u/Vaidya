"use client";

import { useTransition } from "react";
import { updateCaseStatus } from "@/app/actions/caseActions";
import { Loader2 } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  UNDER_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
  ASSIGNED: "bg-purple-50 text-purple-700 border-purple-200",
  HOSPITAL_MATCHING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  HOSPITAL_CONTACTED: "bg-cyan-50 text-cyan-700 border-cyan-200",
  QUOTE_PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  QUOTE_RECEIVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PATIENT_REVIEWING: "bg-orange-50 text-orange-700 border-orange-200",
  TRAVEL_PLANNING: "bg-teal-50 text-teal-700 border-teal-200",
  ADMITTED: "bg-teal-50 text-teal-700 border-teal-200",
  TREATMENT_IN_PROGRESS: "bg-teal-50 text-teal-700 border-teal-200",
  TREATMENT_COMPLETED: "bg-teal-50 text-teal-700 border-teal-200",
  FOLLOW_UP: "bg-teal-50 text-teal-700 border-teal-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  LOST: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  DUPLICATE: "bg-slate-50 text-slate-700 border-slate-200",
};

const STATUS_LABELS: Record<string, string> = {
  NEW: "New Lead",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Assigned",
  HOSPITAL_MATCHING: "Finding Hospital",
  HOSPITAL_CONTACTED: "Hospital Contacted",
  QUOTE_PENDING: "Quote Pending",
  QUOTE_RECEIVED: "Quote Received",
  PATIENT_REVIEWING: "Patient Reviewing",
  TRAVEL_PLANNING: "Travel Planning",
  ADMITTED: "Admitted",
  TREATMENT_IN_PROGRESS: "Treatment in Progress",
  TREATMENT_COMPLETED: "Treatment Completed",
  FOLLOW_UP: "Follow Up",
  COMPLETED: "Completed",
  LOST: "Lost",
  CANCELLED: "Cancelled",
  DUPLICATE: "Duplicate",
};

interface StatusDropdownProps {
  caseId: string;
  currentStatus: string;
}

export function StatusDropdown({ caseId, currentStatus }: StatusDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    const formData = new FormData();
    formData.append("status", newStatus);

    startTransition(async () => {
      await updateCaseStatus(caseId, formData);
    });
  };

  return (
    <div className="relative inline-block">
      {isPending && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
        </div>
      )}
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`appearance-none text-xs font-bold px-3 py-1.5 pr-8 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50 ${
          STATUS_COLORS[currentStatus] || "bg-slate-50 text-slate-700 border-slate-200"
        }`}
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value} className="bg-white text-slate-900">
            {label}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
