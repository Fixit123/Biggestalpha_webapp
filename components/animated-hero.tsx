"use client"
import { motion } from "framer-motion"
import Hero from "./hero"

export default function AnimatedHero() {
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