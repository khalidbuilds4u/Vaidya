import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center gap-4 bg-transparent w-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <Loader2 className="w-8 h-8 text-primary animate-spin relative z-10" />
      </div>
      <p className="text-slate-500 font-medium text-sm animate-pulse">Loading dashboard data...</p>
    </div>
  );
}
