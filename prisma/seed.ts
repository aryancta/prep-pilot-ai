import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample analysis session
  const sampleSession = await prisma.analysisSession.create({
    data: {
      companyName: 'TechCorp Inc.',
      roleTitle: 'Senior Software Engineer',
      resumeText: `John Smith
Senior Software Developer
Email: john.smith@email.com | Phone: (555) 123-4567

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years building web applications using React, Node.js, and Python. Strong background in full-stack development, database design, and cloud technologies.

EXPERIENCE
Software Developer | ABC Company | 2021-2024
• Developed responsive web applications using React and TypeScript
• Built RESTful APIs with Node.js and Express
• Collaborated with cross-functional teams in Agile environment
• Optimized database queries improving performance by 40%

Junior Developer | XYZ Startup | 2019-2021
• Created user interfaces with HTML, CSS, and JavaScript
• Implemented automated testing with Jest and Cypress
• Participated in code reviews and documentation

EDUCATION
Bachelor of Science in Computer Science | State University | 2019

SKILLS
• Programming: JavaScript, Python, TypeScript, Java
• Frameworks: React, Node.js, Express, Django
• Databases: PostgreSQL, MongoDB, Redis
• Tools: Git, Docker, AWS, Jenkins`,
      jobDescription: `Senior Software Engineer - TechCorp Inc.

We are seeking a Senior Software Engineer to join our growing engineering team. The ideal candidate will have strong experience with modern web technologies and a passion for building scalable, high-performance applications.

RESPONSIBILITIES:
• Design and develop scalable web applications using React, TypeScript, and Node.js
• Build and maintain microservices architecture
• Collaborate with product managers, designers, and other engineers
• Mentor junior developers and lead technical discussions
• Implement automated testing and CI/CD pipelines
• Work with cloud platforms (AWS, GCP) for deployment and scaling

REQUIRED QUALIFICATIONS:
• 5+ years of software development experience
• Strong proficiency in JavaScript/TypeScript, React, and Node.js
• Experience with database design (PostgreSQL, MongoDB)
• Knowledge of microservices architecture and API design
• Experience with cloud platforms (AWS preferred)
• Strong problem-solving skills and attention to detail
• Excellent communication and teamwork skills

PREFERRED QUALIFICATIONS:
• Experience with Kubernetes and Docker
• Knowledge of machine learning or data science
• Previous experience in a senior or lead role
• Open source contributions
• Experience with GraphQL

BENEFITS:
• Competitive salary and equity
• Health, dental, and vision insurance
• 401k matching
• Flexible work arrangements
• Professional development budget`,
      fitScore: 78,
      summary: 'Strong match for the Senior Software Engineer position with good technical alignment in React, Node.js, and database experience. Some gaps in microservices architecture and cloud platform leadership experience.',
      tailoredSummary: 'Experienced Senior Software Engineer with 5+ years building scalable web applications using React, Node.js, and TypeScript. Proven track record in full-stack development, database optimization, and cloud technologies with strong collaboration skills in Agile environments.',
      source: 'demo',
      status: 'analyzed'
    }
  })

  // Create skill matches
  const skillMatches = [
    { skillName: 'React', type: 'matched', weight: 5, category: 'frontend' },
    { skillName: 'Node.js', type: 'matched', weight: 5, category: 'backend' },
    { skillName: 'TypeScript', type: 'matched', weight: 4, category: 'programming' },
    { skillName: 'JavaScript', type: 'matched', weight: 5, category: 'programming' },
    { skillName: 'PostgreSQL', type: 'matched', weight: 4, category: 'database' },
    { skillName: 'MongoDB', type: 'matched', weight: 3, category: 'database' },
    { skillName: 'AWS', type: 'matched', weight: 2, category: 'cloud' },
    { skillName: 'Microservices Architecture', type: 'missing', weight: 5, category: 'architecture' },
    { skillName: 'Kubernetes', type: 'missing', weight: 4, category: 'devops' },
    { skillName: 'GraphQL', type: 'missing', weight: 3, category: 'api' },
    { skillName: 'Machine Learning', type: 'missing', weight: 2, category: 'ai' }
  ]

  for (const skill of skillMatches) {
    await prisma.skillMatch.create({
      data: {
        sessionId: sampleSession.id,
        ...skill
      }
    })
  }

  // Create tailored resume bullets
  const resumeBullets = [
    {
      originalText: 'Developed responsive web applications using React and TypeScript',
      tailoredText: 'Architected and developed scalable web applications using React, TypeScript, and modern frontend best practices, serving 10,000+ daily active users',
      impactScore: 8,
      sectionName: 'experience'
    },
    {
      originalText: 'Built RESTful APIs with Node.js and Express',
      tailoredText: 'Designed and implemented high-performance RESTful APIs and microservices using Node.js and Express, supporting 1M+ API calls per day',
      impactScore: 9,
      sectionName: 'experience'
    },
    {
      originalText: 'Optimized database queries improving performance by 40%',
      tailoredText: 'Optimized complex PostgreSQL queries and implemented caching strategies, improving application performance by 40% and reducing server costs by 25%',
      impactScore: 9,
      sectionName: 'experience'
    }
  ]

  for (const bullet of resumeBullets) {
    await prisma.resumeBullet.create({
      data: {
        sessionId: sampleSession.id,
        ...bullet
      }
    })
  }

  // Create interview questions
  const interviewQuestions = [
    {
      category: 'technical',
      questionText: 'How would you design a microservices architecture for a large-scale e-commerce platform?',
      difficulty: 'hard',
      hintText: 'Consider service boundaries, data consistency, communication patterns, and deployment strategies.',
      orderIndex: 1
    },
    {
      category: 'behavioral',
      questionText: 'Tell me about a time when you had to mentor a junior developer. How did you approach it?',
      difficulty: 'medium',
      hintText: 'Use the STAR method: Situation, Task, Action, Result. Focus on your leadership and communication skills.',
      orderIndex: 2
    },
    {
      category: 'role-specific',
      questionText: 'Explain the trade-offs between REST and GraphQL for our API design.',
      difficulty: 'medium',
      hintText: 'Discuss performance, flexibility, caching, and team expertise considerations.',
      orderIndex: 3
    },
    {
      category: 'gap-focused',
      questionText: 'You mentioned experience with AWS. How would you approach migrating our applications to a Kubernetes-based infrastructure?',
      difficulty: 'hard',
      hintText: 'Show willingness to learn and discuss your approach to tackling new technologies.',
      orderIndex: 4
    }
  ]

  for (const question of interviewQuestions) {
    await prisma.interviewQuestion.create({
      data: {
        sessionId: sampleSession.id,
        ...question
      }
    })
  }

  // Create 7-day prep plan
  const prepPlanDays = [
    {
      dayNumber: 1,
      title: 'Research & Company Deep-dive',
      tasksJson: JSON.stringify([
        'Research TechCorp Inc. history, mission, and recent news',
        'Study their tech stack and engineering blog posts',
        'Review the job description and highlight key requirements'
      ]),
      estimatedMinutes: 90
    },
    {
      dayNumber: 2,
      title: 'Microservices Architecture Study',
      tasksJson: JSON.stringify([
        'Learn microservices design patterns and best practices',
        'Study service discovery, API gateways, and data consistency',
        'Practice explaining microservices trade-offs'
      ]),
      estimatedMinutes: 120
    },
    {
      dayNumber: 3,
      title: 'System Design Practice',
      tasksJson: JSON.stringify([
        'Practice designing scalable web applications',
        'Review load balancing, caching, and database scaling',
        'Prepare for system design interview questions'
      ]),
      estimatedMinutes: 120
    },
    {
      dayNumber: 4,
      title: 'Technical Skills Review',
      tasksJson: JSON.stringify([
        'Review advanced React patterns and performance optimization',
        'Practice Node.js backend architecture questions',
        'Study Kubernetes basics and container orchestration'
      ]),
      estimatedMinutes: 100
    },
    {
      dayNumber: 5,
      title: 'Behavioral Interview Preparation',
      tasksJson: JSON.stringify([
        'Prepare STAR method stories for leadership examples',
        'Practice explaining complex technical concepts simply',
        'Review team collaboration and mentoring experiences'
      ]),
      estimatedMinutes: 80
    },
    {
      dayNumber: 6,
      title: 'Mock Interviews & Questions',
      tasksJson: JSON.stringify([
        'Complete mock interviews using PrepPilot AI',
        'Practice common senior engineer interview questions',
        'Prepare thoughtful questions to ask the interviewer'
      ]),
      estimatedMinutes: 90
    },
    {
      dayNumber: 7,
      title: 'Final Review & Logistics',
      tasksJson: JSON.stringify([
        'Review all notes and key talking points',
        'Plan interview day logistics and materials',
        'Do a final practice run of your elevator pitch'
      ]),
      estimatedMinutes: 60
    }
  ]

  for (const day of prepPlanDays) {
    await prisma.prepPlanDay.create({
      data: {
        sessionId: sampleSession.id,
        ...day
      }
    })
  }

  // Create sample practice session
  const practiceSession = await prisma.practiceSession.create({
    data: {
      sessionId: sampleSession.id,
      currentQuestionIndex: 2,
      overallScore: 75,
      status: 'completed',
      endedAt: new Date()
    }
  })

  // Create sample practice turns
  const practiceTurns = [
    {
      questionText: 'Tell me about your experience with React and how you\'ve used it in production applications.',
      answerText: 'I have been working with React for about 4 years now. In my current role at ABC Company, I built several production applications using React with TypeScript. One major project was a customer dashboard that serves over 5,000 users daily. I implemented features like real-time notifications, complex data visualization, and optimized performance using React.memo and useMemo hooks.',
      feedbackStrengths: JSON.stringify([
        'Good specific examples with metrics',
        'Mentioned performance optimization techniques',
        'Clear timeline of experience'
      ]),
      feedbackImprovements: JSON.stringify([
        'Could elaborate on specific challenges overcome',
        'Consider mentioning testing strategies',
        'Add more details about team collaboration'
      ]),
      suggestedAnswer: 'Consider expanding on the technical challenges you faced and how you solved them. For example, mention specific performance bottlenecks you identified and the impact of your optimizations.',
      score: 8
    },
    {
      questionText: 'How would you approach learning Kubernetes for this role, given that it\'s a new technology for you?',
      answerText: 'I would start by taking online courses and reading the official Kubernetes documentation. I\'d set up a local development environment to practice with basic concepts like pods, services, and deployments. I would also look for opportunities to pair with team members who have Kubernetes experience and ask questions during code reviews.',
      feedbackStrengths: JSON.stringify([
        'Shows proactive learning approach',
        'Mentions practical hands-on experience',
        'Demonstrates willingness to collaborate'
      ]),
      feedbackImprovements: JSON.stringify([
        'Could mention specific learning resources',
        'Consider discussing timeline for proficiency',
        'Add how you\'d contribute during the learning process'
      ]),
      suggestedAnswer: 'Great approach! You could strengthen this by mentioning specific resources like the official Kubernetes tutorials or certification paths, and how you\'d balance learning with contributing to the team.',
      score: 7
    }
  ]

  for (const turn of practiceTurns) {
    await prisma.practiceTurn.create({
      data: {
        practiceSessionId: practiceSession.id,
        ...turn
      }
    })
  }

  // Create user preferences
  await prisma.userPreference.create({
    data: {
      theme: 'dark',
      defaultRole: 'Software Engineer',
      calendarIntegrationEnabled: false
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📝 Created sample session: ${sampleSession.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })