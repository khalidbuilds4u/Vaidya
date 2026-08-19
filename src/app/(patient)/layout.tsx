import { Header } from "@/components/patient/Header"
import { Footer } from "@/components/patient/Footer"
import { FloatingContact } from "@/components/patient/FloatingContact"
import { MobileBottomBar } from "@/components/patient/MobileBottomBar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col relative pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <MobileBottomBar />
    </div>
  )
}
