"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { bookRepair } from "@/app/actions/book-repair"
import { useToast } from "@/components/ui/use-toast"

export default function BookRepairForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    
    // Handle device type
    const deviceType = formData.get("deviceType") as string
    if (deviceType === "other") {
      const customType = formData.get("customDeviceType")
      if (customType) {
        formData.set("deviceType", customType as string)
      }
    }
    
    const result = await bookRepair(formData)

    setIsSubmitting(false)
    if (result.success) {
      setConfirmationCode(result.confirmationCode || null)
      toast({
        title: "Repair Booked", 
        description: "Your repair has been booked successfully.",
      })
    } else {
      setError(result.error || "There was a problem booking your repair. Please try again.")
      toast({
        title: "Error",
        description: result.error || "There was a problem booking your repair. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="Your email" required />
          </div>
        </div>
        <div>
          <label htmlFor="device-type" className="block text-sm font-medium mb-2">
            Device Type
          </label>
          <Select 
            name="deviceType" 
            required
            onValueChange={(value) => setSelectedDeviceType(value)}
          >
            <SelectTrigger id="device-type">
              <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Smartphone">Smartphone</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Tablet">Tablet</SelectItem>
              <SelectItem value="Smartwatch">Smartwatch</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {selectedDeviceType === "other" && (
          <div>
            <label htmlFor="custom-device-type" className="block text-sm font-medium mb-2">
              Specify Device Type
            </label>
            <Input 
              id="custom-device-type" 
              name="customDeviceType" 
              placeholder="Enter your device type"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="issue" className="block text-sm font-medium mb-2">
            Describe the Issue
          </label>
          <Textarea id="issue" name="issue" placeholder="Please describe the problem with your device" required />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Schedule Repair"}
        </Button>
      </form>
      {confirmationCode && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
          <p className="text-green-700">
            Your confirmation code is: <span className="font-bold">{confirmationCode}</span>
          </p>
          <p className="text-sm text-green-600 mt-2">
            Please keep this code for your records. You will receive a confirmation email shortly.
          </p>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}

