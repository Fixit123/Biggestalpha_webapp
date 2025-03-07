import { createTransport } from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export async function POST(request: Request) {
  try {
    const { email, status, code } = await request.json()
    
    console.log('Attempting to send email to:', email)

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Repair Status Update - ${code}`,
      html: `
        <h2>Your Repair Status Has Been Updated</h2>
        <p>Repair Code: ${code}</p>
        <p>New Status: ${status}</p>
        <p>Track your repair at: ${process.env.NEXT_PUBLIC_SITE_URL}/track/${code}</p>
      `
    })

    console.log('Email sent successfully to:', email)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Detailed email error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
} 