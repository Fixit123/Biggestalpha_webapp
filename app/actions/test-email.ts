"use server"

import { createTransport } from "nodemailer"

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function testEmail(formData: FormData) {
  const email = formData.get("email") as string

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "TechFix Pro - Test Email",
      text: "This is a test email from TechFix Pro.",
      html: `
        <h1>TechFix Pro - Test Email</h1>
        <p>This is a test email from TechFix Pro.</p>
        <p>If you're seeing this, your email configuration is working correctly!</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending test email:", error)
    return { success: false }
  }
}

