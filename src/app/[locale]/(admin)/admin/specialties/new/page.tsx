import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { SpecialtyForm } from "@/components/admin/forms/SpecialtyForm";

export const metadata: Metadata = {
  title: "Add New Specialty | Asad Healthcare",
};

export default function NewSpecialtyPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/specialties" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary mb-2 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Specialties Gallery
      </Link>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-primary" />
          Add New Specialty
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Create a new medical department. You can add procedures and conditions to it later.
        </p>
      </div>

      <SpecialtyForm />
    </div>
  );
}
