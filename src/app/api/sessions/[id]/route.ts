import { NextRequest, NextResponse } from "next/server"
import { getAnalysisSession, deleteSession } from "@/lib/analysis"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAnalysisSession(params.id)
    
    return NextResponse.json({ session }, { status: 200 })
  } catch (error) {
    console.error("Get session error:", error)
    
    if (error instanceof Error && error.message === "Analysis session not found") {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteSession(params.id)
    
    return NextResponse.json(
      { message: "Session deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Delete session error:", error)
    
    return NextResponse.json(
      { error: "Failed to delete session" },
      { status: 500 }
    )
  }
}