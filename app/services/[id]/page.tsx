import { supabase } from "@/utils/supabase"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const FALLBACK_IMAGE = "/images/placeholder.webp"

export default async function ServicePage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  try {
    const { data: service } = await supabase
      .from('services')
      .select('*')
      .eq('id', params.id)
      .single()

    if (!service) {
      notFound()
    }

    // Clean the image URL
    const imageUrl = service.image?.trim() || FALLBACK_IMAGE

    // List of device types we support
    const deviceTypes = [
      "Smartphones",
      "Tablets",
      "Laptops",
      "Desktop Computers",
      "Gaming Consoles",
      "Smart Watches"
    ]

    return (
      <div className="container py-12 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover"
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
          <p className="text-muted-foreground mb-8">{service.description}</p>

          <h2 className="text-2xl font-bold mb-4">Devices We Service</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {deviceTypes.map((device, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-lg border">
                <span className="text-primary">✓</span>
                {device}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Why Choose Our Service?</h2>
          <ul className="space-y-2 mb-8">
            <li>✓ Expert technicians with years of experience</li>
            <li>✓ Genuine parts and quality repairs</li>
            <li>✓ Quick turnaround time</li>
            <li>✓ Warranty on all repairs</li>
            <li>✓ Competitive pricing</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Our Process</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Diagnosis</h3>
              <p className="text-muted-foreground">We thoroughly examine your device to identify all issues</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Repair</h3>
              <p className="text-muted-foreground">Expert repair with quality parts and attention to detail</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Quality Check</h3>
              <p className="text-muted-foreground">Thorough testing to ensure everything works perfectly</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/book-repair">Book Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-reviews#contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact-reviews#reviews">Read Reviews</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading service:', error)
    notFound()
  }
} 