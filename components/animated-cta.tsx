"use client"
import { motion } from "framer-motion"
import CTA from "./cta"

export default function AnimatedCTA() {
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