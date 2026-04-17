import { extractKeywords, calculateSimilarity } from './utils'
import type { AnalyzeRequest, AnalyzeResponse } from '@/types'

export function generateMockAnalysis(request: AnalyzeRequest): AnalyzeResponse {
  const { resumeText, jobDescription, companyName, roleTitle } = request
  
  // Extract keywords from both texts
  const resumeKeywords = new Set(extractKeywords(resumeText))
  const jobKeywords = new Set(extractKeywords(jobDescription))
  
  // Calculate fit score based on keyword overlap
  const similarity = calculateSimilarity(resumeText, jobDescription)
  const fitScore = Math.min(Math.max(Math.round(similarity * 100 + Math.random() * 20), 45), 95)
  
  // Identify matched and missing skills
  const commonKeywords = Array.from(resumeKeywords).filter(keyword => jobKeywords.has(keyword))
  const missingKeywords = Array.from(jobKeywords).filter(keyword => !resumeKeywords.has(keyword))
  
  // Filter to relevant skills
  const techSkills = new Set([
    'react', 'javascript', 'typescript', 'node.js', 'nodejs', 'python', 'java',
    'aws', 'docker', 'kubernetes', 'postgresql', 'mongodb', 'redis', 'graphql',
    'rest', 'api', 'microservices', 'css', 'html', 'vue', 'angular', 'express',
    'django', 'flask', 'sql', 'nosql', 'git', 'github', 'ci/cd', 'jenkins',
    'testing', 'jest', 'cypress', 'agile', 'scrum', 'figma', 'design'
  ])
  
  const matchedSkills = commonKeywords.filter(skill => techSkills.has(skill.toLowerCase())).slice(0, 8)
  const missingSkills = missingKeywords.filter(skill => techSkills.has(skill.toLowerCase())).slice(0, 6)
  
  // Generate summary
  const summary = generateSummary(fitScore, matchedSkills, missingSkills, companyName, roleTitle)
  
  // Generate tailored summary
  const tailoredSummary = generateTailoredSummary(resumeText, jobDescription, matchedSkills)
  
  // Generate tailored bullets
  const tailoredBullets = generateTailoredBullets(resumeText, matchedSkills)
  
  // Generate interview questions
  const interviewQuestions = generateInterviewQuestions(missingSkills, roleTitle || 'Software Developer')
  
  // Generate prep plan
  const prepPlan = generatePrepPlan(missingSkills, companyName, roleTitle)
  
  return {
    sessionId: generateSessionId(),
    fitScore,
    matchedSkills,
    missingSkills,
    summary,
    tailoredSummary,
    tailoredBullets,
    interviewQuestions,
    prepPlan
  }
}

function generateSummary(fitScore: number, matchedSkills: string[], missingSkills: string[], companyName?: string, roleTitle?: string): string {
  const company = companyName || 'the company'
  const role = roleTitle || 'this position'
  
  let summary = `You have a ${getScoreLabel(fitScore)} match for ${role} at ${company}. `
  
  if (matchedSkills.length > 0) {
    summary += `Your experience with ${matchedSkills.slice(0, 3).join(', ')} aligns well with the requirements. `
  }
  
  if (missingSkills.length > 0) {
    summary += `Consider strengthening your knowledge in ${missingSkills.slice(0, 2).join(' and ')} to improve your candidacy.`
  }
  
  return summary
}

function generateTailoredSummary(resumeText: string, jobDescription: string, matchedSkills: string[]): string {
  const experience = extractExperienceYears(resumeText)
  const keySkills = matchedSkills.slice(0, 4).join(', ')
  
  return `Experienced software developer with ${experience}+ years building scalable applications using ${keySkills}. Proven track record in full-stack development with strong technical skills and collaborative approach to delivering high-quality solutions.`
}

function generateTailoredBullets(resumeText: string, matchedSkills: string[]): Array<{ original: string; tailored: string }> {
  const bullets = extractBulletPoints(resumeText)
  
  return bullets.slice(0, 4).map(bullet => ({
    original: bullet,
    tailored: enhanceBullet(bullet, matchedSkills)
  }))
}

function generateInterviewQuestions(missingSkills: string[], roleTitle: string) {
  const questions = [
    {
      category: 'behavioral',
      question: 'Tell me about a challenging project you worked on and how you overcame obstacles.',
      difficulty: 'medium' as const,
      hint: 'Use the STAR method: Situation, Task, Action, Result. Focus on your problem-solving process.'
    },
    {
      category: 'technical',
      question: 'How would you design a scalable web application architecture?',
      difficulty: 'hard' as const,
      hint: 'Consider load balancing, database scaling, caching strategies, and microservices.'
    },
    {
      category: 'role-specific',
      question: `What interests you most about this ${roleTitle.toLowerCase()} position?`,
      difficulty: 'easy' as const,
      hint: 'Connect your career goals with the company\'s mission and the role\'s responsibilities.'
    }
  ]
  
  // Add gap-focused questions based on missing skills
  if (missingSkills.length > 0) {
    questions.push({
      category: 'gap-focused',
      question: `How would you approach learning ${missingSkills[0]} for this role?`,
      difficulty: 'medium' as const,
      hint: 'Show your learning strategy and commitment to growth. Mention specific resources or approaches.'
    })
  }
  
  return questions
}

function generatePrepPlan(missingSkills: string[], companyName?: string, roleTitle?: string) {
  const company = companyName || 'the company'
  
  return [
    {
      day: 1,
      title: 'Company Research & Role Analysis',
      tasks: [
        `Research ${company}'s history, mission, and recent developments`,
        'Study the job description and identify key requirements',
        'Review company engineering blog and tech stack'
      ],
      estimatedMinutes: 90
    },
    {
      day: 2,
      title: 'Technical Skills Review',
      tasks: [
        'Review core programming concepts and best practices',
        'Practice coding problems related to the role',
        'Study system design fundamentals'
      ],
      estimatedMinutes: 120
    },
    {
      day: 3,
      title: 'Gap Analysis & Learning',
      tasks: missingSkills.length > 0 ? [
        `Learn basics of ${missingSkills[0] || 'missing technologies'}`,
        'Complete online tutorials or documentation',
        'Practice explaining new concepts clearly'
      ] : [
        'Deepen knowledge in your strongest areas',
        'Review recent projects and achievements',
        'Prepare technical examples and stories'
      ],
      estimatedMinutes: 100
    },
    {
      day: 4,
      title: 'Behavioral Interview Prep',
      tasks: [
        'Prepare STAR method stories for common questions',
        'Practice explaining technical concepts simply',
        'Review leadership and teamwork examples'
      ],
      estimatedMinutes: 80
    },
    {
      day: 5,
      title: 'Mock Interviews & Practice',
      tasks: [
        'Complete mock interviews using PrepPilot AI',
        'Practice common interview questions for the role',
        'Record yourself answering questions'
      ],
      estimatedMinutes: 90
    },
    {
      day: 6,
      title: 'Final Preparation',
      tasks: [
        'Prepare thoughtful questions for the interviewer',
        'Review all notes and key talking points',
        'Practice your elevator pitch and introduction'
      ],
      estimatedMinutes: 60
    },
    {
      day: 7,
      title: 'Interview Day Ready',
      tasks: [
        'Review logistics and plan arrival time',
        'Do a final review of company and role details',
        'Prepare materials and get a good night\'s sleep'
      ],
      estimatedMinutes: 45
    }
  ]
}

// Helper functions
function getScoreLabel(score: number): string {
  if (score >= 80) return 'strong'
  if (score >= 65) return 'good'
  if (score >= 50) return 'moderate'
  return 'developing'
}

function extractExperienceYears(resumeText: string): number {
  const yearMatches = resumeText.match(/(\d+)\+?\s*years?/gi)
  if (yearMatches) {
    const years = yearMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0'))
    return Math.max(...years)
  }
  return 3 // Default experience
}

function extractBulletPoints(resumeText: string): string[] {
  const bulletRegex = /^[•\-\*]\s+(.+)$/gm
  const matches = resumeText.match(bulletRegex)
  
  if (matches) {
    return matches.map(bullet => bullet.replace(/^[•\-\*]\s+/, '').trim()).slice(0, 8)
  }
  
  // Fallback to sentence extraction
  const sentences = resumeText.split(/[.!?]+/).filter(s => s.trim().length > 20)
  return sentences.slice(0, 6)
}

function enhanceBullet(bullet: string, skills: string[]): string {
  let enhanced = bullet
  
  // Add metrics if missing
  if (!bullet.match(/\d+%|\d+\+|\$\d+/)) {
    const metrics = ['25%', '40%', '50%', '3x', '10,000+', '95%']
    const metric = metrics[Math.floor(Math.random() * metrics.length)]
    enhanced = enhanced.replace(/improved|increased|reduced|optimized|enhanced/i, `$& by ${metric}`)
  }
  
  // Enhance with relevant skills
  const relevantSkill = skills.find(skill => 
    bullet.toLowerCase().includes(skill.toLowerCase()) || 
    Math.random() < 0.3
  )
  
  if (relevantSkill && !bullet.toLowerCase().includes(relevantSkill.toLowerCase())) {
    enhanced += ` using ${relevantSkill}`
  }
  
  return enhanced
}

function generateSessionId(): string {
  return 'mock_' + Math.random().toString(36).substring(2, 15)
}

// Interview practice AI responses
export function generateInterviewResponse(question: string, answer: string, context: { roleTitle?: string, missingSkills?: string[] }) {
  const strengths = []
  const improvements = []
  let score = 50
  
  // Analyze answer length
  if (answer.length < 50) {
    improvements.push('Provide more detailed examples and specific information')
    score -= 15
  } else if (answer.length > 500) {
    improvements.push('Consider being more concise while maintaining key details')
    score -= 5
  } else {
    strengths.push('Good answer length with appropriate detail')
    score += 10
  }
  
  // Check for specific examples
  if (answer.match(/for example|specifically|in my experience|at my previous/i)) {
    strengths.push('Included specific examples and concrete details')
    score += 15
  } else {
    improvements.push('Add specific examples from your experience')
    score -= 10
  }
  
  // Check for metrics or quantifiable results
  if (answer.match(/\d+%|\d+\+|\$\d+|increased|improved|reduced/i)) {
    strengths.push('Mentioned quantifiable results and impact')
    score += 10
  } else {
    improvements.push('Include specific metrics or measurable outcomes when possible')
  }
  
  // Check for structure (STAR method indicators)
  if (answer.match(/situation|task|action|result|challenge|solution/i)) {
    strengths.push('Well-structured response with clear problem-solution format')
    score += 10
  }
  
  score = Math.max(0, Math.min(100, score))
  
  const suggestedAnswer = generateSuggestedAnswer(question, answer, context)
  
  return {
    feedback: {
      strengths: strengths.slice(0, 3),
      improvements: improvements.slice(0, 3),
      suggestedAnswer
    },
    score,
    nextQuestion: generateFollowUpQuestion(question, answer, context)
  }
}

function generateSuggestedAnswer(question: string, answer: string, context: any): string {
  const suggestions = [
    'Consider using the STAR method (Situation, Task, Action, Result) to structure your response more clearly.',
    'Try to include specific metrics or quantifiable outcomes to demonstrate your impact.',
    'Add more context about the challenges you faced and how you overcame them.',
    'Explain how your experience relates directly to the requirements of this role.',
    'Consider mentioning what you learned from this experience and how you\'d apply it here.'
  ]
  
  return suggestions[Math.floor(Math.random() * suggestions.length)]
}

function generateFollowUpQuestion(previousQuestion: string, answer: string, context: any) {
  const followUps = [
    'Can you walk me through a specific technical challenge you mentioned and how you solved it?',
    'How do you stay current with new technologies and industry trends?',
    'Tell me about a time when you had to collaborate with a difficult team member.',
    'What\'s your approach to code reviews and ensuring code quality?',
    'How would you handle a situation where you disagreed with a technical decision?'
  ]
  
  const question = followUps[Math.floor(Math.random() * followUps.length)]
  
  return {
    id: `followup_${Date.now()}`,
    question,
    followUpReason: 'Based on your previous answer, I\'d like to dive deeper into your experience.'
  }
}