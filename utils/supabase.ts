import { createClient } from "@supabase/supabase-js"

// Add console logs to help debug environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing:', {
    urlExists: !!supabaseUrl,
    keyExists: !!supabaseKey
  })
}

let supabase: any

if (typeof window !== 'undefined') {
  // Client-side
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true
      }
    }
  )
} else {
  // Server-side
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false
      }
    }
  )
}

export { supabase }

export async function insertBooking(bookingData: any) {
  // Ensure the user is logged in
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.error('User not authenticated')
      return { success: false, error: 'User not authenticated' }
    }

    try {
      const { data, error } = await supabase
        .from('repair_bookings')
        .insert([bookingData])

      if (error) throw error

      console.log('Booking inserted successfully:', data)
      return { success: true, data }
    } catch (error) {
      console.error('Error inserting booking:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  } catch (authError) {
    console.error('Authentication error:', authError)
    return { success: false, error: 'Authentication failed' }
  }
}

export async function getFeaturedServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('featured', true)

    if (error) {
      console.error('Error fetching featured services:', error)
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Failed to fetch featured services:', error)
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

