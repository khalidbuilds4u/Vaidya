"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";
import { createSpecialty, updateSpecialty } from "@/app/actions/departmentActions";
import { TranslationAlert } from "../TranslationAlert";
import { RichTextEditor } from "../RichTextEditor";

interface Specialty {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  statSuccessRate: string | null;
  statPatients: string | null;
  statHospitals: string | null;
  statCostSavings: string | null;
  whatIs?: string | null;
  advancedTechniques?: string | null;
  treatmentCost?: string | null;
  whyChooseIndia?: string | null;
  faqs?: any;
  translations?: any;
}

interface DepartmentFormProps {
  specialty?: Specialty;
}

export function DepartmentForm({ specialty }: DepartmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(specialty?.name || "");
  const [slug, setSlug] = useState(specialty?.slug || "");
  const [description, setDescription] = useState(specialty?.description || "");
  const [imageUrl, setImageUrl] = useState(specialty?.imageUrl || "");
  const [statSuccessRate, setStatSuccessRate] = useState(specialty?.statSuccessRate || "");
  const [statPatients, setStatPatients] = useState(specialty?.statPatients || "");
  const [statHospitals, setStatHospitals] = useState(specialty?.statHospitals || "");
  const [statCostSavings, setStatCostSavings] = useState(specialty?.statCostSavings || "");
  const [whatIs, setWhatIs] = useState(specialty?.whatIs || "");
  const [advancedTechniques, setAdvancedTechniques] = useState(specialty?.advancedTechniques || "");
  const [treatmentCost, setTreatmentCost] = useState(specialty?.treatmentCost || "");
  const [whyChooseIndia, setWhyChooseIndia] = useState(specialty?.whyChooseIndia || "");
  const [faqs, setFaqs] = useState(specialty?.faqs ? (specialty.faqs as any[]).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') : "");

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
    formData.append("statSuccessRate", statSuccessRate);
    formData.append("statPatients", statPatients);
    formData.append("statHospitals", statHospitals);
    formData.append("statCostSavings", statCostSavings);
    formData.append("whatIs", whatIs);
    formData.append("advancedTechniques", advancedTechniques);
    formData.append("treatmentCost", treatmentCost);
    formData.append("whyChooseIndia", whyChooseIndia);
    formData.append("faqs", faqs);

    try {
      if (specialty?.id) {
        await updateSpecialty(specialty.id, formData);
        toast.success("Specialty updated successfully");
        router.push(`/admin/departments/${specialty.id}`);
      } else {
        const res = await createSpecialty(formData);
        toast.success("Specialty created successfully");
        router.push(`/admin/departments/${res.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save specialty");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <TranslationAlert translations={specialty?.translations} />
      
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Detailed Content</h2>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">What is {name || "this specialty"}?</label>
          <RichTextEditor
            value={whatIs}
            onChange={setWhatIs}
            placeholder={`Explain what ${name || 'this specialty'} is and what it covers...`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Advanced Treatment Techniques</label>
          <RichTextEditor
            value={advancedTechniques}
            onChange={setAdvancedTechniques}
            placeholder="List and explain advanced techniques used..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Treatment Cost in India</label>
          <RichTextEditor
            value={treatmentCost}
            onChange={setTreatmentCost}
            placeholder="Provide cost estimates and comparisons..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Why Choose India for {name || "Treatment"}?</label>
          <RichTextEditor
            value={whyChooseIndia}
            onChange={setWhyChooseIndia}
            placeholder="Reasons to choose India for this specialty..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Frequently Asked Questions</label>
          <Textarea 
            value={faqs}
            onChange={(e) => setFaqs(e.target.value)}
            placeholder={`Q: What is the success rate?\nA: The success rate is very high...\n\nQ: How long is the recovery?\nA: It takes about 2 weeks.`}
            className="h-48 text-slate-900 bg-slate-50 border-slate-200 focus:bg-white font-mono text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">Format: "Q: Question" followed by "A: Answer". Separate multiple FAQs with a blank line.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Why Choose Us Stats (Center of Excellence)</h2>
        <p className="text-sm text-slate-500">These statistics will be displayed in the premium statistics banner on the public department page. Leave blank to use default stats.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Success Rate</label>
            <Input 
              value={statSuccessRate}
              onChange={(e) => setStatSuccessRate(e.target.value)}
              placeholder="e.g. 98%"
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Global Patients Treated</label>
            <Input 
              value={statPatients}
              onChange={(e) => setStatPatients(e.target.value)}
              placeholder="e.g. 50,000+"
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Accredited Hospitals</label>
            <Input 
              value={statHospitals}
              onChange={(e) => setStatHospitals(e.target.value)}
              placeholder="e.g. 100+ JCI"
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Cost Savings</label>
            <Input 
              value={statCostSavings}
              onChange={(e) => setStatCostSavings(e.target.value)}
              placeholder="e.g. 70%"
              className="text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>
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
