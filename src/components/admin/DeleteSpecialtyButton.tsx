"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteSpecialty } from "@/app/actions/specialtyActions";
import { useRouter } from "next/navigation";

export function DeleteSpecialtyButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteSpecialty(id);
    
    if (result.success) {
      router.refresh();
    } else {
      alert("Failed to delete specialty. It might have associated data.");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full shadow-sm backdrop-blur-sm border border-slate-200 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
      title="Delete Specialty"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
