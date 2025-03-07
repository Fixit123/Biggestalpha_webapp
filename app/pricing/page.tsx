import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const pricingPlans = [
  {
    name: "Basic Repair",
    price: "$49",
    description: "Quick fixes for common issues",
    features: [
      "Screen protector installation",
      "Software updates",
      "Basic diagnostics",
      "Minor repairs (up to 30 minutes)",
    ],
  },
  {
    name: "Standard Repair",
    price: "$99",
    description: "Comprehensive repair for most devices",
    features: [
      "All Basic Repair services",
      "Screen replacements",
      "Battery replacements",
      "Charging port repairs",
      "Water damage assessment",
    ],
  },
  {
    name: "Premium Repair",
    price: "$149",
    description: "Advanced repairs and premium service",
    features: [
      "All Standard Repair services",
      "Logic board repairs",
      "Data recovery attempts",
      "Express 24-hour turnaround",
      "90-day extended warranty",
    ],
  },
]

export default function PricingPage() {
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
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Pricing Plans
            </h1>
            <p className="text-xl text-muted-foreground mb-12">Choose the right repair plan for your needs</p>
            <div className="grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col p-6 bg-card rounded-lg shadow-lg border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                >
                  <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                  <p className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {plan.price}
                  </p>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Choose Plan</Button>
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

