import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // A lightweight database query to keep the Supabase instance active.
    // We just count the users, which is very fast and uses almost 0 compute.
    const count = await prisma.user.count();
    
    return NextResponse.json({ 
      status: "ok", 
      message: "Database pinged successfully",
      count 
    });
  } catch (error) {
    console.error("Failed to ping database:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to ping database" }, 
      { status: 500 }
    );
  }
}
