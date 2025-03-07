import { Card } from "@/components/ui/card"
import { Wrench, Users, Home } from "lucide-react"
import Link from "next/link"
import AdminNav from '@/app/components/AdminNav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 md:min-h-screen">
        <AdminNav />
      </div>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
} 