'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import { deviceTypes, type DeviceType } from '../types'
import { bookRepair } from '@/app/actions/book-repair'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RepairPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [deviceType, setDeviceType] = useState<DeviceType>('Smartphone')
  const [issue, setIssue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('deviceType', deviceType)
    formData.append('issue', issue)

    try {
      const response = await fetch('/actions/book-repair', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        alert(`Repair scheduled! Your confirmation code is: ${data.confirmationCode}`)
        setName('')
        setEmail('')
        setDeviceType('Smartphone')
        setIssue('')
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to schedule repair')
      console.error('Error:', err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Book a Repair</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-black border rounded text-white"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-black border rounded text-white"
            placeholder="Your email"
            required
          />
        </div>

        <div className="relative">
          <label className="block mb-2">Device Type</label>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-2 bg-black border rounded text-white text-left"
          >
            {deviceType || 'Select device type'}
          </button>
          
          {isOpen && (
            <div className="absolute w-full mt-1 bg-black border rounded shadow-lg z-10">
              {deviceTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setDeviceType(type)
                    setIsOpen(false)
                  }}
                  className="w-full p-2 text-left hover:bg-gray-800 text-white"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2">Describe the Issue</label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full p-2 bg-black border rounded text-white h-32"
            placeholder="Please describe the problem with your device"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-white text-black rounded hover:bg-gray-100"
        >
          Schedule Repair
        </button>
      </form>
    </div>
  )
} 