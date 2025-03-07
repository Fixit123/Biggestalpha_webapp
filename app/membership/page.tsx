import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { supabase } from "@/utils/supabase"
import Link from "next/link"

async function getMembershipPlans() {
  const { data, error } = await supabase.from("membership_plans").select("*").order("price")

  if (error) {
    console.error("Error fetching membership plans:", error)
    return []
  }

  return data || []
}

function renderFeatures(features: any) {
  if (Array.isArray(features)) {
    return features.map((feature, index) => (
      <li key={index} className="flex items-center">
        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
        <span className="text-sm">{feature}</span>
      </li>
    ))
  } else if (typeof features === "string") {
    return (
      <li className="flex items-center">
        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
        <span className="text-sm">{features}</span>
      </li>
    )
  } else {
    return null
  }
}

export default function MembershipPage() {
  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Basic repair services for all users",
      features: [
        "Standard repair pricing",
        "Online booking system",
        "Email support",
        "Basic repair tracking"
      ],
      buttonText: "Get Started",
      buttonLink: "/book-repair"
    },
    {
      name: "Silver",
      price: "₦5,000/month",
      description: "Enhanced services for regular customers",
      features: [
      
        "Priority queue placement",
        "Free basic diagnostic",
        "Phone support",
        "48-hour turnaround guarantee"
      ],
      buttonText: "Subscribe",
      buttonLink: "/contact-reviews#contact"
    },
    {
      name: "Gold",
      price: "₦10,000/month",
      description: "Premium services for our valued members",
      features: [
      
        "Express 24-hour turnaround",
        "Free comprehensive diagnostic",
        "Dedicated support line",
        "One free screen protector monthly",
        "Priority parts ordering"
      ],
      buttonText: "Subscribe",
      buttonLink: "/contact-reviews#contact"
    },
    {
      name: "Consultation",
      price: "₦10,000/month",
      description: "Get Expert Advice on your device",
      features: [
        "Troubleshooting and Repairs",
        "Buying Advice",
        "Software and Setup Assistance",
        "24/7 dedicated support",
        "General Device Advice",
        "General Tech Support",
        "Device Setup and Configuration",
      ],
      buttonText: "Consult Apha Now!",
      buttonLink: "/contact-reviews#contact"
    }
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Membership Plans
        </h1>
        <p className="text-muted-foreground">
          Choose the perfect plan for your device repair needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className="group bg-card rounded-lg shadow-lg overflow-hidden border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 
            hover:border-primary/50 transition-all duration-300 ease-out
            hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
            animate-fade-up"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="p-6 transition-transform duration-300 ease-out group-hover:scale-[0.98]">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start transition-transform duration-300 ease-out group-hover:translate-x-1"
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-muted/50">
              <Button 
                asChild 
                className="w-full transition-transform duration-300 ease-out group-hover:scale-105" 
                variant={plan.name === "Free" ? "outline" : "default"}
              >
                <Link href={plan.buttonLink}>{plan.buttonText}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-center animate-fade-up" style={{ animationDelay: '400ms' }}>
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Choose Your Plan', 'Contact Us', 'Start Saving'].map((step, index) => (
            <div 
              key={step}
              className="p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg rounded-lg"
              style={{ animationDelay: `${(index + 5) * 100}ms` }}
            >
              <h3 className="font-semibold mb-2">{`${index + 1}. ${step}`}</h3>
              <p className="text-sm text-muted-foreground">
                {index === 0 && "Select the membership tier that best fits your needs"}
                {index === 1 && "We'll set up your membership and explain all benefits"}
                {index === 2 && "Enjoy discounts and priority service immediately"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

