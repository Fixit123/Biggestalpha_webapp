"use client"

import { X } from "lucide-react"
import { useState } from "react"

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container flex items-center justify-between">
        <p className="text-sm font-medium">🎉 Special offer: Get 20% off on all repairs this week! Use code: FIX20</p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-primary-foreground hover:text-primary-foreground/80"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

