'use client'
import { useState, useEffect } from 'react'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import CTA from "@/components/cta"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import { motion } from "framer-motion"
import { supabase, getFeaturedServices } from '@/utils/supabase'
import { ServiceDialog } from "./components/dialog"

// Match current form options
const deviceTypes = [
  'Smartphone',
  'Laptop',
  'Tablet',
  'Smart Watch',
  'Other'
]

// Add a type for services
type Service = {
  id: number
  name: string
  description: string
  featured: boolean
  category?: string
  image?: string
}

export default function HomePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [customDevice, setCustomDevice] = useState('')
  const [issue, setIssue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [featuredServices, setFeaturedServices] = useState<Service[]>([])
  const [servicesLoading, setServicesLoading] = useState(true)
  const [servicesError, setServicesError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function loadServices() {
      try {
        setServicesLoading(true)
        setServicesError('')
        const services = await getFeaturedServices()
        console.log('Loaded featured services:', services)
        setFeaturedServices(services || [])
      } catch (err) {
        console.error('Error loading featured services:', err)
        setServicesError('Failed to load services')
      } finally {
        setServicesLoading(false)
      }
    }
    
    loadServices()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Validate inputs
      if (!name || !email || !deviceType || !issue) {
        throw new Error('Please fill in all required fields')
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address')
      }

      const finalDeviceType = deviceType === 'Other' ? customDevice : deviceType
      const code = Math.random().toString(36).substring(2, 10).toUpperCase()

      const { error } = await supabase
        .from('repair_bookings')
        .insert([
          {
            name,
            email,
            device_type: finalDeviceType,
            issue,
            confirmation_code: code,
            status: 'Received'
          }
        ])

      if (error) throw error

      // Success
      alert(`Repair scheduled! Your confirmation code is: ${code}`)
      // Reset form
      setName('')
      setEmail('')
      setDeviceType('')
      setCustomDevice('')
      setIssue('')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          
          <section className="container py-12 md:py-24">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent text-center">
                Featured Services
              </h2>
            </ScrollAnimation>
            
            {servicesLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            
            {servicesError && (
              <div className="text-center py-8">
                <p className="text-red-500">{servicesError}</p>
                <p className="mt-2">Please try refreshing the page</p>
              </div>
            )}
            
            {!servicesLoading && !servicesError && featuredServices.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No featured services available at the moment.</p>
              </div>
            )}
            
            {!servicesLoading && featuredServices.length > 0 && (
              <div className="grid gap-8 md:grid-cols-3">
                {featuredServices.map((service, index) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative bg-card rounded-lg shadow-lg overflow-hidden
                      ${service.category === 'Shop' ? 'md:col-span-3' : ''}`}
                  >
                    <div className={`relative ${service.category === 'Shop' ? 'h-64' : 'h-48'}`}>
                      {service.image && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative h-full"
                        >
                          <Image
                            src={service.image}
                            alt={service.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                            priority={index === 0}
                          />
                        </motion.div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <motion.div 
                      className="p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {service.category !== 'Shop' && (
                        <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                      )}
                      <p className={`text-muted-foreground mb-4 ${service.category === 'Shop' ? 'whitespace-pre-line' : 'line-clamp-3'}`}>
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4">
                        {service.category === 'Shop' ? (
                          <Button asChild size="lg">
                            <Link href="/contact">Contact for Availability</Link>
                          </Button>
                        ) : (
                          <>
                            <Button asChild variant="outline">
                              <Link href={`/services/${service.id}`}>Learn More</Link>
                            </Button>
                            <Button asChild>
                              <Link href="/book-repair">Book Now</Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          <ScrollAnimation>
            <CTA />
          </ScrollAnimation>
        </main>
        <Footer />
      </div>

      <ServiceDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="space-y-4">
          <p>Service details will appear here.</p>
        </div>
      </ServiceDialog>
    </div>
  )
}

