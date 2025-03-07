import { Smartphone, Laptop, Tablet, Watch } from "lucide-react"

const services = [
  {
    name: "Smartphone Repair",
    description: "Screen replacements, battery upgrades, and more for all major brands.",
    icon: Smartphone,
  },
  {
    name: "Laptop Repair",
    description: "Hardware fixes, software troubleshooting, and performance upgrades.",
    icon: Laptop,
  },
  {
    name: "Tablet Repair",
    description: "Cracked screens, charging issues, and other tablet-specific problems solved.",
    icon: Tablet,
  },
  {
    name: "Smartwatch Repair",
    description: "Fixing screens, batteries, and water damage for popular smartwatch models.",
    icon: Watch,
  },
]

export default function Services() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Our Services</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Professional repair services for all your gadgets. Fast, reliable, and guaranteed.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <service.icon className="h-8 w-8 text-primary" />
              <h3 className="font-bold">{service.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

