import { z } from 'zod'

export const analyzeRequestSchema = z.object({
  resumeText: z.string().min(50, 'Resume must be at least 50 characters long'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters long'),
  companyName: z.string().optional(),
  roleTitle: z.string().optional(),
  source: z.enum(['paste', 'upload', 'sample', 'demo']).optional().default('paste')
})

export const practiceStartRequestSchema = z.object({
  sessionId: z.string().cuid()
})

export const practiceAnswerRequestSchema = z.object({
  answerText: z.string().min(10, 'Answer must be at least 10 characters long'),
  questionId: z.string().optional()
})

export const exportPdfRequestSchema = z.object({
  sessionId: z.string().cuid()
})

export const calendarExportRequestSchema = z.object({
  sessionId: z.string().cuid()
})

export const onboardingFormSchema = z.object({
  resumeText: z.string().min(50, 'Resume must be at least 50 characters long'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters long'),
  companyName: z.string().min(1, 'Company name is required'),
  roleTitle: z.string().min(1, 'Role title is required'),
  source: z.enum(['paste', 'upload', 'sample']).default('paste')
})

export const settingsFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  defaultRole: z.string().optional(),
  defaultCompany: z.string().optional(),
  calendarIntegrationEnabled: z.boolean().default(false)
})

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>
export type PracticeStartRequest = z.infer<typeof practiceStartRequestSchema>
export type PracticeAnswerRequest = z.infer<typeof practiceAnswerRequestSchema>
export type ExportPdfRequest = z.infer<typeof exportPdfRequestSchema>
export type CalendarExportRequest = z.infer<typeof calendarExportRequestSchema>
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>
export type SettingsFormData = z.infer<typeof settingsFormSchema>