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

      {/* Slide-over Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              Table of Contents
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            <nav className="space-y-4 flex flex-col font-medium">
              {visibleItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-primary transition-colors text-sm"
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
