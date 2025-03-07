import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Alex Johnson",
    rating: 5,
    comment: "Fantastic service! They fixed my iPhone screen in just an hour. Highly recommended!",
  },
  {
    name: "Sarah Lee",
    rating: 4,
    comment: "Great experience overall. The staff was friendly and knowledgeable. My laptop is working like new now.",
  },
  {
    name: "Mike Brown",
    rating: 5,
    comment: "TechFix Pro saved my data when I thought all was lost. They're true professionals!",
  },
  {
    name: "Emily Chen",
    rating: 4,
    comment: "Quick and efficient service. Fair prices too. I'll definitely come back if I need any more repairs.",
  },
]

export default function ReviewsPage() {
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
            Customer Reviews
          </h1>
          <div className="grid gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-lg border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold mr-2">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

