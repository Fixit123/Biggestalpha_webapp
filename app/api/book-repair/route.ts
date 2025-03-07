import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'
import { nanoid } from 'nanoid'
import { deviceTypes, type DeviceType } from '@/types'

export async function POST(request: Request) {
  try {
    const { name, email, deviceType, issue } = await request.json()
    
    // Validate device type
    if (!deviceTypes.includes(deviceType as DeviceType)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid device type' 
      }, { status: 400 })
    }

    const confirmationCode = nanoid(8)
    const estimatedCompletion = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    // Save the repair booking
    const { error: bookingError } = await supabase
      .from('repair_bookings')
      .insert([{
        name,
        email,
        device_type: deviceType,
        issue,
        confirmation_code: confirmationCode,
        status: 'Received',
        estimated_completion: estimatedCompletion.toISOString()
      }])

    if (bookingError) {
      console.error('Booking error:', bookingError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to create booking' 
      }, { status: 500 })
    }

    // Create status history entry
    const { error: historyError } = await supabase
      .from('status_history')
      .insert([{
        repair_booking_id: confirmationCode,
        status: 'Received'
      }])

    if (historyError) {
      console.error('History error:', historyError)
      // Continue anyway since the main booking was successful
    }

    return NextResponse.json({ 
      success: true, 
      confirmationCode 
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 })
  }
} 