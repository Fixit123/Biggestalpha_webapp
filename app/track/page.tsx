'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

// Use environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function TrackPage() {
  const [repair, setRepair] = useState<any>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [confirmationCode, setConfirmationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSearch() {
    if (!confirmationCode.trim()) {
      setError('Please enter a confirmation code')
      return
    }

    setLoading(true)
    setError('')
    setMessage('Searching...')
    
    try {
      const { data, error } = await supabase
        .from('repair_bookings')
        .select('*')
        .eq('confirmation_code', confirmationCode.trim())
        .single()

      if (error) {
        setError('No repair found with this code')
        return
      }

      setRepair(data)

      // Get notes if any exist
      const { data: notesData, error: notesError } = await supabase
        .from('repair_notes')
        .select('*')
        .eq('repair_id', data.id)
        .order('created_at', { ascending: false })

      if (notesError) {
        setMessage('Notes error: ' + notesError.message)
      } else {
        setNotes(notesData || [])
      }

    } catch (err: any) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Track Your Repair</h1>
      
      <div className="mb-6">
        <label className="block mb-2">Enter your confirmation code</label>
        <input
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter your code"
          className="w-full p-2 border rounded bg-black text-white"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full mt-2 p-2 bg-white text-black rounded hover:bg-gray-100 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Track Repair'}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {message && <p className="mt-2 text-blue-500 text-sm">{message}</p>}
      </div>

      {repair && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-900 rounded border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Repair Status</h2>
            <div className="space-y-2">
              <p className="text-lg font-medium">Status: {repair.status}</p>
              <p>Device: {repair.device_type}</p>
              <p>Issue: {repair.issue}</p>
              {repair.collection_date && repair.status === "Ready for Pickup" && (
                <p className="text-green-400">
                  Ready for collection on: {new Date(repair.collection_date).toLocaleString()}
                </p>
              )}
              <p>Created: {new Date(repair.created_at).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Status History</h2>
            <div className="space-y-3">
              {notes && notes.length > 0 ? (
                notes.map((note) => (
                  <div 
                    key={note.id}
                    className="p-4 bg-gray-900 rounded border border-gray-800"
                  >
                    <pre className="text-sm overflow-auto">
                      {JSON.stringify(note, null, 2)}
                    </pre>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 p-4 bg-gray-900 rounded border border-gray-800 text-center">
                  No status updates yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}