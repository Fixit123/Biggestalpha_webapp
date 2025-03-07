"use client"
import { useState } from 'react'
import { toast } from 'sonner'

export default function Contact() {
  const [sending, setSending] = useState(false)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setSending(true)
    
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      toast.success('Message sent successfully!')
      form.reset()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Contact Form Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <div className="max-w-2xl">
          <form 
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add your reviews here */}
        </div>
      </section>

      {/* Location Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Location</h2>
        <div className="aspect-w-16 aspect-h-9">
          {/* Add your map or location details here */}
        </div>
      </section>
    </div>
  )
} 