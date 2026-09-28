import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8">
      {/* Animated Medical Spinner */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-lg border border-slate-200 dark:border-slate-800 relative z-10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        Loading Data...
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm text-center">
        Fetching the latest records from the secure database. Please hold on a moment.
      </p>

      {/* Skeleton Placeholders */}
      <div className="w-full max-w-3xl mt-12 space-y-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-48 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
          <div className="w-32 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
        </div>

        {/* Content Rows Skeletons */}
        <div className="w-full h-16 bg-slate-100 dark:bg-slate-800/50 rounded-xl animate-pulse delay-75"></div>
        <div className="w-full h-16 bg-slate-100 dark:bg-slate-800/50 rounded-xl animate-pulse delay-150"></div>
        <div className="w-full h-16 bg-slate-100 dark:bg-slate-800/50 rounded-xl animate-pulse delay-200"></div>
      </div>
    </div>
  );
}
