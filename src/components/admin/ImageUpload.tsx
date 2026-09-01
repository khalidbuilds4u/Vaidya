"use client";

import { useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ImagePlus, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  name: string;
  defaultValue?: string | null;
}

export function ImageUpload({ name, defaultValue }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || "");

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results.info && typeof results.info !== 'string') {
      setImageUrl(results.info.secure_url);
    }
  };

  return (
    <div className="w-full">
      {/* Hidden input to submit the URL with the form */}
      <input type="hidden" name={name} value={imageUrl} />

      {imageUrl ? (
        <div className="relative group rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 w-full aspect-video sm:aspect-[21/9] max-h-64">
          <Image 
            src={imageUrl} 
            alt="Uploaded Preview" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
              title="Remove Image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
          </div>
        </div>
      ) : (
        <CldUploadWidget 
          uploadPreset="unsigned_preset" 
          onSuccess={handleUploadSuccess}
          options={{
            multiple: false,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5000000, // 5MB
            sources: ["local", "url", "camera", "google_drive", "unsplash"],
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full h-32 sm:h-48 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-primary group bg-slate-50/50"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <ImagePlus className="w-6 h-6" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-slate-400">SVG, PNG, JPG or WEBP (max. 5MB)</p>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
