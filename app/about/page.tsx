import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
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
          <section className="container py-12 md:py-24 lg:py-32">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  About Biggest Alpha 
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  At Biggest Alpha , we're passionate about keeping your devices running smoothly. With years of experience
                  and a team of skilled technicians, we provide top-notch repair services for all your gadgets.
                </p>
                <p className="text-xl text-muted-foreground mb-6">
                  Our mission is to offer fast, reliable, and affordable repairs, ensuring that you're never without
                  your essential devices for long. We pride ourselves on our attention to detail, use of high-quality
                  parts, and commitment to customer satisfaction.
                </p>
                <p className="text-xl text-muted-foreground">
                  Whether it's a cracked screen, battery issue, or complex hardware problem, trust TechFix Pro to get
                  your device back to peak performance.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg border border-border/50">
                <Image src="/image/logo.svg" alt="Biggest Alpha Team" layout="fill" objectFit="cover" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

