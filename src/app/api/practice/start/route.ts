import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { practiceStartRequestSchema } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = practiceStartRequestSchema.parse(body)
    
    // Get the analysis session and its questions
    const session = await prisma.analysisSession.findUnique({
      where: { id: sessionId },
      include: {
        interviewQuestions: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    })
    
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      )
    }
    
    if (session.interviewQuestions.length === 0) {
      return NextResponse.json(
        { error: "No interview questions available" },
        { status: 400 }
      )
    }
    
    // Create a new practice session
    const practiceSession = await prisma.practiceSession.create({
      data: {
        sessionId: sessionId,
        currentQuestionIndex: 0,
        overallScore: 0,
        status: 'active'
      }
    })
    
    // Get the first question
    const firstQuestion = session.interviewQuestions[0]
    
    return NextResponse.json({
      practiceId: practiceSession.id,
      firstQuestion: firstQuestion.questionText,
      context: `Interview practice for ${session.roleTitle || 'the position'} at ${session.companyName || 'this company'}`
    })
  } catch (error) {
    console.error("Start practice error:", error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to start practice session" },
      { status: 500 }
    )
  }
}