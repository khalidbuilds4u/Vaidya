"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function updateAdminPassword(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "All fields are required." };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match." };
    }

    if (newPassword.length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    const adminEmail = session.user.email || "admin@vaidya.com";
    
    // Fetch user
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!user || !user.hashedPassword) {
      return { success: false, error: "Admin user not found." };
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.hashedPassword);
    
    if (!passwordMatch) {
      return { success: false, error: "Current password is incorrect." };
    }

    // Hash and update new password
    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email: adminEmail },
      data: { hashedPassword: newHashedPassword }
    });

    return { success: true, message: "Password updated successfully!" };

  } catch (error: any) {
    console.error("Error updating password:", error);
    return { success: false, error: error.message || "Failed to update password." };
  }
}
