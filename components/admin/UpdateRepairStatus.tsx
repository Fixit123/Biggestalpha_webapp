'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'diagnosing', label: 'Diagnosing' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'waiting_parts', label: 'Waiting for Parts' },
  { value: 'ready', label: 'Ready for Pickup' },
  { value: 'completed', label: 'Completed' }
]

export function UpdateRepairStatus({ 
  repairId, 
  currentStatus 
}: { 
  repairId: string
  currentStatus: string 
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function updateStatus(newStatus: string) {
    setLoading(true)
    try {
      const response = await fetch(`/api/repairs/${repairId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) throw new Error('Failed to update status')

      setStatus(newStatus)
      toast({
        title: "Status Updated",
        description: `Repair #${repairId} status changed to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      disabled={loading}
      className={`px-2 py-1 rounded-full text-sm ${
        status === 'in_progress' 
          ? 'bg-yellow-500/10 text-yellow-500'
          : status === 'completed'
          ? 'bg-green-500/10 text-green-500'
          : 'bg-blue-500/10 text-blue-500'
      }`}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
} 