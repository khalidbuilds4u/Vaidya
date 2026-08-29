import { Header } from "@/components/patient/Header"
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import("@/components/patient/Footer").then(mod => mod.Footer))
const FloatingContact = dynamic(() => import("@/components/patient/FloatingContact").then(mod => mod.FloatingContact))
const MobileBottomBar = dynamic(() => import("@/components/patient/MobileBottomBar").then(mod => mod.MobileBottomBar))
const ChatbotWidget = dynamic(() => import("@/components/patient/ChatbotWidget").then(mod => mod.ChatbotWidget))

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDbSet = !!process.env.DATABASE_URL;
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-slate-50/50">
      <div id="debug-db-status" style={{ display: 'none' }}>
        DB_STATUS: {isDbSet ? "SET" : "MISSING"}
      </div>
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <ChatbotWidget />
      <MobileBottomBar />
    </div>
  )
}
