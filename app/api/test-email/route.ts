import { NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Test Email - Biggest Alpha',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from Biggest Alpha.</p>
        <p>If you're seeing this, your email configuration is working correctly!</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send test email' },
      { status: 500 }
    )
  }
}
