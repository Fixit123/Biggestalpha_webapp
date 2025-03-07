"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase"
import { UpdateStatusModal } from "@/components/admin/update-status-modal"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Repair {
  id: number
  confirmation_code: string
  name: string
  email: string
  device_type: string
  issue: string
  status: string
  created_at: string
}

export default function RepairsPage() {
  const router = useRouter()
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.replace('/login')
        return
      }

      // If we have a session, fetch repairs
      fetchRepairs()
    } catch (error) {
      console.error('Auth error:', error)
      router.replace('/login')
    }
  }

  async function fetchRepairs() {
    try {
      const { data, error } = await supabase
        .from("repair_bookings")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      console.log("Fetched repairs:", data)
      setRepairs(data || [])
    } catch (error) {
      console.error("Error fetching repairs:", error)
      toast.error("Failed to load repairs")
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusUpdate(newStatus: string, estimatedCompletion?: string) {
    if (!selectedRepair || updating) return
    setUpdating(true)

    try {
      // Update status and estimated completion date
      const updateData = {
        status: newStatus,
        estimated_completion: estimatedCompletion || null
      }

      const { data, error } = await supabase
        .from('repair_bookings')
        .update(updateData)
        .eq('confirmation_code', selectedRepair.confirmation_code)
        .select()

      if (error) {
        console.error('Update error:', error)
        throw new Error(error.message)
      }

      // Refresh the repairs list
      await fetchRepairs()
      
      // Try to send email, but don't block if it fails
      try {
        await fetch('/api/send-status-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: selectedRepair.email,
            status: newStatus,
            code: selectedRepair.confirmation_code,
            estimatedCompletion: estimatedCompletion
          })
        })
        toast.success("Status updated and notification sent")
      } catch (emailError) {
        console.error('Email error:', emailError)
        toast.success("Status updated (email notification failed)")
      }

      setSelectedRepair(null)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : "Failed to update status")
    } finally {
      setUpdating(false)
    }
  }

  // Console log current repair statuses
  useEffect(() => {
    console.log("Current repairs:", repairs)
  }, [repairs])

  // Add this helper function at the top of your component
  function cleanStatus(status: string) {
    return status
      .replace(/::text$/, '')     // Remove ::text from end
      .replace(/^"/, '')          // Remove starting quote
      .replace(/"$/, '')          // Remove ending quote
      .replace(/^Received/, 'Received')  // Clean up status text
  }

  return (
    <div className="space-y-6 w-full max-w-[100vw] overflow-x-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">Repair Dashboard</h2>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading repairs...</p>
      ) : (
        <div className="rounded-lg border border-border/40 bg-background/95 backdrop-blur min-w-full">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="p-3 md:p-4 text-left text-foreground font-medium">Code</th>
                  <th className="p-3 md:p-4 text-left text-foreground font-medium">Customer</th>
                  <th className="p-3 md:p-4 text-left text-foreground font-medium hidden md:table-cell">Device</th>
                  <th className="p-3 md:p-4 text-left text-foreground font-medium hidden md:table-cell">Issue</th>
                  <th className="p-3 md:p-4 text-left text-foreground font-medium">Status</th>
                  <th className="p-3 md:p-4 text-left text-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair) => (
                  <tr key={repair.id} className="border-b border-border/40 last:border-0">
                    <td className="p-3 md:p-4 text-foreground text-sm md:text-base">{repair.confirmation_code}</td>
                    <td className="p-3 md:p-4">
                      <div className="text-foreground text-sm md:text-base">{repair.name}</div>
                      <div className="text-muted-foreground text-xs md:text-sm">{repair.email}</div>
                    </td>
                    <td className="p-3 md:p-4 text-foreground hidden md:table-cell">{repair.device_type}</td>
                    <td className="p-3 md:p-4 text-foreground hidden md:table-cell">{repair.issue}</td>
                    <td className="p-3 md:p-4">
                      <span className="px-2 py-1 md:px-3 text-sm rounded-full bg-blue-500/10 text-blue-500">
                        {cleanStatus(repair.status)}
                      </span>
                    </td>
                    <td className="p-3 md:p-4">
                      <button 
                        onClick={() => setSelectedRepair(repair)}
                        disabled={updating}
                        className="px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-md bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                      >
                        {updating && selectedRepair?.confirmation_code === repair.confirmation_code 
                          ? 'Updating...' 
                          : 'Update'
                        }
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <UpdateStatusModal
        isOpen={!!selectedRepair}
        onClose={() => setSelectedRepair(null)}
        repair={selectedRepair}
        onUpdate={handleStatusUpdate}
      />
    </div>
  )
} 