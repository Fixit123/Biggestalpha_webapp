import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BookRepairForm from "@/components/book-repair-form"

export default function BookRepairPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Book a Repair
        </h1>
        <BookRepairForm />
      </main>
      <Footer />
    </div>
  )
}

