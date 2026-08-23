export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-slate-50/50">
      <main className="flex-1 relative z-10">
        {children}
      </main>
    </div>
  )
}
