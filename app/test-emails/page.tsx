import { supabase } from "@/utils/supabase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

async function getSentEmails(confirmationCode?: string) {
  if (!confirmationCode) {
    return [];  // Return empty if no code provided
  }

  await supabase.rpc('set_claim', {
    name: 'app.booking_code',
    value: confirmationCode
  });

  const { data, error } = await supabase
    .from("sent_emails")
    .select("*")
    .order("sent_at", { ascending: false })
    .limit(10)

  if (error) {
    throw new Error(`Failed to fetch sent emails: ${error.message}`)
  }

  return data
}

export default async function TestEmailsPage() {
  let sentEmails = []
  let errorMessage = null

  try {
    sentEmails = await getSentEmails()
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container max-w-4xl mx-auto py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Test Emails
          </h1>
        </div>
        {errorMessage ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        ) : sentEmails.length > 0 ? (
          <div className="space-y-6">
            {sentEmails.map((email) => (
              <div key={email.id} className="bg-card p-6 rounded-lg shadow-lg border border-border/50">
                <h2 className="text-2xl font-semibold mb-2">{email.subject}</h2>
                <p className="text-sm text-muted-foreground mb-2">To: {email.to_email}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Sent at: {new Date(email.sent_at).toLocaleString()}
                </p>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: email.content }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No test emails found. Try booking a repair first.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}

