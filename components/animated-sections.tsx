"use client"

import { motion } from "framer-motion"
import Hero from "./hero"
import CTA from "./cta"

export function AnimatedHero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />
    </motion.div>
  )
}

export function AnimatedServices({ children }: { children: React.ReactNode }) {
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

export function AnimatedCTA() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <CTA />
    </motion.div>
  )
} 