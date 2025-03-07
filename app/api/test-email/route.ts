import { testEmail } from "@/utils/test-email"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const result = await testEmail()
    console.log("Email test result:", result) // Debug log
    return NextResponse.json(result)
  } catch (error) {
    console.error("Test route error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to send test email" 
    }, { status: 500 })
  }
} 