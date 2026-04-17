import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { practiceAnswerRequestSchema } from "@/lib/validators"
import { generateInterviewResponse } from "@/lib/mock-ai"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { answerText } = practiceAnswerRequestSchema.parse(body)
    
    // Get the practice session
    const practiceSession = await prisma.practiceSession.findUnique({
      where: { id: params.id },
      include: {
        session: {
          include: {
            interviewQuestions: {
              orderBy: { orderIndex: 'asc' }
            }
          }
        }
      }
    })
    
    if (!practiceSession) {
      return NextResponse.json(
        { error: "Practice session not found" },
        { status: 404 }
      )
    }
    
    if (practiceSession.status !== 'active') {
      return NextResponse.json(
        { error: "Practice session is not active" },
        { status: 400 }
      )
    }
    
    const questions = practiceSession.session.interviewQuestions
    const currentQuestion = questions[practiceSession.currentQuestionIndex]
    
    if (!currentQuestion) {
      return NextResponse.json(
        { error: "No current question found" },
        { status: 400 }
      )
    }
    
    // Generate AI feedback
    const context = {
      roleTitle: practiceSession.session.roleTitle || undefined,
      companyName: practiceSession.session.companyName || undefined
    }
    
    const aiResponse = generateInterviewResponse(
      currentQuestion.questionText,
      answerText,
      context
    )
    
    // Create practice turn record
    await prisma.practiceTurn.create({
      data: {
        practiceSessionId: practiceSession.id,
        questionText: currentQuestion.questionText,
        answerText: answerText,
        feedbackStrengths: JSON.stringify(aiResponse.feedback.strengths),
        feedbackImprovements: JSON.stringify(aiResponse.feedback.improvements),
        suggestedAnswer: aiResponse.feedback.suggestedAnswer,
        score: aiResponse.score
      }
    })
    
    // Move to next question or end session
    const nextQuestionIndex = practiceSession.currentQuestionIndex + 1
    const isLastQuestion = nextQuestionIndex >= questions.length
    
    if (isLastQuestion) {
      // End the practice session
      await prisma.practiceSession.update({
        where: { id: practiceSession.id },
        data: {
          status: 'completed',
          endedAt: new Date(),
          currentQuestionIndex: nextQuestionIndex,
          overallScore: aiResponse.score // Simplified for demo
        }
      })
      
      return NextResponse.json({
        feedback: aiResponse.feedback,
        score: aiResponse.score,
        sessionComplete: true
      })
    } else {
      // Update to next question
      await prisma.practiceSession.update({
        where: { id: practiceSession.id },
        data: {
          currentQuestionIndex: nextQuestionIndex
        }
      })
      
      const nextQuestion = questions[nextQuestionIndex]
      
      return NextResponse.json({
        feedback: aiResponse.feedback,
        score: aiResponse.score,
        nextQuestion: {
          id: nextQuestion.id,
          question: nextQuestion.questionText,
          followUpReason: "Let's continue with the next question."
        }
      })
    }
  } catch (error) {
    console.error("Practice answer error:", error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to process answer" },
      { status: 500 }
    )
  }
}