"use client";

import { useState } from "react";
import { List, X } from "lucide-react";

type TOCItem = {
  id: string;
  label: string;
  show: boolean;
};

interface MobileTOCProps {
  items: TOCItem[];
}

export function MobileTOC({ items }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  const visibleItems = items.filter((item) => item.show);

  if (visibleItems.length === 0) return null;

  return (
    <>
      {/* Floating Action Button - Hidden on lg screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-slate-200 border-r-0 shadow-lg rounded-l-2xl p-3 flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-colors"
        aria-label="Table of Contents"
      >
        <List className="w-5 h-5 text-primary" />
        <span className="text-[10px] font-bold text-slate-700 [writing-mode:vertical-lr] rotate-180 tracking-widest mt-1">
          INDEX
        </span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Centered Floating Panel */}
      <div
        className={`fixed right-4 top-1/2 -translate-y-1/2 w-64 sm:w-72 bg-white rounded-3xl shadow-2xl z-50 lg:hidden transform transition-all duration-300 ease-in-out origin-right ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              Table of Contents
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="p-5 sm:p-6 overflow-y-auto">
            <nav className="space-y-4 flex flex-col font-medium">
              {visibleItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-primary transition-colors text-[13px] sm:text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
