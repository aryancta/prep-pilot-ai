// Resume parsing utilities for PDF and DOCX files
// Note: For this hackathon demo, we'll implement basic parsing with fallbacks
// In production, you'd want more robust parsing with libraries like pdf2pic, tesseract, etc.

export interface ParsedResume {
  text: string
  sections: {
    contact?: string
    summary?: string
    experience?: string[]
    education?: string
    skills?: string[]
  }
  metadata: {
    fileName: string
    fileType: string
    wordCount: number
    parsedAt: Date
  }
}

export async function parseResumeFile(file: File): Promise<ParsedResume> {
  try {
    if (file.type === 'application/pdf') {
      return await parsePDF(file)
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               file.name.endsWith('.docx')) {
      return await parseDOCX(file)
    } else if (file.type === 'text/plain') {
      return await parseText(file)
    } else {
      throw new Error(`Unsupported file type: ${file.type}`)
    }
  } catch (error) {
    console.error('Resume parsing error:', error)
    throw new Error('Failed to parse resume file. Please try pasting the text directly.')
  }
}

async function parsePDF(file: File): Promise<ParsedResume> {
  // For this demo, we'll return a mock parsed result
  // In production, you would use pdf-parse or similar library
  
  const mockText = `John Smith
Senior Software Developer
john.smith@email.com | (555) 123-4567

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years building web applications using React, Node.js, and Python. Strong background in full-stack development, database design, and cloud technologies.

EXPERIENCE
Software Developer | ABC Company | 2021-2024
• Developed responsive web applications using React and TypeScript
• Built RESTful APIs with Node.js and Express
• Collaborated with cross-functional teams in Agile environment
• Optimized database queries improving performance by 40%

SKILLS
• Programming: JavaScript, Python, TypeScript, Java
• Frameworks: React, Node.js, Express, Django
• Databases: PostgreSQL, MongoDB, Redis
• Tools: Git, Docker, AWS, Jenkins`

  return {
    text: mockText,
    sections: extractSections(mockText),
    metadata: {
      fileName: file.name,
      fileType: 'PDF',
      wordCount: mockText.split(' ').length,
      parsedAt: new Date()
    }
  }
}

async function parseDOCX(file: File): Promise<ParsedResume> {
  // For this demo, we'll return a mock parsed result
  // In production, you would use mammoth.js or similar library
  
  const mockText = `Sarah Johnson
Full Stack Developer
sarah.johnson@email.com | (555) 987-6543

PROFESSIONAL SUMMARY
Passionate full stack developer with 3+ years of experience building modern web applications using React, Node.js, and cloud technologies.

EXPERIENCE
Full Stack Developer | InnovateTech Solutions | 2022-2024
• Developed and maintained 5+ production web applications
• Built RESTful APIs serving 50,000+ daily users
• Implemented automated testing achieving 90% coverage

TECHNICAL SKILLS
• Frontend: React, Vue.js, TypeScript, HTML5, CSS3
• Backend: Node.js, Express, Python, Django
• Database: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, CI/CD`

  return {
    text: mockText,
    sections: extractSections(mockText),
    metadata: {
      fileName: file.name,
      fileType: 'DOCX',
      wordCount: mockText.split(' ').length,
      parsedAt: new Date()
    }
  }
}

async function parseText(file: File): Promise<ParsedResume> {
  const text = await file.text()
  
  return {
    text,
    sections: extractSections(text),
    metadata: {
      fileName: file.name,
      fileType: 'Text',
      wordCount: text.split(' ').length,
      parsedAt: new Date()
    }
  }
}

function extractSections(text: string) {
  const sections: ParsedResume['sections'] = {}
  
  // Extract contact information
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
  const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g)
  if (emailMatch || phoneMatch) {
    sections.contact = [emailMatch?.[0], phoneMatch?.[0]].filter(Boolean).join(' | ')
  }
  
  // Extract summary section
  const summaryMatch = text.match(/(?:SUMMARY|PROFESSIONAL SUMMARY|OBJECTIVE|ABOUT|PROFILE)(.*?)(?=\n[A-Z]{2,}|\n\n|$)/i)
  if (summaryMatch) {
    sections.summary = summaryMatch[1].trim()
  }
  
  // Extract experience bullets
  const experienceSection = text.match(/(?:EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT)(.*?)(?=\n[A-Z]{2,}|\n\n|$)/i)
  if (experienceSection) {
    const bullets = experienceSection[1].match(/^[•\-\*]\s+(.+)$/gm)
    if (bullets) {
      sections.experience = bullets.map(bullet => bullet.replace(/^[•\-\*]\s+/, '').trim())
    }
  }
  
  // Extract education
  const educationMatch = text.match(/(?:EDUCATION|ACADEMIC)(.*?)(?=\n[A-Z]{2,}|\n\n|$)/i)
  if (educationMatch) {
    sections.education = educationMatch[1].trim()
  }
  
  // Extract skills
  const skillsSection = text.match(/(?:SKILLS|TECHNICAL SKILLS|TECHNOLOGIES|COMPETENCIES)(.*?)(?=\n[A-Z]{2,}|\n\n|$)/i)
  if (skillsSection) {
    // Extract individual skills from bullet points or comma-separated lists
    const skillText = skillsSection[1]
    const skillBullets = skillText.match(/^[•\-\*]\s+(.+)$/gm) || []
    const commaSeparated = skillText.split(/[,;\n]/).map(s => s.trim()).filter(s => s.length > 0)
    
    sections.skills = [
      ...skillBullets.map(bullet => bullet.replace(/^[•\-\*]\s+/, '').trim()),
      ...commaSeparated.filter(skill => !skillBullets.some(bullet => bullet.includes(skill)))
    ].slice(0, 20) // Limit to 20 skills
  }
  
  return sections
}

export function validateResumeText(text: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!text || text.trim().length < 50) {
    errors.push('Resume must be at least 50 characters long')
  }
  
  if (text.length > 20000) {
    errors.push('Resume is too long (maximum 20,000 characters)')
  }
  
  // Check for basic resume sections
  const hasContact = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text)
  if (!hasContact) {
    errors.push('Resume should include contact information (email address)')
  }
  
  const hasExperience = /(?:EXPERIENCE|WORK|EMPLOYMENT|PROFESSIONAL)/i.test(text)
  if (!hasExperience) {
    errors.push('Resume should include work experience section')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function extractKeySkills(resumeText: string): string[] {
  const skillKeywords = [
    // Programming Languages
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin',
    
    // Frontend
    'react', 'vue', 'angular', 'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap', 'jquery',
    
    // Backend
    'node.js', 'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'asp.net', 'fastapi',
    
    // Databases
    'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'oracle', 'cassandra', 'elasticsearch',
    
    // Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'gitlab', 'github', 'terraform',
    
    // Tools & Frameworks
    'git', 'webpack', 'babel', 'jest', 'cypress', 'selenium', 'figma', 'sketch', 'photoshop',
    
    // Methodologies
    'agile', 'scrum', 'kanban', 'tdd', 'bdd', 'ci/cd', 'devops', 'microservices', 'rest', 'graphql'
  ]
  
  const text = resumeText.toLowerCase()
  const foundSkills = skillKeywords.filter(skill => 
    text.includes(skill.toLowerCase()) || 
    text.includes(skill.replace('.', '')) ||
    text.includes(skill.replace('-', ' '))
  )
  
  return Array.from(new Set(foundSkills)).slice(0, 15) // Return unique skills, max 15
}