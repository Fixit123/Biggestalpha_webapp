import { Resend } from 'resend'
import { emailTemplates } from './email-templates'

export async function testEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    // Use Resend's test domain
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",  // Use this exact address for testing
      to: "olayinkaahmed22222@gmail.com", // Your verified email
      subject: "Test Email",
      html: emailTemplates.booking("TEST123")
    })
    
    console.log("Test email sent:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("Test failed:", error)
    return { success: false, error }
  }
} 