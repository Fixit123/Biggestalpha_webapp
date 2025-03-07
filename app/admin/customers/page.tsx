'use client'
import { useState, useEffect } from 'react'
import { supabase } from "@/utils/supabase"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Customer {
  name: string
  email: string
  device_type: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await supabase
        .from('repair_bookings')
        .select('name, email, device_type')
        .order('email')
      
      if (data) setCustomers(data)
    }

    fetchCustomers()
  }, [])

  // Filter customers based on search
  const filteredCustomers = customers?.filter(customer => 
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.device_type.includes(search)
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Customers</h1>
      
      <div className="max-w-sm">
        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <Card className="p-6 bg-background/60 backdrop-blur">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left p-2 text-foreground">Name</th>
                <th className="text-left p-2 text-foreground">Email</th>
                <th className="text-left p-2 text-foreground">Device Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers?.map((customer, index) => (
                <tr key={`${customer.email}-${customer.name}-${customer.device_type}-${index}`} className="border-b border-border/40">
                  <td className="p-2 text-foreground">{customer.name}</td>
                  <td className="p-2 text-foreground">{customer.email}</td>
                  <td className="p-2 text-foreground">{customer.device_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 