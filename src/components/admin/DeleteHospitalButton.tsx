"use client";

import { Trash2 } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

interface DeleteHospitalButtonProps {
  action: (payload: FormData) => void;
}

export function DeleteHospitalButton({ action }: DeleteHospitalButtonProps) {
  return (
    <form 
      action={action} 
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this hospital? This action cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <SubmitButton
        variant="ghost"
        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-colors whitespace-nowrap h-auto"
      >
        <Trash2 className="w-3.5 h-3.5 mr-1.5 inline-block" />
        Delete
      </SubmitButton>
    </form>
  );
}
