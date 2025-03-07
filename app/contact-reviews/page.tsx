"use client"
import { useState } from 'react'
import { toast } from 'sonner'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import LocationMap from "@/components/location-map"

const reviews = [
  {
    name: "ifeoluwa fayoyiwa",
    rating: 5,
    service: "iPhone Screen Repair",
    comment: "Great services, honest gadget opinion. Honest businessman. In my opinion, we need more honest businessmen like Biggest Alpha. Will definitely patronize again.",
    date: "March 2023"
  },
  {
    name: "Samson Usen",
    rating: 5,
    service: "Laptop Repair",
    comment: "Great experience with Biggest Alpha. Fixed my laptop's charging issue and even cleaned it up. Highly recommended!",
    date: "febuary 2023"
  },
  {
    name: "Florence Fayoyiwa",
    rating: 5,
    service: "Data Recovery",
    comment: "They saved all my important files when my hard drive crashed. The team is knowledgeable and professional.",
    date: "may 2023"
  },
  {
    name: "Ahmed olayinka",
    rating: 5,
    service: "Phone Accessories",
    comment: "Excellent selection of genuine accessories. The staff was very helpful in choosing the right products for my device.",
    date: "september 2023"
  },
]

export default function ContactReviewsPage() {
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setSending(true)
    
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      console.log('Attempting to send message...')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      })

      if (!response.ok) throw new Error('Failed to send')
      
      toast.success('Message sent successfully!')
      form.reset()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message')
    } finally {
      setSending(false)
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
        <main className="flex-grow container max-w-4xl mx-auto py-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Contact Us & Reviews
          </h1>
          
          <section id="contact" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-lg border border-border/50">
                <h3 className="font-semibold mb-4">Quick Contact</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>📞 Phone: +234 9030168511</p>   
                  <p>📱 WhatsApp: +234 8175657695</p>
                  <p>📧 Email: Biggestalpha7@gmail.com</p>
                  <p>⏰ Hours: Mon-Sat: 9AM-5:30PM</p>
                </div>
              </div>
              
              <form 
                onSubmit={handleSubmit}
                method="POST"
                action=""
                className="bg-card p-6 rounded-lg shadow-lg border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1">Name</label>
                    <Input id="contact-name" name="name" required />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1">Email</label>
                    <Input id="contact-email" name="email" type="email" required />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea id="contact-message" name="message" required className="min-h-[100px]" />
                  </div>
                  <Button 
                    type="submit"
                    disabled={sending}
                    className="w-full"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </section>

          <section id="reviews" className="mb-16 scroll-mt-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-lg border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.service}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="location" className="mt-12 scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border/50">
              <LocationMap 
                address="BIGGEST ALPHA, Lagos, Nigeria"
                mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15853.683544055808!2d3.3375663!3d6.5944969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b910271506487%3A0xbda903aed6f016e1!2sBIGGEST%20ALPHA!5e0!3m2!1sen!2spl!4v1739613615838!5m2!1sen!2spl"
              />
            </div>
            <div className="mt-4 p-4 bg-card rounded-lg border border-border/50">
              <p className="text-muted-foreground">
                📍 Visit us at BIGGEST ALPHA, Lagos, Nigeria<br />
                🕒 Opening Hours: Monday - Saturday, 9:00 AM - 5:30 PM
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
} 