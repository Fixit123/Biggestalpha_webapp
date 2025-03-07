"use server"

import { nanoid } from "nanoid"
import { supabase } from "@/utils/supabase"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Add this type
type RepairStatus = 'Received' | 'In Progress' | 'Ready for Pickup' | 'Completed'

export async function bookRepair(formData: FormData) {
  try {
    // Log basic connection test
    console.log("Testing Supabase connection...")
    const { data: testData, error: testError } = await supabase
      .from("repair_bookings")
      .select("id")
      .limit(1)

    if (testError) {
      console.error("Connection test failed:", testError)
      throw testError
    }
    console.log("Connection successful:", testData)

    // Get form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const deviceType = formData.get("deviceType") as string
    const customDeviceType = formData.get("customDeviceType") as string
    const issue = formData.get("issue") as string
    
    // Use custom device type if provided, otherwise use selected device type
    const finalDeviceType = deviceType === "other" ? customDeviceType : deviceType

    console.log("Processing device type:", finalDeviceType) // Debug log

    const confirmationCode = nanoid(8)
    console.log("Generated confirmation code:", confirmationCode)

    const bookingData = {
      name, 
      email, 
      device_type: finalDeviceType,
      issue, 
      confirmation_code: confirmationCode,
      status: 'Received' as RepairStatus, // explicitly type the status
      estimated_completion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    console.log("Attempting to insert:", bookingData)

    const { data, error } = await supabase
      .from("repair_bookings")
      .insert(bookingData)
      .select()

    if (error) {
      console.error("Insert failed:", error)
      throw error
    }

    console.log("Insert successful:", data)

    // Send confirmation email
    try {
      const emailContent = `
        <h1>Biggest Alpha Repair Booking Confirmation</h1>
        <p>Thank you for booking a repair with Biggest Alpha.</p>
        <p>Your confirmation code is: <strong>${confirmationCode}</strong></p>
        <p>Please keep this code for your records and use it to track your repair status.</p>
      `

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Your Biggest Alpha Repair Booking Confirmation",
        html: emailContent,
      })
      console.log("Confirmation email sent to:", email)
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Continue with success response even if email fails
    }

    // After sending the customer confirmation email, add this code:
    try {
      // Send notification to admin
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_FROM, // Send to admin email
        subject: `New Repair Booking: ${confirmationCode}`,
        html: `
          <h1>New Repair Booking</h1>
          <p>A new repair has been booked:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Device Type:</strong> ${finalDeviceType}</li>
            <li><strong>Issue:</strong> ${issue}</li>
            <li><strong>Confirmation Code:</strong> ${confirmationCode}</li>
          </ul>
          <p>Please log in to the admin dashboard to view details.</p>
        `,
      })
      console.log("Admin notification email sent")
    } catch (adminEmailError) {
      console.error("Failed to send admin notification:", adminEmailError)
      // Continue with success response even if admin email fails
    }

    return {
      success: true,
      confirmationCode
    }

  } catch (error) {
    console.error("Full error details:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create repair booking"
    }
  }
}

