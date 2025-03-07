import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import React from 'react'

interface ServiceDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

// Utility component for screen readers
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
)

export function ServiceDialog({ isOpen, onClose, children }: ServiceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" suppressHydrationWarning>
        <DialogTitle className="text-xl font-bold">Service Details</DialogTitle>
        <DialogDescription className="text-gray-500">
          View our repair service details and pricing
        </DialogDescription>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
} 