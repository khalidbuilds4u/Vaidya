import { Header } from "@/components/patient/Header"
import { Footer } from "@/components/patient/Footer"
import { FloatingContact } from "@/components/patient/FloatingContact"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}
