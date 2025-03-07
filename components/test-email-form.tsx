"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { testEmail } from "@/app/actions/test-email"

export default function TestEmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const result = await testEmail(formData)

    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Email Sent",
        description: "Check your inbox for the test email.",
      })
    } else {
      toast({
        title: "Error",
        description: "There was a problem sending the email. Please check your SMTP settings.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="Your email" required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Test Email"}
      </Button>
    </form>
  )
}

