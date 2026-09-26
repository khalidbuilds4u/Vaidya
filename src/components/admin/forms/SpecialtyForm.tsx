"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";
import { createSpecialty, updateSpecialty } from "@/app/actions/specialtyActions";

interface Specialty {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

interface SpecialtyFormProps {
  specialty?: Specialty;
}

export function SpecialtyForm({ specialty }: SpecialtyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(specialty?.name || "");
  const [slug, setSlug] = useState(specialty?.slug || "");
  const [description, setDescription] = useState(specialty?.description || "");
  const [imageUrl, setImageUrl] = useState(specialty?.imageUrl || "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!specialty) { // Only auto-generate slug for new specialties
      setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("Name and slug are required");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);

    try {
      if (specialty?.id) {
        await updateSpecialty(specialty.id, formData);
        toast.success("Specialty updated successfully");
        router.push(`/admin/specialties/${specialty.id}`);
      } else {
        const res = await createSpecialty(formData);
        toast.success("Specialty created successfully");
        router.push(`/admin/specialties/${res.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save specialty");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Specialty Name</label>
            <Input 
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Cardiology"
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">URL Slug</label>
            <Input 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. cardiology"
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Description</label>
          <Textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief overview of the specialty..."
            className="h-32 text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Cover Image URL</label>
          <div className="flex gap-4">
            <Input 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white flex-1"
            />
          </div>
          {imageUrl && (
            <div className="mt-4 w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md shadow-primary/20 min-w-[120px]"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Specialty
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
