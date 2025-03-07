import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card } from "@/components/ui/card"
import { UpdateRepairStatus } from '@/components/admin/UpdateRepairStatus'
import { RepairNotes } from '@/components/admin/RepairNotes'
import { Button } from "@/components/ui/button"

interface Note {
  id: string
  content: string
  created_at: string
}

export default async function RepairDetailsPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: repair } = await supabase
    .from('repairs')
    .select(`
      *,
      notes (
        id,
        content,
        created_at
      )
    `)
    .eq('id', params.id)
    .single()

  if (!repair) return <div>Repair not found</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Repair #{repair.id}</h1>
        <UpdateRepairStatus 
          repairId={repair.id} 
          currentStatus={repair.status}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Details */}
        <Card className="p-6 bg-background/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {repair.customer_name}</p>
            <p><strong>Email:</strong> {repair.customer_email}</p>
            <p><strong>Phone:</strong> {repair.customer_phone}</p>
          </div>
        </Card>

        {/* Device Details */}
        <Card className="p-6 bg-background/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Device Details</h2>
          <div className="space-y-2">
            <p><strong>Type:</strong> {repair.device_type}</p>
            <p><strong>Model:</strong> {repair.device_model}</p>
            <p><strong>Problem:</strong> {repair.problem_description}</p>
          </div>
        </Card>

        {/* Repair Notes */}
        <Card className="p-6 bg-background/60 backdrop-blur md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Repair Notes</h2>
          <div className="space-y-4">
            <RepairNotes repairId={repair.id} />
            <div className="space-y-2">
              {repair.notes?.map((note: Note) => (
                <div key={note.id} className="p-3 bg-background/80 rounded-lg">
                  <p>{note.content}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Cost Breakdown */}
        <Card className="p-6 bg-background/60 backdrop-blur md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-border/40">
                <td className="p-2">Service Cost</td>
                <td className="p-2 text-right">${repair.service_cost}</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="p-2">Parts</td>
                <td className="p-2 text-right">${repair.parts_cost || 0}</td>
              </tr>
              <tr className="font-bold">
                <td className="p-2">Total</td>
                <td className="p-2 text-right">
                  ${(repair.service_cost || 0) + (repair.parts_cost || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}