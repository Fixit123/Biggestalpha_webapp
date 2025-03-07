"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UpdateStatusModalProps {
  isOpen: boolean
  onClose: () => void
  repair: {
    confirmation_code: string
    email: string
    name: string
    status: string
    estimated_completion?: string
  } | null
  onUpdate: (newStatus: string, estimatedCompletion?: string) => Promise<void>
}

const STATUS_OPTIONS = [
  "Received",
  "In Progress",
  "Ready for Pickup",
  "Completed"
]

function formatDateForInput(dateStr: string) {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function formatDateForDatabase(dateStr: string) {
  const date = new Date(dateStr)
  return date.toISOString()
}

export function UpdateStatusModal({ isOpen, onClose, repair, onUpdate }: UpdateStatusModalProps) {
  const [status, setStatus] = useState(
    repair?.status ? repair.status.replace(/::text$/, '') : ""
  )
  const [estimatedCompletion, setEstimatedCompletion] = useState("")

  useEffect(() => {
    setStatus(repair?.status ? repair.status.replace(/::text$/, '') : "")
    // Convert the database timestamp to local datetime format
    if (repair?.estimated_completion) {
      try {
        const formatted = formatDateForInput(repair.estimated_completion)
        setEstimatedCompletion(formatted)
      } catch (e) {
        console.error('Date conversion error:', e)
        setEstimatedCompletion("")
      }
    } else {
      setEstimatedCompletion("")
    }
  }, [repair])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px] bg-background text-foreground"
        aria-describedby="modal-description"
      >
        <DialogHeader>
          <DialogTitle>Update Repair Status</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p id="modal-description" className="text-sm text-muted-foreground">
              Current status: {repair?.status?.replace(/::text$/, '')}
            </p>
            
            <Select 
              value={status} 
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4 space-y-2">
              <Label htmlFor="estimated-completion" className="text-foreground">
                Estimated Completion Date & Time
              </Label>
              <Input
                id="estimated-completion"
                type="datetime-local"
                value={estimatedCompletion}
                onChange={(e) => setEstimatedCompletion(e.target.value)}
                className="w-full bg-background text-foreground border-border"
                required={status === "Ready for Pickup"}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              if (!status) return
              if (status === "Ready for Pickup" && !estimatedCompletion) {
                alert("Please set a collection date and time")
                return
              }
              // Convert local time to UTC for database
              const dbDate = estimatedCompletion ? formatDateForDatabase(estimatedCompletion) : null
              onUpdate(status, dbDate || undefined)
            }}
            disabled={!status || (status === repair?.status?.replace(/::text$/, '') && estimatedCompletion === formatDateForInput(repair?.estimated_completion || ""))}
          >
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 