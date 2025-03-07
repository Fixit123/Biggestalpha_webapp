import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Create Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  console.log('API route hit')

  try {
    const { name, email, message } = await request.json()
    console.log('Form data received:', { name, email, message })

    // Log Resend settings (remove in production)
    console.log('Using Resend with from email:', process.env.RESEND_FROM_EMAIL)

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: "biggestalpha7@gmail.com", // Your Gmail address
      replyTo: email, // This makes replies go to the person who filled out the form
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    console.log('Email sent with Resend:', result)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Detailed email error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    )
  }
} 