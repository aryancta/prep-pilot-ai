"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  User,
  Bot,
  Lightbulb,
  RotateCcw
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LoadingState } from "@/components/loading-state"
import { MockInterviewChat } from "@/components/mock-interview-chat"
import type { PracticeSession, PracticeTurn } from "@/types"
import { formatDateTime } from "@/lib/utils"
import { toast } from "sonner"

interface PracticeState {
  practiceId: string
  sessionTitle: string
  currentQuestion: string
  isComplete: boolean
  totalQuestions: number
  currentQuestionIndex: number
}

export default function PracticePage() {
  const params = useParams()
  const router = useRouter()
  
  const [practice, setPractice] = useState<PracticeState | null>(null)
  const [turns, setTurns] = useState<PracticeTurn[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [feedback, setFeedback] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const sessionId = params.sessionId as string
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function startPractice() {
      try {
        const response = await fetch("/api/practice/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId })
        })

        if (!response.ok) {
          throw new Error("Failed to start practice session")
        }

        const data = await response.json()
        setPractice({
          practiceId: data.practiceId,
          sessionTitle: data.context,
          currentQuestion: data.firstQuestion,
          isComplete: false,
          totalQuestions: 5, // Assuming 5 questions for demo
          currentQuestionIndex: 0
        })
      } catch (error) {
        console.error("Practice start error:", error)
        toast.error("Failed to start practice session")
        router.push(`/analysis/${sessionId}`)
      } finally {
        setLoading(false)
      }
    }

    startPractice()
  }, [sessionId, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [turns, feedback])

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim() || !practice || submitting) return

    setSubmitting(true)
    setShowFeedback(false)

    try {
      const response = await fetch(`/api/practice/${practice.practiceId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answerText: currentAnswer })
      })

      if (!response.ok) {
        throw new Error("Failed to submit answer")
      }

      const data = await response.json()

      // Add user turn
      const userTurn: PracticeTurn = {
        id: `user-${Date.now()}`,
        practiceSessionId: practice.practiceId,
        questionText: practice.currentQuestion,
        answerText: currentAnswer,
        feedbackStrengths: [],
        feedbackImprovements: [],
        score: 0,
        createdAt: new Date()
      }

      setTurns(prev => [...prev, userTurn])
      setFeedback(data.feedback)
      setShowFeedback(true)
      setCurrentAnswer("")

      // Check if session is complete
      if (data.sessionComplete) {
        setPractice(prev => prev ? { ...prev, isComplete: true } : null)
      } else if (data.nextQuestion) {
        setTimeout(() => {
          setPractice(prev => prev ? {
            ...prev,
            currentQuestion: data.nextQuestion.question,
            currentQuestionIndex: prev.currentQuestionIndex + 1
          } : null)
          setShowFeedback(false)
          setFeedback(null)
        }, 3000)
      }

    } catch (error) {
      console.error("Submit answer error:", error)
      toast.error("Failed to submit answer")
    } finally {
      setSubmitting(false)
    }
  }

  const handleRestart = () => {
    router.push(`/analysis/${sessionId}`)
  }

  if (loading) return <LoadingState />

  if (!practice) {
    return (
      <div className="container max-w-4xl py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Session Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Unable to start the practice session. Please try again.
            </p>
            <Button onClick={() => router.push(`/analysis/${sessionId}`)}>
              Return to Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((practice.currentQuestionIndex + 1) / practice.totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-6xl py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/analysis/${sessionId}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Analysis
            </Button>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                <Clock className="h-3 w-3 mr-1" />
                Live Practice
              </Badge>
              
              {practice.isComplete && (
                <Button onClick={handleRestart} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Practice Again
                </Button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Mock Interview Practice</h1>
            <p className="text-muted-foreground">{practice.sessionTitle}</p>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {practice.currentQuestionIndex + 1} of {practice.totalQuestions}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Interview Conversation
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-hidden p-0">
                <div className="h-full flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Interviewer greeting */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-muted rounded-lg p-3 mb-2">
                          <p className="text-sm">
                            Hello! I&apos;m your AI interview coach. I&apos;ll ask you questions similar to what you might encounter in a real interview. 
                            Take your time to think through your answers, and I&apos;ll provide feedback to help you improve.
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">AI Interviewer</p>
                      </div>
                    </motion.div>

                    {/* Current question */}
                    {!practice.isComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3 mb-2">
                            <p className="text-sm">{practice.currentQuestion}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">AI Interviewer</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Previous turns */}
                    {turns.map((turn) => (
                      <motion.div
                        key={turn.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-end"
                      >
                        <div className="flex-1 max-w-[80%]">
                          <div className="bg-primary text-primary-foreground rounded-lg p-3 mb-2">
                            <p className="text-sm">{turn.answerText}</p>
                          </div>
                          <p className="text-xs text-muted-foreground text-right">You</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </motion.div>
                    ))}

                    {/* Feedback */}
                    <AnimatePresence>
                      {showFeedback && feedback && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-2">
                              <div className="space-y-3">
                                <div>
                                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-1 flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Strengths
                                  </h5>
                                  <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                                    {feedback.strengths.map((strength: string, i: number) => (
                                      <li key={i}>• {strength}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    Areas for Improvement
                                  </h5>
                                  <ul className="text-sm text-amber-600 dark:text-amber-300 space-y-1">
                                    {feedback.improvements.map((improvement: string, i: number) => (
                                      <li key={i}>• {improvement}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {feedback.suggestedAnswer && (
                                  <div>
                                    <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1">
                                      <Lightbulb className="h-3 w-3" />
                                      Suggestion
                                    </h5>
                                    <p className="text-sm text-blue-600 dark:text-blue-300">
                                      {feedback.suggestedAnswer}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">AI Interviewer • Feedback</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Completion message */}
                    {practice.isComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-2">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                              🎉 Practice Session Complete!
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Great job! You&apos;ve completed the mock interview. Review the feedback above and consider 
                              practicing again to further improve your responses.
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">AI Interviewer</p>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input area */}
                  {!practice.isComplete && !showFeedback && (
                    <div className="border-t p-4">
                      <div className="space-y-3">
                        <Textarea
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          placeholder="Type your answer here..."
                          className="min-h-[100px] resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                              handleSubmitAnswer()
                            }
                          }}
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            Press Cmd+Enter to submit
                          </p>
                          <Button
                            onClick={handleSubmitAnswer}
                            disabled={!currentAnswer.trim() || submitting}
                            className="flex items-center gap-2"
                          >
                            {submitting ? (
                              <>Analyzing...</>
                            ) : (
                              <>
                                Submit Answer
                                <Send className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Practice Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    {practice.currentQuestionIndex + 1} / {practice.totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground">Questions Completed</p>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Response Time</span>
                    <span className="font-medium">2m 15s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Started</span>
                    <span className="font-medium">{formatDateTime(new Date())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-500">•</span>
                    Use the STAR method (Situation, Task, Action, Result)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">•</span>
                    Include specific metrics when possible
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">•</span>
                    Connect your experience to the role
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    Ask clarifying questions if needed
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}