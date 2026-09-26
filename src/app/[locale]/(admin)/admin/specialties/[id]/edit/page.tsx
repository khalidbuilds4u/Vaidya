import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Edit } from "lucide-react";
import { SpecialtyForm } from "@/components/admin/forms/SpecialtyForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const specialty = await prisma.specialty.findUnique({ where: { id } });
  if (!specialty) return { title: "Not Found" };
  return { title: `Edit ${specialty.name} | Asad Healthcare` };
}

export default async function EditSpecialtyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const specialty = await prisma.specialty.findUnique({
    where: { id }
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

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Edit className="w-6 h-6 text-primary" />
          Edit {specialty.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update the department details, slug, and cover image.
        </p>
      </div>

      <SpecialtyForm specialty={specialty} />
    </div>
  );
}
