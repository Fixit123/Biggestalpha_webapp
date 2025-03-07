import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Update repair status
    const { data: repair, error } = await supabase
      .from('repairs')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select('customer_email, customer_name')
      .single()

    if (error) throw error

    // Send email notification
    if (repair) {
      await resend.emails.send({
        from: 'repairs@yourdomain.com',
        to: repair.customer_email,
        subject: `Repair Update - Status: ${status}`,
        html: `
          <h1>Your Repair Status Has Been Updated</h1>
          <p>Dear ${repair.customer_name},</p>
          <p>Your repair (ID: ${params.id}) has been updated to: ${status}</p>
          <p>You can check the details of your repair at any time by logging into your account.</p>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
} 