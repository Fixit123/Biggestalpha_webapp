import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does a typical repair take?",
    answer:
      "Most repairs are completed within 24-48 hours. However, more complex issues may take longer. We'll provide you with an estimated completion time when you bring in your device.",
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer:
      "Yes, we offer a 90-day warranty on all our repairs. If you experience any issues related to the repair within this period, bring your device back, and we'll fix it at no additional cost.",
  },
  {
    question: "What brands do you repair?",
    answer:
      "We repair a wide range of brands including Apple, Samsung, Google, LG, Motorola, and many more. If you don't see your brand listed, please contact us to check if we can help.",
  },
  {
    question: "Do I need to make an appointment?",
    answer:
      "While walk-ins are welcome, we recommend booking an appointment to ensure prompt service. You can easily schedule a repair through our website or by calling us.",
  },
  {
    question: "What if my device is not repairable?",
    answer:
      "If we determine that your device cannot be repaired, we'll explain the reasons and discuss your options. We may be able to offer data recovery services or assist with recycling your device.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main className="flex-grow container max-w-4xl mx-auto py-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </main>
        <Footer />
      </div>
    </div>
  )
}

