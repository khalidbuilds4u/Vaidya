"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope } from "lucide-react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    
    // Wait for 1.5s then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // smooth sliding up exit
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-teal-500/20 flex items-center justify-center border border-primary/20 shadow-sm mb-4">
              <Stethoscope className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl tracking-tight leading-none mb-1">
                <span className="font-extrabold text-slate-900">Asad</span>
                <span className="font-semibold text-primary ml-1.5">Healthcare</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-widest uppercase mt-3">
                Premium Medical Concierge
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
