"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  duration = 0.6 
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const getVariants = () => {
    switch (direction) {
      case "up": return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
      case "down": return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } }
      case "left": return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }
      case "right": return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
      case "none": return { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ 
  children, 
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1 
}: { 
  children: React.ReactNode, 
  className?: string,
  delayChildren?: number,
  staggerChildren?: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delayChildren, staggerChildren }
        }
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}
