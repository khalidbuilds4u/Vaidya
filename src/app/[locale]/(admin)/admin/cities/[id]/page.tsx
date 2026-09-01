import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Save, Trash2, MapPin, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteCityForm } from "@/components/admin/DeleteCityForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createCity, updateCity, deleteCity } from "@/app/actions/cityActions";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "City Editor | Asad Healthcare",
};

export default async function CityEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let city = null;
  if (!isNew) {
    city = await prisma.city.findUnique({
      where: { id },
    });
    if (!city) notFound();
  }

  const updateCityWithId = isNew
    ? createCity
    : updateCity.bind(null, city!.id);
  
  const deleteCityWithId = isNew ? async () => {} : deleteCity.bind(null, city!.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/cities">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isNew ? "Add New City" : "Edit City"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isNew
              ? "Add a new destination for medical tourism."
              : `Updating details for ${city?.name}`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                City Details
              </h2>
              <p className="text-sm text-slate-500">
                Location information and cover image.
              </p>
            </div>
          </div>
        </div>

        <form action={updateCityWithId} className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                City Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={city?.name || ""}
                required
                placeholder="e.g. Istanbul"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="country"
                defaultValue={city?.country || ""}
                required
                placeholder="e.g. Turkey"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                State / Province
              </label>
              <input
                type="text"
                name="state"
                defaultValue={city?.state || ""}
                placeholder="Optional..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                City Cover Image URL
              </label>
              <div className="mt-2">
                <ImageUpload name="imageUrl" defaultValue={city?.imageUrl || ""} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={city?.description || ""}
              placeholder="Brief description of the destination..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-slate-50/50 focus:bg-white resize-y"
            />
          </div>



          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link href="/admin/cities">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11 px-6 font-semibold"
              >
                Cancel
              </Button>
            </Link>
            <SubmitButton>
              <Save className="w-4 h-4 mr-2 inline-block" />
              {isNew ? "Create City" : "Save Changes"}
            </SubmitButton>
          </div>
        </form>
      </div>

      {!isNew && (
        <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 flex items-center justify-between mt-6">
          <div>
            <h3 className="text-red-800 font-bold">Danger Zone</h3>
            <p className="text-red-600/80 text-sm mt-1">
              Permanently delete this city. Wait! Hospitals located here might be affected.
            </p>
          </div>
          <DeleteCityForm action={deleteCityWithId} />
        </div>
      )}
    </div>
  );
}
