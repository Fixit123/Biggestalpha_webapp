import { sendStatusEmail } from "@/utils/send-email"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await sendStatusEmail(
      "olayinkaahmed22222@gmail.com", // Your verified email
      "TEST123",
      "In Progress"
    )
    
    console.log("Status email test result:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Test route error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to send status email" 
    }, { status: 500 })
  }
} 