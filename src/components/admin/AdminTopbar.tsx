"use client";

import { logoutAction } from "@/app/actions/auth";
import { Menu, LogOut, Shield } from "lucide-react";
import { useTransition } from "react";

interface AdminTopbarProps {
  userName: string;
  userRole: string;
  onMenuToggle: () => void;
}

export function AdminTopbar({
  userName,
  userRole,
  onMenuToggle,
}: AdminTopbarProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 lg:px-6">
      {/* Left: Menu toggle + Page context */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all duration-200"
          onClick={onMenuToggle}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right: User info + Sign out */}
      <div className="flex items-center gap-4">
        {/* Role badge */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              {userRole}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white leading-tight">
              {userName}
            </p>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => startTransition(() => logoutAction())}
          disabled={isPending}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:scale-100"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isPending ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </header>
  );
}
