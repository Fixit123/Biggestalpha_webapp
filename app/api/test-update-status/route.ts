import { supabase } from "@/utils/supabase"
import { sendStatusEmail } from "@/utils/send-email"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get the latest booking for testing
    const { data: latestBooking, error: fetchError } = await supabase
      .from("repair_bookings")
      .select("confirmation_code, email")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !latestBooking) {
      throw new Error("No bookings found")
    }

    console.log("Found booking:", latestBooking) // Debug log

    // Send status email
    const emailResult = await sendStatusEmail(
      latestBooking.email,
      latestBooking.confirmation_code,
      "In Progress"
    )

    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      confirmationCode: latestBooking.confirmation_code
    })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update status" 
    }, { status: 500 })
  }
} 