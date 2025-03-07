"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Hero() {
  const words = ["Expert", "Gadget", "Repair", "at", "Your", "Fingertips"]
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    { src: "/images/sammyfix1.webp", alt: "Expert Repair Services" },
    { src: "/images/sammypixel.webp", alt: "Professional Device Care" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="container flex flex-col lg:flex-row items-center justify-between gap-12 py-24 md:py-32">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-2xl">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: i * 0.1,
                ease: [0.64, 0, 0.78, 0]
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="text-xl text-muted-foreground"
        >
          Fast, reliable, and affordable repairs for smartphones, laptops, tablets, and more. Get your devices back to
          life with Biggest Alpha.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/book-repair">
              Book a Repair
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">Our Services</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative w-full max-w-md aspect-square"
      >
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentImage === index ? 1 : 0,
                scale: currentImage === index ? 1 : 0.95
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
              className="absolute inset-0"
              style={{ pointerEvents: currentImage === index ? 'auto' : 'none' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-lg shadow-lg object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

