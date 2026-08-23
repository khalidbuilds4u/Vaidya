"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, Phone, Calendar } from "lucide-react"

import { deleteContactMessage } from "@/app/actions/cmsActions"

export function ContactMessageList({ initialMessages }: { initialMessages: any[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    
    setIsDeleting(id)
    try {
      await deleteContactMessage(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to delete message:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (initialMessages.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-xl border border-dashed">
        <h3 className="text-lg font-medium text-slate-900 mb-2">No messages yet</h3>
        <p className="text-slate-500 mb-4">When patients contact you through the website, their messages will appear here.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {initialMessages.map((msg) => (
        <div key={msg.id} className={`bg-white rounded-xl border shadow-sm p-5 transition-all ${msg.isRead ? 'opacity-70' : 'border-primary/30 shadow-primary/5'}`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
                {!msg.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>}
                {msg.subject || "No Subject"}
              </h3>
              <p className="text-sm font-medium text-slate-700 mt-1">{msg.name}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(msg.createdAt).toLocaleDateString()}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                onClick={() => handleDelete(msg.id)}
                disabled={isDeleting === msg.id}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> {msg.email}</span>
            {msg.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> {msg.phone}</span>}
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 text-slate-700 text-sm whitespace-pre-wrap border border-slate-100">
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  )
}
