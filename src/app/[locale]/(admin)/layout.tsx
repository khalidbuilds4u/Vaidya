import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "./AdminShell";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin | Asad Healthcare",
  robots: { index: false, follow: false }, // Keep admin out of search engines
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense-in-depth: middleware already blocks unauthenticated users,
  // but we double-check here in case middleware is bypassed somehow.
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as { role?: string })?.role;
  if (role !== "ADMIN") {
    redirect("/login");
  }

  // Count unread / new patient leads
  const newLeadsCount = await prisma.patientCase.count({
    where: { status: "NEW" },
  });

  return (
    <AdminShell
      userName={session.user.name || session.user.email || "Admin"}
      userRole={role}
      newLeadsCount={newLeadsCount}
    >
      {children}
    </AdminShell>
  );
}
