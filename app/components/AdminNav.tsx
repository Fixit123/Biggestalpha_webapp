"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Home, Wrench, Users } from 'lucide-react'

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-gray-900 text-white">
      {/* Desktop Nav */}
      <div className="hidden md:block">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
          <nav className="space-y-4">
            <Link href="/admin" className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/repairs" className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
              <Wrench size={20} />
              <span>Repairs</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
              <Users size={20} />
              <span>Customers</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? "×" : "☰"}
          </button>
        </div>

        {isOpen && (
          <nav className="p-4 space-y-4 bg-gray-800">
            <Link href="/admin" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/repairs" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
              <Wrench size={20} />
              <span>Repairs</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
              <Users size={20} />
              <span>Customers</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  )
} 