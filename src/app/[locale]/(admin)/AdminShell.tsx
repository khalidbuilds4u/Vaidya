"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PageTransition } from "@/components/admin/PageTransition";

interface AdminShellProps {
  children: React.ReactNode;
  userName: string;
  userRole: string;
}

export function AdminShell({ children, userName, userRole }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-left" dir="ltr">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <AdminTopbar
          userName={userName}
          userRole={userRole}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
