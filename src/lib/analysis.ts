import { prisma } from './db'
import { generateMockAnalysis } from './mock-ai'
import { extractKeySkills, validateResumeText } from './resume-parser'
import type { AnalyzeRequest } from '@/types'

export interface AnalysisResult {
  sessionId: string
  fitScore: number
  matchedSkills: string[]
  missingSkills: string[]
  summary: string
  tailoredSummary: string
  tailoredBullets: Array<{
    original: string
    tailored: string
  }>
  interviewQuestions: Array<{
    category: string
    question: string
    difficulty: 'easy' | 'medium' | 'hard'
    hint: string
  }>
  prepPlan: Array<{
    day: number
    title: string
    tasks: string[]
    estimatedMinutes: number
  }>
}

export async function analyzeResumeAndJob(request: AnalyzeRequest): Promise<AnalysisResult> {
  // Validate inputs
  const resumeValidation = validateResumeText(request.resumeText)
  if (!resumeValidation.isValid) {
    throw new Error(`Invalid resume: ${resumeValidation.errors.join(', ')}`)
  }

  const jobValidation = validateResumeText(request.jobDescription)
  if (!jobValidation.isValid) {
    throw new Error(`Invalid job description: ${jobValidation.errors.join(', ')}`)
  }

  // Generate analysis using mock AI
  const analysis = generateMockAnalysis(request)
  
  // Create analysis session in database
  const session = await createAnalysisSession(request, analysis)
  
  return {
    ...analysis,
    sessionId: session.id
  }
}

async function createAnalysisSession(request: AnalyzeRequest, analysis: any) {
  // Create the main session
  const session = await prisma.analysisSession.create({
    data: {
      companyName: request.companyName,
      roleTitle: request.roleTitle,
      resumeText: request.resumeText,
      jobDescription: request.jobDescription,
      fitScore: analysis.fitScore,
      summary: analysis.summary,
      tailoredSummary: analysis.tailoredSummary,
      source: request.source || 'manual',
      status: 'analyzed'
    }
  })

  // Create skill matches
  const skillMatches = [
    ...analysis.matchedSkills.map((skill: string) => ({
      sessionId: session.id,
      skillName: skill,
      type: 'matched' as const,
      weight: Math.floor(Math.random() * 5) + 1,
      category: categorizeSkill(skill)
    })),
    ...analysis.missingSkills.map((skill: string) => ({
      sessionId: session.id,
      skillName: skill,
      type: 'missing' as const,
      weight: Math.floor(Math.random() * 5) + 1,
      category: categorizeSkill(skill)
    }))
  ]

  await prisma.skillMatch.createMany({
    data: skillMatches
  })

  // Create tailored resume bullets
  const resumeBullets = analysis.tailoredBullets.map((bullet: any, index: number) => ({
    sessionId: session.id,
    originalText: bullet.original,
    tailoredText: bullet.tailored,
    impactScore: Math.floor(Math.random() * 5) + 5, // 5-10 score
    sectionName: index < 2 ? 'experience' : 'summary'
  }))

  await prisma.resumeBullet.createMany({
    data: resumeBullets
  })

  // Create interview questions
  const interviewQuestions = analysis.interviewQuestions.map((q: any, index: number) => ({
    sessionId: session.id,
    category: q.category,
    questionText: q.question,
    difficulty: q.difficulty,
    hintText: q.hint,
    orderIndex: index
  }))

  await prisma.interviewQuestion.createMany({
    data: interviewQuestions
  })

  // Create prep plan days
  const prepPlanDays = analysis.prepPlan.map((day: any) => ({
    sessionId: session.id,
    dayNumber: day.day,
    title: day.title,
    tasksJson: JSON.stringify(day.tasks),
    estimatedMinutes: day.estimatedMinutes,
    completed: false
  }))

  await prisma.prepPlanDay.createMany({
    data: prepPlanDays
  })

  return session
}

function categorizeSkill(skill: string): string {
  const categories = {
    frontend: ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript'],
    backend: ['node.js', 'express', 'django', 'flask', 'spring', 'rails', 'php'],
    database: ['postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'oracle'],
    cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes'],
    programming: ['python', 'java', 'c++', 'c#', 'go', 'rust'],
    tools: ['git', 'jenkins', 'webpack', 'babel', 'figma'],
    methodology: ['agile', 'scrum', 'tdd', 'ci/cd', 'devops']
  }

  const lowerSkill = skill.toLowerCase()
  for (const [category, skills] of Object.entries(categories)) {
    if (skills.some(s => lowerSkill.includes(s) || s.includes(lowerSkill))) {
      return category
    }
  }
  
  return 'general'
}

export async function getAnalysisSession(sessionId: string) {
  const session = await prisma.analysisSession.findUnique({
    where: { id: sessionId },
    include: {
      skillMatches: true,
      resumeBullets: true,
      interviewQuestions: {
        orderBy: { orderIndex: 'asc' }
      },
      prepPlanDays: {
        orderBy: { dayNumber: 'asc' }
      },
      practiceSessions: {
        include: {
          practiceTurns: {
            orderBy: { createdAt: 'asc' }
          }
        }
      }
    }
  })

  if (!session) {
    throw new Error('Analysis session not found')
  }

  // Transform prep plan days to include parsed tasks
  const transformedSession = {
    ...session,
    prepPlanDays: session.prepPlanDays.map(day => ({
      ...day,
      tasks: JSON.parse(day.tasksJson)
    })),
    practiceSessions: session.practiceSessions.map(ps => ({
      ...ps,
      practiceTurns: ps.practiceTurns.map(turn => ({
        ...turn,
        feedbackStrengths: JSON.parse(turn.feedbackStrengths),
        feedbackImprovements: JSON.parse(turn.feedbackImprovements)
      }))
    }))
  }

  return transformedSession
}

export async function getAllSessions() {
  const sessions = await prisma.analysisSession.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      companyName: true,
      roleTitle: true,
      fitScore: true,
      createdAt: true,
      status: true
    }
  })

  return sessions
}

export async function updateSessionStatus(sessionId: string, status: string) {
  await prisma.analysisSession.update({
    where: { id: sessionId },
    data: { status }
  })
}

export async function deleteSession(sessionId: string) {
  // Cascading deletes will handle related records
  await prisma.analysisSession.delete({
    where: { id: sessionId }
  })
}

export function calculateOverallScore(session: any): number {
  const weights = {
    fitScore: 0.4,
    skillMatches: 0.3,
    practicePerformance: 0.3
  }

  let overallScore = session.fitScore * weights.fitScore

  // Factor in skill matches
  const totalSkills = session.skillMatches.length
  const matchedSkills = session.skillMatches.filter((s: any) => s.type === 'matched').length
  const skillMatchRatio = totalSkills > 0 ? matchedSkills / totalSkills : 0
  overallScore += skillMatchRatio * 100 * weights.skillMatches

  // Factor in practice performance if available
  if (session.practiceSessions.length > 0) {
    const avgPracticeScore = session.practiceSessions.reduce((sum: number, ps: any) => 
      sum + ps.overallScore, 0) / session.practiceSessions.length
    overallScore += avgPracticeScore * weights.practicePerformance
  }

  return Math.round(Math.min(100, Math.max(0, overallScore)))
}