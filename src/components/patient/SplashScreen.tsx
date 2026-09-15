"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope } from "lucide-react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if splash has already been shown in this session
    if (sessionStorage.getItem('splashShown')) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    sessionStorage.setItem('splashShown', 'true');
    
    // Increased duration to 2.5s to let the beautiful animation play out fully
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[80px] sm:blur-[120px]" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
            className="relative flex flex-col items-center z-10"
          >
            {/* Logo Icon */}
            <motion.div 
              variants={{
                hidden: { scale: 0.8, opacity: 0, rotate: -15, y: 20 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 200, damping: 20, duration: 1 },
                },
              }}
              className="mb-6"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200/60 dark:border-slate-800 shadow-[0_20px_40px_-15px_rgba(15,118,110,0.15)] dark:shadow-[0_20px_40px_-15px_rgba(15,118,110,0.4)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-primary/5 to-transparent" />
                <Stethoscope className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600 dark:text-teal-400 relative z-10 drop-shadow-sm" />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="flex flex-col items-center text-center overflow-hidden mb-4"
            >
              <h1 className="text-4xl sm:text-5xl tracking-tight leading-none flex items-center">
                <span className="font-extrabold text-slate-900 dark:text-white">Asad</span>
                <span className="font-semibold text-teal-600 dark:text-teal-400 ml-2">Healthcare</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="flex items-center gap-3 sm:gap-4 opacity-80"
            >
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-700" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 tracking-[0.25em] uppercase text-center">
                Global Trust • World-Class Healing
              </span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-700" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
