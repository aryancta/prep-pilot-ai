import { NextRequest, NextResponse } from "next/server"
import { getAllSessions } from "@/lib/analysis"

export async function GET() {
  try {
    const sessions = await getAllSessions()
    
    return NextResponse.json({ sessions }, { status: 200 })
  } catch (error) {
    console.error("Get sessions error:", error)
    
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    )
  }
}