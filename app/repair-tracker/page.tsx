import RepairTrackerForm from "@/components/repair-tracker-form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function RepairTrackerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(100vh-4rem-20rem)]">
        <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Track Your Repair Status</h1>
          <div className="bg-card rounded-lg shadow-lg p-4 md:p-6 border border-border/50">
            <p className="text-muted-foreground mb-6 text-center">
              Enter your confirmation code below to check the status of your repair.
            </p>
            <RepairTrackerForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
