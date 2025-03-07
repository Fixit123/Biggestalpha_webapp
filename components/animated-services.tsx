"use client"
import { motion } from "framer-motion"

export default function AnimatedServices({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </motion.div>
  )
} 