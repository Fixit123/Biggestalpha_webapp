"use server"

import { supabase } from "@/utils/supabase"
import type { RepairStatus } from "@/types/repair"

export async function trackRepair(formData: FormData) {
  try {
    const confirmationCode = formData.get("confirmationCode") as string
    console.log("Tracking repair with code:", confirmationCode)

    // Query repair with exact confirmation code
    const { data: repairs, error: searchError } = await supabase
      .from("repair_bookings")
      .select()
      .ilike("confirmation_code", confirmationCode.trim())
      .maybeSingle()

    console.log("Query result:", repairs) // Debug log

    if (searchError) {
      console.error("Search error:", searchError)
      return {
        success: false,
        error: "Could not find repair with this code"
      }
    }

    if (!repairs) {
      return {
        success: false,
        error: "No repair found with this confirmation code"
      }
    }

    const repairStatus: RepairStatus = {
      status: repairs.status,
      deviceType: repairs.device_type,
      estimatedCompletion: repairs.estimated_completion,
      lastUpdated: repairs.updated_at || repairs.created_at
    }

    return { 
      success: true, 
      status: repairStatus 
    }

  } catch (error) {
    console.error("Full error details:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to track repair"
    }
  }
}

