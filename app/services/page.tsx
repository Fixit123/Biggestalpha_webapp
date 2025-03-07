import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from "next/link"

// Add this interface at the top of the file
interface Service {
  id: number
  name: string
  description: string
  image: string
  category: string
}

// Add static rendering where possible
export const dynamic = 'force-static'  // Make page static
export const revalidate = 3600 // Revalidate every hour

const services = [
  {
    title: "Hardware Upgrade",
    description: "Boost your device performance with our hardware upgrade services.",
    image: "/images/hardware-upgrade.webp",
  },
  {
    title: "Smartphone Repair",
    description: "Expert smartphone repair services for all major brands.",
    image: "/images/smartphone-repair.webp",
  },
  {
    title: "Laptop Repair",
    description: "Professional laptop repair and maintenance services.",
    image: "/images/laptop-repair.webp",
  },
  {
    title: "Gaming PC",
    description: "Custom gaming PC builds and repairs.",
    image: "/images/gaming-pc.webp",
  },
  {
    title: "Smartwatch Repair",
    description: "Professional smartwatch repair services.",
    image: "/images/smartwatch-repair.webp",
  }
];

// Add a fallback image constant
const FALLBACK_IMAGE = "/images/placeholder.webp"

// Add a helper function to clean image paths
function cleanImagePath(path: string | null | undefined): string {
  return path?.trimStart() || FALLBACK_IMAGE
}

export default async function ServicesPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  })
  
  const { data: servicesData } = await supabase
    .from('services')
    .select('id, name, description, image, category') as { data: Service[] | null }

  if (!servicesData) return null

  const shopService = servicesData.find((service: Service) => 
    service.category === 'Shop' || service.name === 'Biggest Alpha Store'
  )
  
  const repairServices = servicesData.filter((service: Service) => 
    service.category !== 'Shop' && service.name !== 'Biggest Alpha Store'
  )

  const groupedRepairServices = repairServices.reduce<Record<string, Service[]>>((acc, service) => {
    const category = service.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(service)
    return acc
  }, {})

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
          <section className="container py-12 md:py-24">
            <h1 className="text-4xl font-bold text-center mb-4 animate-fade-in">Our Services</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-in">
              Professional repair services for all your devices. Fast, reliable, and backed by our satisfaction guarantee.
            </p>

            {/* Shop Section First */}
            {shopService && (
              <div className="mb-24 animate-fade-up">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Biggest Alpha Store
                </h2>
                <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[21/7]">
                    <Image
                      src={cleanImagePath(shopService.image)}
                      alt={shopService.name}
                      fill
                      sizes="100vw"
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 md:p-8 lg:p-10">
                    <p className="text-muted-foreground mb-6 whitespace-pre-line max-w-3xl">
                      {shopService.description}
                    </p>
                    <Button asChild size="lg">
                      <Link href="/contact-reviews#contact">Contact for Availability</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Grid */}
            <div className="space-y-20">
              {Object.entries(groupedRepairServices).map(([category, services], categoryIndex) => (
                <div key={category} className={`animate-fade-up`} style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {category}
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                      <div 
                        key={service.id} 
                        className="group bg-card rounded-lg shadow-lg overflow-hidden"
                      >
                        <div className="relative h-48">
                          <Image
                            src={cleanImagePath(service.image)}
                            alt={service.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority={index === 0 && categoryIndex === 0}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Button asChild variant="outline">
                              <Link href={`/services/${service.id}`}>Learn More</Link>
                            </Button>
                            <Button asChild>
                              <Link href="/book-repair">Book Now</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

