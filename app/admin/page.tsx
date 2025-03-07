'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { format } from 'date-fns' // Add this import for date formatting
import { useRouter } from 'next/navigation'  // Change back to next/navigation

// Add type for repair
interface Repair {
  id: number
  name: string
  email: string
  device_type: string
  issue: string
  confirmation_code: string
  status: string
  created_at: string
}

// Create a singleton Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function AdminPage() {
  const router = useRouter()
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<string[]>([]) // Track deleting state
  const [authChecking, setAuthChecking] = useState(true)

  // Improved auth check
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession()
        if (authError) throw authError
        
        if (!session) {
          router.push('/login')
          return
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        setError('Authentication failed. Please try logging in again.')
        router.push('/login')
      } finally {
        setAuthChecking(false)
      }
    }
    checkAuth()
  }, [router])

  async function loadRepairs() {
    try {
      setError('') // Clear any previous errors
      const { data, error } = await supabase
        .from('repair_bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (!data || data.length === 0) {
        setRepairs([])
        return
      }

      // Validate data structure
      const validRepairs = data.filter(repair => {
        if (!repair.id || !repair.created_at) {
          console.warn('Invalid repair data:', repair)
          return false
        }
        return true
      })

      setRepairs(validRepairs)
    } catch (err: any) {
      console.error('Load repairs error:', err)
      setError(err.message || 'Failed to load repairs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function deleteRepair(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this repair? This cannot be undone.')
    if (!confirmed) return

    try {
      setDeleting(prev => [...prev, id.toString()])
      setError('') // Clear any previous errors
      
      console.log('Attempting to delete repair with ID:', id)
      
      // Check if we have a valid session first
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('You must be logged in to delete repairs')
      }
      
      // Check if user is in admin_users table using the user_id field
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', session.user.id)
      
      console.log('Admin check:', { adminData, adminError, userId: session.user.id })
      
      if (adminError) {
        throw new Error('Error checking admin status: ' + adminError.message)
      }
      
      if (!adminData || adminData.length === 0) {
        throw new Error('Only admins can delete repairs')
      }
      
      // Now try to delete
      const { error: deleteError } = await supabase
        .from('repair_bookings')
        .delete()
        .eq('id', id)
      
      if (deleteError) {
        console.error('Delete error:', deleteError)
        throw deleteError
      }
      
      console.log('Delete successful, updating UI')
      
      // Update the UI after successful deletion
      setRepairs(prev => prev.filter(repair => repair.id !== id))
      
    } catch (err: any) {
      console.error('Delete error:', err)
      setError(err.message || 'Failed to delete repair. Please try again.')
    } finally {
      setDeleting(prev => prev.filter(delId => delId !== id.toString()))
    }
  }

  useEffect(() => {
    if (!authChecking) {
      loadRepairs()
    }
  }, [authChecking])

  if (authChecking) {
    return <div className="text-white text-center">Checking authentication...</div>
  }

  return (
    <div className="relative z-50 min-h-screen bg-black">
      <div className="absolute inset-0 z-50 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-white">Repair Dashboard</h1>
          
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
              <button 
                onClick={() => {
                  setError('')
                  loadRepairs()
                }}
                className="ml-2 underline"
              >
                Retry
              </button>
            </div>
          )}
          
          {loading ? (
            <div className="text-white text-center">Loading repairs...</div>
          ) : repairs.length === 0 ? (
            <div className="text-white text-center">No repairs found</div>
          ) : (
            <div className="grid gap-4">
              {repairs
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((repair) => {
                  const bookingDate = new Date(repair.created_at)
                  const formattedDate = format(bookingDate, 'MMM d, yyyy HH:mm')
                  
                  // Create a truly unique key
                  const uniqueKey = `${repair.id}_${bookingDate.getTime()}`
                  
                  const isDeleting = deleting.includes(repair.id.toString())
                  
                  return (
                    <div 
                      key={uniqueKey}
                      className="bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-800"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-lg font-semibold text-white">{repair.name}</h2>
                            <span className="text-sm text-gray-400">({formattedDate})</span>
                          </div>
                          <p className="text-gray-400">{repair.email}</p>
                          <div className="mt-2">
                            <p className="text-gray-300">Device: {repair.device_type}</p>
                            <p className="text-gray-300">Issue: {repair.issue}</p>
                            <p className="text-gray-300">Code: {repair.confirmation_code}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className={`px-2 py-1 text-sm rounded ${
                            repair.status === 'Completed' 
                              ? 'bg-green-500' 
                              : 'bg-blue-500'
                          } text-white`}>
                            {repair.status || 'Received'}
                          </span>
                          <button
                            onClick={() => deleteRepair(repair.id)}
                            disabled={isDeleting}
                            className={`px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50`}
                          >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 