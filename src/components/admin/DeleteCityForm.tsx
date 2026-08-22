"use client";

import { Trash2 } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

interface DeleteCityFormProps {
  action: (payload: FormData) => void;
}

export function DeleteCityForm({ action }: DeleteCityFormProps) {
  return (
    <form 
      action={action} 
      onSubmit={(e) => {
        if (!confirm("WARNING: Deleting this city will permanently delete ALL hospitals and doctors assigned to it. Are you sure you want to proceed?")) {
          e.preventDefault();
        }
      }}
    >
      <SubmitButton
        variant="destructive"
        className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-600/20"
      >
        <Trash2 className="w-4 h-4 mr-2 inline-block" />
        Delete City
      </SubmitButton>
    </form>
  );
}
