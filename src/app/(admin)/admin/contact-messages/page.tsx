import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ContactMessageList } from "./ContactMessageList"

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Contact Messages | Admin Dashboard",
}

export default async function AdminContactMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View messages submitted through the Contact Us form.
        </p>
      </div>

      <ContactMessageList initialMessages={messages} />
    </div>
  )
}
