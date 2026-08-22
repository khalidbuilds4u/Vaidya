"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  Syringe,
  MapPin,
  X,
  ShieldCheck,
  Activity,
  Heart,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Patient Cases", href: "/admin/cases", icon: Users },
  { label: "Hospitals", href: "/admin/hospitals", icon: Building2 },
  { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { label: "Procedures", href: "/admin/treatments", icon: Syringe },
  { label: "Conditions", href: "/admin/conditions", icon: Activity },
  { label: "Cities", href: "/admin/cities", icon: MapPin },
  { label: "Patient Stories", href: "/admin/stories", icon: Heart },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Messages", href: "/admin/contact-messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-white/[0.06] z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-lg shadow-primary/25">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm tracking-tight leading-none">
                Asad Healthcare
              </p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>
          <button
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isActive ? "text-primary" : ""
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom branding */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-white/[0.06]">
          <p className="text-[10px] text-slate-600 text-center">
            © 2026 Asad Healthcare
          </p>
        </div>
      </aside>
    </>
  );
}
