export interface AnalysisSession {
  id: string
  createdAt: Date
  updatedAt: Date
  companyName?: string
  roleTitle?: string
  resumeText: string
  jobDescription: string
  fitScore: number
  summary: string
  tailoredSummary: string
  source: string
  status: string
  skillMatches?: SkillMatch[]
  resumeBullets?: ResumeBullet[]
  interviewQuestions?: InterviewQuestion[]
  prepPlanDays?: PrepPlanDay[]
  practiceSessions?: PracticeSession[]
}

export interface SkillMatch {
  id: string
  sessionId: string
  skillName: string
  type: 'matched' | 'missing'
  weight: number
  category: string
}

export interface ResumeBullet {
  id: string
  sessionId: string
  originalText: string
  tailoredText: string
  impactScore: number
  sectionName: string
}

export interface InterviewQuestion {
  id: string
  sessionId: string
  category: 'behavioral' | 'technical' | 'role-specific' | 'gap-focused'
  questionText: string
  difficulty: 'easy' | 'medium' | 'hard'
  hintText?: string
  orderIndex: number
}

export interface PrepPlanDay {
  id: string
  sessionId: string
  dayNumber: number
  title: string
  tasks: string[]
  estimatedMinutes: number
  completed: boolean
}

export interface PracticeSession {
  id: string
  sessionId: string
  startedAt: Date
  endedAt?: Date
  currentQuestionIndex: number
  overallScore: number
  status: 'active' | 'completed'
  practiceTurns?: PracticeTurn[]
}

export interface PracticeTurn {
  id: string
  practiceSessionId: string
  questionText: string
  answerText: string
  feedbackStrengths: string[]
  feedbackImprovements: string[]
  suggestedAnswer?: string
  score: number
  createdAt: Date
}

export interface UserPreference {
  id: string
  theme: 'light' | 'dark' | 'system'
  defaultRole?: string
  defaultCompany?: string
  calendarIntegrationEnabled: boolean
  createdAt: Date
}

// API Types
export interface AnalyzeRequest {
  resumeText: string
  jobDescription: string
  companyName?: string
  roleTitle?: string
  source?: string
}

export interface AnalyzeResponse {
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

export interface SessionsResponse {
  sessions: Array<{
    id: string
    roleTitle?: string
    companyName?: string
    fitScore: number
    createdAt: string
    status: string
  }>
}

export interface PracticeStartRequest {
  sessionId: string
}

export interface PracticeStartResponse {
  practiceId: string
  firstQuestion: string
  context: string
}

export interface PracticeAnswerRequest {
  answerText: string
  questionId: string
}

export interface PracticeAnswerResponse {
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestedAnswer: string
  }
  nextQuestion?: {
    id: string
    question: string
    followUpReason: string
  }
  score: number
}

export interface ExportPdfRequest {
  sessionId: string
}

export interface ExportPdfResponse {
  downloadUrl: string
}

export interface CalendarExportRequest {
  sessionId: string
}

export interface CalendarExportResponse {
  icsUrl: string
}

// UI Component Types
export interface FitScoreCardProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export interface SkillRadarChartProps {
  matchedSkills: SkillMatch[]
  missingSkills: SkillMatch[]
}

export interface TailoredBulletsProps {
  bullets: ResumeBullet[]
  onCopy?: (text: string) => void
}

export interface InterviewQuestionTabsProps {
  questions: InterviewQuestion[]
  onStartPractice?: () => void
}

export interface MockInterviewChatProps {
  practiceSession: PracticeSession
  onAnswer: (answer: string) => void
  isLoading?: boolean
}

export interface PrepPlanTimelineProps {
  days: PrepPlanDay[]
  onToggleComplete?: (dayId: string) => void
}

export interface SessionCardProps {
  session: AnalysisSession
  onClick?: () => void
  onDelete?: () => void
}

export interface SampleDataPickerProps {
  onLoadSample: (resumeText: string, jobDescription: string) => void
}

// Form Types
export interface OnboardingFormData {
  resumeText: string
  jobDescription: string
  companyName: string
  roleTitle: string
  source: 'paste' | 'upload' | 'sample'
}

export interface SettingsFormData {
  theme: 'light' | 'dark' | 'system'
  defaultRole: string
  defaultCompany: string
  calendarIntegrationEnabled: boolean
}

// Error Types
export interface ApiError {
  message: string
  code?: string
  details?: any
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Theme Types
export type Theme = 'light' | 'dark' | 'system'