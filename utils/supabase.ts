import { createClient } from "@supabase/supabase-js"

let supabase: any

if (typeof window !== 'undefined') {
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
}

export async function getFeaturedServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('featured', true)

  if (error) throw error
  return data
}

