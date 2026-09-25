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
  const [stagedUrl, setStagedUrl] = useState<string>("");

  const handleUploadSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results.info && typeof results.info !== 'string') {
      let finalUrl = results.info.secure_url;
      
      // If the user cropped the image, Cloudinary returns the exact crop coordinates.
      // We modify the URL to request the cropped version directly.
      const coordinates = results.info.coordinates as { custom?: number[][] } | undefined;
      if (coordinates?.custom?.[0]) {
        const [x, y, w, h] = coordinates.custom[0];
        // Insert the crop transformation right after /upload/ in the URL
        finalUrl = finalUrl.replace('/upload/', `/upload/c_crop,x_${x},y_${y},w_${w},h_${h}/`);
      }
      
      setStagedUrl(finalUrl);
    }
  };

  const handleApprove = () => {
    setImageUrl(stagedUrl);
    setStagedUrl("");
  };

  const handleDiscard = () => {
    setStagedUrl("");
  };

  return (
    <div className="w-full">
      {/* Hidden input to submit the URL with the form */}
      <input type="hidden" name={name} value={imageUrl} />

      {stagedUrl ? (
        <div className="w-full border-2 border-primary rounded-xl overflow-hidden bg-slate-50 shadow-sm animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-primary text-white text-xs font-bold px-4 py-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 
              Pending Approval
            </span>
            <span className="text-[10px] uppercase tracking-wider opacity-80">Review your crop</span>
          </div>
          <div className="relative w-full h-48 sm:h-64 flex items-center justify-center bg-slate-100/50">
            <Image 
              src={stagedUrl} 
              alt="Pending Preview" 
              fill 
              className="object-contain p-4"
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-white border-t border-slate-200">
             <button 
               type="button" 
               onClick={handleDiscard} 
               className="flex-1 bg-white border-2 border-slate-200 hover:border-red-500 hover:text-red-600 text-slate-700 font-bold py-2.5 rounded-lg transition-all"
             >
               Discard
             </button>
             <button 
               type="button" 
               onClick={handleApprove} 
               className="flex-[2] bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
             >
               <CheckCircle2 className="w-5 h-5" />
               Approve & Apply
             </button>
          </div>
        </div>
      ) : (
        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"}
          onSuccess={handleUploadSuccess}
          options={{
            multiple: false,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5000000, // 5MB
            sources: ["local", "url", "camera", "google_drive", "unsplash"],
            cropping: true,
            showSkipCropButton: false,
            singleUploadAutoClose: false,
          }}
        >
          {({ open }) => (
            <div className="w-full">
              {imageUrl ? (
                <div className="relative group rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 w-full h-48 sm:h-64 flex items-center justify-center">
                  <Image 
                    src={imageUrl} 
                    alt="Uploaded Preview" 
                    fill 
                    className="object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
                      title="Remove Image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => open()}
                      className="bg-white text-slate-900 hover:bg-slate-100 p-3 rounded-full shadow-lg transition-transform hover:scale-110"
                      title="Change Image"
                    >
                      <ImagePlus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900 text-white px-2.5 py-1 text-[11px] font-bold rounded-md shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Active
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full h-32 sm:h-48 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-primary group bg-slate-50/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-slate-100 group-hover:bg-primary/10 border border-slate-200 group-hover:border-primary/20 flex items-center justify-center transition-colors">
                    <ImagePlus className="w-6 h-6" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-slate-400 font-medium">SVG, PNG, JPG or WEBP (max. 5MB)</p>
                </button>
              )}
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
