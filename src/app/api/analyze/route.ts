import { NextRequest, NextResponse } from "next/server"
import { analyzeResumeAndJob } from "@/lib/analysis"
import { analyzeRequestSchema } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = analyzeRequestSchema.parse(body)
    
    // Perform analysis
    const result = await analyzeResumeAndJob(validatedData)
    
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Analysis error:", error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}