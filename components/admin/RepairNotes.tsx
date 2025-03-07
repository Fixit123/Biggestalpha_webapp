'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function RepairNotes({ repairId }: { repairId: string }) {
  const [note, setNote] = useState('')
  const { toast } = useToast()

  async function addNote() {
    try {
      const response = await fetch(`/api/repairs/${repairId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note })
      })

      if (!response.ok) throw new Error('Failed to add note')
      setNote('')
      toast({ title: "Note added successfully" })
    } catch (error) {
      toast({ 
        title: "Failed to add note",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add repair notes..."
        className="w-full p-2 rounded-md border"
        rows={3}
      />
      <Button onClick={addNote} disabled={!note.trim()}>
        Add Note
      </Button>
    </div>
  )
}