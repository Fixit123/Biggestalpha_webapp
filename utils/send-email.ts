import { Resend } from 'resend'
import { emailTemplates } from './email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendStatusEmail(
  email: string, 
  confirmationCode: string, 
  status: string
) {
  try {
    const result = await resend.emails.send({
      from: "info@biggestalpha.com.ng",
      to: email,
      subject: "Repair Status Update",
      html: emailTemplates.statusUpdate(confirmationCode, status)
    })
    
    console.log("Status email sent:", result)
    return { success: true }
  } catch (error) {
    console.error("Failed to send status email:", error)
    return { success: false }
    // Note: Won't affect main system if email fails
  }
} 