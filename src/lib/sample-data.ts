export const sampleResume = `Sarah Johnson
Full Stack Developer
Email: sarah.johnson@email.com | Phone: (555) 987-6543
LinkedIn: linkedin.com/in/sarahjohnson | GitHub: github.com/sarahj

PROFESSIONAL SUMMARY
Passionate full stack developer with 3+ years of experience building modern web applications using React, Node.js, and cloud technologies. Strong background in agile development, user experience design, and performance optimization.

EXPERIENCE

Full Stack Developer | InnovateTech Solutions | 2022-2024
• Developed and maintained 5+ production web applications using React, TypeScript, and Node.js
• Built RESTful APIs and microservices serving 50,000+ daily active users
• Implemented automated testing suites achieving 90% code coverage with Jest and Cypress
• Collaborated with UX designers to create responsive, accessible user interfaces
• Optimized application performance resulting in 35% faster page load times
• Mentored 2 junior developers and conducted weekly code reviews

Junior Developer | StartupXYZ | 2021-2022
• Created responsive web components using HTML5, CSS3, and vanilla JavaScript
• Integrated third-party APIs including payment gateways and analytics platforms
• Participated in agile ceremonies and contributed to sprint planning
• Fixed bugs and implemented feature requests based on user feedback

Freelance Web Developer | Self-employed | 2020-2021
• Built custom websites for 10+ small businesses using modern frameworks
• Managed client relationships and project timelines independently
• Implemented SEO best practices improving client search rankings by 40%

EDUCATION
Bachelor of Science in Computer Science | Tech University | 2020
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems

TECHNICAL SKILLS
• Programming Languages: JavaScript, TypeScript, Python, HTML5, CSS3
• Frontend: React, Vue.js, Next.js, Tailwind CSS, Material-UI
• Backend: Node.js, Express, Django, RESTful APIs, GraphQL
• Databases: PostgreSQL, MongoDB, Redis
• Cloud & DevOps: AWS (S3, EC2, Lambda), Docker, CI/CD, Git
• Testing: Jest, Cypress, React Testing Library
• Design: Figma, Adobe Creative Suite

PROJECTS
Personal Finance Tracker (React, Node.js, PostgreSQL)
• Built full-stack application with user authentication and data visualization
• Implemented secure payment integration using Stripe API
• Deployed on AWS with automated CI/CD pipeline

Open Source Contributions
• Contributor to popular React component library (500+ GitHub stars)
• Created and maintain npm package for form validation (1000+ weekly downloads)

CERTIFICATIONS
• AWS Certified Solutions Architect Associate (2023)
• Google Analytics Certified (2022)`

export const sampleJobDescription = `Senior Full Stack Developer - CloudTech Industries

CloudTech Industries is a leading provider of cloud-based business solutions, serving enterprise clients worldwide. We're looking for a Senior Full Stack Developer to join our engineering team and help build the next generation of our SaaS platform.

ABOUT THE ROLE:
As a Senior Full Stack Developer, you will design and develop scalable web applications, lead technical initiatives, and mentor junior team members. You'll work closely with product managers, designers, and other engineers to deliver high-quality software that delights our customers.

KEY RESPONSIBILITIES:
• Design and develop scalable web applications using React, TypeScript, and Node.js
• Build and maintain microservices architecture with proper API design
• Implement automated testing strategies and maintain high code quality standards
• Lead code reviews and provide technical guidance to junior developers
• Collaborate with DevOps team on CI/CD pipelines and cloud infrastructure
• Participate in architectural decisions and technical planning sessions
• Optimize application performance and ensure security best practices
• Work with product team to translate requirements into technical solutions

REQUIRED QUALIFICATIONS:
• 4+ years of professional software development experience
• Expert-level proficiency in JavaScript/TypeScript, React, and Node.js
• Strong experience with database design and optimization (PostgreSQL preferred)
• Experience with cloud platforms, preferably AWS (EC2, S3, Lambda, RDS)
• Knowledge of microservices architecture and RESTful API design
• Experience with automated testing frameworks (Jest, Cypress, etc.)
• Proficiency with Git, CI/CD pipelines, and modern development workflows
• Strong problem-solving skills and attention to detail
• Excellent communication skills and ability to work in a team environment
• Bachelor's degree in Computer Science or equivalent experience

PREFERRED QUALIFICATIONS:
• Experience with GraphQL and modern state management solutions
• Knowledge of containerization technologies (Docker, Kubernetes)
• Experience with monitoring and logging tools (DataDog, New Relic)
• Previous experience in a senior or lead developer role
• Experience with agile development methodologies
• Contributions to open source projects
• AWS certifications or other relevant cloud certifications

WHAT WE OFFER:
• Competitive salary range: $120,000 - $160,000 based on experience
• Equity package with high growth potential
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching up to 6%
• Flexible work arrangements (hybrid/remote options)
• Professional development budget ($3,000 annually)
• Unlimited PTO policy
• Modern office with free snacks and catered lunches
• Annual company retreats and team building events

ABOUT CLOUDTECH INDUSTRIES:
Founded in 2015, CloudTech Industries has grown from a startup to a leading SaaS provider with over 500 employees worldwide. Our platform serves 10,000+ businesses and processes millions of transactions daily. We're committed to innovation, customer success, and building a diverse, inclusive workplace where everyone can thrive.

Ready to make an impact at a fast-growing company? We'd love to hear from you!`

export const sampleCompanyName = 'CloudTech Industries'
export const sampleRoleTitle = 'Senior Full Stack Developer'

export function getSampleData() {
  return {
    resumeText: sampleResume,
    jobDescription: sampleJobDescription,
    companyName: sampleCompanyName,
    roleTitle: sampleRoleTitle
  }
}