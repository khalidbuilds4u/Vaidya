import { Header } from "@/components/patient/Header"
import { Footer } from "@/components/patient/Footer"
import { FloatingContact } from "@/components/patient/FloatingContact"
import { MobileBottomBar } from "@/components/patient/MobileBottomBar"
import { ChatbotWidget } from "@/components/patient/ChatbotWidget"

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
