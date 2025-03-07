"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { trackRepair } from "@/app/actions/track-repair"
import type { RepairStatus } from "@/types/repair"

export default function RepairTrackerForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [repairStatus, setRepairStatus] = useState<RepairStatus | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setRepairStatus(null)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await trackRepair(formData)

      if (result.success && result.status) {
        setRepairStatus(result.status)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to retrieve repair status. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="confirmation-code" className="block text-sm font-medium mb-2">
            Confirmation Code
          </label>
          <Input id="confirmation-code" name="confirmationCode" placeholder="Enter your confirmation code" required />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Tracking..." : "Track Repair"}
        </Button>
      </form>
      {repairStatus && (
        <div className="mt-6 p-4 bg-card rounded-lg shadow-lg border border-border/50">
          <h3 className="text-lg font-semibold mb-2">Repair Status</h3>
          <p className="text-lg font-bold mb-2">{repairStatus.status}</p>
          <p className="mb-2">Device: {repairStatus.deviceType}</p>
          <p className="mb-2">Estimated Completion: {new Date(repairStatus.estimatedCompletion).toLocaleString()}</p>
          <p>Last Updated: {new Date(repairStatus.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

