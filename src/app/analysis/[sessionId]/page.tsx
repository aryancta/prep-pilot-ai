"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Calendar, 
  Download, 
  MessageSquare, 
  Share2, 
  Target,
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FitScoreCard } from "@/components/fit-score-card"
import { SkillRadarChart } from "@/components/skill-radar-chart"
import { TailoredBullets } from "@/components/tailored-bullets"
import { InterviewQuestionTabs } from "@/components/interview-question-tabs"
import { PrepPlanTimeline } from "@/components/prep-plan-timeline"
import { LoadingState } from "@/components/loading-state"
import type { AnalysisSession } from "@/types"
import { formatDate, formatDuration } from "@/lib/utils"
import { toast } from "sonner"

export default function AnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<AnalysisSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sessionId = params.sessionId as string

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch(`/api/sessions/${sessionId}`)
        
        if (!response.ok) {
          throw new Error(response.status === 404 ? "Session not found" : "Failed to load analysis")
        }
        
        const data = await response.json()
        setSession(data.session)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analysis")
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchSession()
    }
  }, [sessionId])

  const handleStartPractice = async () => {
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
      router.push(`/practice/${data.practiceId}`)
    } catch (err) {
      toast.error("Failed to start practice session")
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    } catch {
      toast.error("Failed to copy link")
    }
  }

  if (loading) return <LoadingState />

  if (error || !session) {
    return (
      <div className="container max-w-4xl py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Analysis Not Found</h2>
            <p className="text-muted-foreground mb-6">
              {error || "The requested analysis session could not be found."}
            </p>
            <Button onClick={() => router.push("/")}>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const matchedSkills = session.skillMatches?.filter(s => s.type === 'matched') || []
  const missingSkills = session.skillMatches?.filter(s => s.type === 'missing') || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-7xl py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {session.roleTitle || "Position"} at{" "}
                <span className="text-gradient">{session.companyName || "Company"}</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Analysis completed {formatDate(session.createdAt)}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleStartPractice} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Practice
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8">
          {/* Top Row - Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fit Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FitScoreCard score={session.fitScore} animated />
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Matched Skills</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      {matchedSkills.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Skills to Learn</span>
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                      {missingSkills.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Prep Time</span>
                    <span className="text-sm font-medium">
                      {formatDuration(session.prepPlanDays?.reduce((sum, day) => sum + day.estimatedMinutes, 0) || 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analysis</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Resume Optimization</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Interview Practice</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <Progress value={66} className="h-2" />
                  <p className="text-xs text-muted-foreground">2 of 3 steps completed</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <SkillRadarChart matchedSkills={matchedSkills} missingSkills={missingSkills} />
            </motion.div>

            {/* Skills List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Skill Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your technical alignment with the job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Matched Skills */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Matched Skills ({matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchedSkills.slice(0, 12).map((skill) => (
                        <Badge key={skill.id} className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {skill.skillName}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {missingSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-amber-600 dark:text-amber-400">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Skills to Develop ({missingSkills.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {missingSkills.slice(0, 8).map((skill) => (
                          <Badge key={skill.id} variant="outline" className="border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-300">
                            {skill.skillName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Resume Optimization */}
          {session.resumeBullets && session.resumeBullets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TailoredBullets 
                bullets={session.resumeBullets}
                onCopy={(text) => {
                  navigator.clipboard.writeText(text)
                  toast.success("Copied to clipboard!")
                }}
              />
            </motion.div>
          )}

          {/* Interview Questions */}
          {session.interviewQuestions && session.interviewQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <InterviewQuestionTabs 
                questions={session.interviewQuestions}
                onStartPractice={handleStartPractice}
              />
            </motion.div>
          )}

          {/* Prep Plan */}
          {session.prepPlanDays && session.prepPlanDays.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <PrepPlanTimeline 
                days={session.prepPlanDays}
                onToggleComplete={(dayId) => {
                  // Update completion status
                  toast.success("Progress updated!")
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}