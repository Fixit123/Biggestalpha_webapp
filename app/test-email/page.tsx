import TestEmailForm from "@/components/test-email-form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TestEmailPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Test Email Functionality
        </h1>
        <TestEmailForm />
      </main>
      <Footer />
    </div>
  )
}

