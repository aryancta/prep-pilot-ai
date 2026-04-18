# PrepPilot AI 🚀

> Turn any resume into a personalized interview prep plan in minutes

PrepPilot AI is a complete interview preparation platform that transforms static resumes into interactive, personalized preparation systems. Upload your resume, paste a job description, and receive instant fit scores, tailored resume bullets, mock interview sessions, and 7-day prep plans.

## ✨ Features

### 🎯 **Smart Resume Analysis**
- **Instant Fit Scoring**: Get 0-100% match scores between your resume and job requirements
- **Skill Gap Analysis**: Identify matched skills and areas for improvement
- **Keyword Extraction**: AI-powered analysis of technical and soft skills
- **Visual Radar Charts**: Interactive skill coverage visualization

### 📝 **AI-Powered Resume Optimization**
- **Tailored Bullets**: Transform generic resume points into compelling, metrics-driven statements
- **Role-Specific Keywords**: Automatically incorporate job-specific terminology
- **Impact Quantification**: Add measurable results and business impact
- **Before/After Comparison**: See exactly how your resume improves

### 🎙️ **Interactive Mock Interviews**
- **Multi-Turn AI Coach**: Adaptive interviewer that asks follow-up questions
- **Real-Time Feedback**: Instant analysis of your answers with specific improvements
- **Category-Based Questions**: Behavioral, technical, role-specific, and gap-focused questions
- **Performance Scoring**: Track your interview performance over time

### 📅 **7-Day Preparation Plans**
- **Personalized Schedules**: Daily tasks tailored to your skill gaps and timeline
- **Time Estimates**: Realistic preparation time for each activity
- **Progress Tracking**: Mark tasks complete and monitor your readiness
- **Calendar Integration**: Export prep tasks to your calendar (coming soon)

### 💾 **Session Management**
- **Complete History**: Save and revisit all your preparation sessions
- **Progress Analytics**: Track improvement across multiple applications
- **Export Options**: Download your analysis and prep plans
- **Dark/Light Themes**: Customizable interface preferences

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **Database**: SQLite with Prisma ORM
- **State Management**: Zustand for client state
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Docker containerization ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/prep-pilot-ai.git
cd prep-pilot-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
# Initialize SQLite database
npm run db:push

# Seed with demo data
npm run db:seed
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

2. **Or build manually**
```bash
# Build the image
docker build -t prep-pilot-ai .

# Run the container
docker run -p 3000:3000 prep-pilot-ai
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 1. **Create Your First Analysis**
- Navigate to the onboarding page
- Paste your resume text or upload PDF/DOCX
- Add the job description for your target role
- Enter company and role details
- Click "Start Analysis"

### 2. **Review Your Results**
- **Fit Score**: See how well you match the role (0-100%)
- **Skills Analysis**: View matched skills and gaps via radar chart
- **Resume Optimization**: Get AI-enhanced bullets with before/after comparison
- **Interview Questions**: Review personalized questions by category
- **Prep Plan**: Follow your 7-day preparation timeline

### 3. **Practice Your Interview**
- Click "Start Practice" from any analysis
- Answer questions in the interactive chat interface
- Receive real-time feedback on your responses
- Review suggested improvements and scoring
- Practice multiple rounds to improve

### 4. **Track Your Progress**
- Visit the History page to see all sessions
- Filter by recent, high-score, or in-progress
- Export your data or delete old sessions
- Monitor improvement across applications

### 5. **Customize Settings**
- Choose light/dark theme preferences
- Set default company and role values
- Manage data export and privacy options
- Configure integrations (coming soon)

## 🎨 Screenshots

### Landing Page

### Analysis Dashboard  

### Mock Interview

### Session History

## 🏗️ Project Structure

```
prep-pilot-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── analysis/          # Analysis dashboard
│   │   ├── api/               # API routes
│   │   ├── history/           # Session history
│   │   ├── onboarding/        # Resume upload flow
│   │   ├── practice/          # Mock interview
│   │   └── settings/          # User preferences
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── fit-score-card.tsx
│   │   ├── skill-radar-chart.tsx
│   │   └── mock-interview-chat.tsx
│   ├── lib/                   # Utilities and logic
│   │   ├── analysis.ts        # Analysis orchestration
│   │   ├── mock-ai.ts         # AI generation layer
│   │   ├── resume-parser.ts   # File parsing utilities
│   │   └── validators.ts      # Zod schemas
│   └── types/                 # TypeScript definitions
├── prisma/                    # Database schema and seeds
├── public/                    # Static assets
├── Dockerfile                 # Container configuration
├── docker-compose.yml         # Multi-container setup
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Database (SQLite by default)
DATABASE_URL="file:./dev.db"

# Optional: External AI APIs
OPENAI_API_KEY="your-api-key"
ANTHROPIC_API_KEY="your-api-key"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Schema

The application uses SQLite with the following main entities:

- **AnalysisSession**: Main analysis records
- **SkillMatch**: Matched and missing skills
- **ResumeBullet**: Original vs optimized bullets
- **InterviewQuestion**: Generated questions by category
- **PrepPlanDay**: Daily preparation tasks
- **PracticeSession**: Mock interview sessions
- **PracticeTurn**: Individual Q&A exchanges

## 🚢 Deployment

### Production Deployment

1. **Using Docker (Recommended)**
```bash
# Production build
docker-compose -f docker-compose.yml --profile production up -d
```

2. **Using Vercel**
```bash
# Deploy to Vercel
npm install -g vercel
vercel --prod
```

3. **Using Railway**
```bash
# Deploy to Railway
npm install -g @railway/cli
railway login
railway deploy
```

### Performance Optimizations

- **Static Generation**: Landing and settings pages are pre-rendered
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: API responses cached where appropriate
- **Bundle Analysis**: Use `npm run analyze` to inspect bundle size

## 🤝 Contributing

PrepPilot AI was built for a hackathon, but contributions are welcome!

### Development Guidelines

1. **Code Style**: ESLint + Prettier configured
2. **Type Safety**: Full TypeScript coverage required
3. **Components**: Use shadcn/ui for consistency
4. **Database**: All changes must include Prisma migrations
5. **Testing**: Add tests for new API endpoints

### Contribution Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### Immediate (v1.1)
- [ ] PDF export for analysis reports
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Email reminders for prep tasks
- [ ] Bulk resume analysis

### Short Term (v1.2)
- [ ] Real AI integration (OpenAI, Anthropic)
- [ ] Video interview practice
- [ ] Advanced analytics dashboard
- [ ] Team/organization features

### Long Term (v2.0)
- [ ] Mobile applications (React Native)
- [ ] LinkedIn integration
- [ ] ATS optimization scoring
- [ ] Interview scheduling platform

## ❓ FAQ

**Q: Does this work without AI API keys?**
A: Yes! PrepPilot AI includes a deterministic mock AI layer that provides realistic results for demonstration purposes.

**Q: What file formats are supported for resume upload?**
A: Currently PDF and DOCX files are supported, with text extraction for analysis.

**Q: Is my data stored securely?**
A: All data is stored locally in SQLite. In production deployments, ensure proper database security.

**Q: Can I use this for multiple job applications?**
A: Absolutely! The session history feature lets you manage multiple analyses and track progress across different roles.

**Q: Is this mobile responsive?**
A: Yes, PrepPilot AI is fully responsive and works great on desktop, tablet, and mobile devices.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MeDo**: Built during the MeDo hackathon
- **shadcn/ui**: Beautiful component library
- **Vercel**: Next.js development and inspiration
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework

## 👨‍💻 Author

**Aryan Choudhary**
- Email: aryancta@gmail.com
- GitHub: [@aryanchoudhary](https://github.com/aryanchoudhary)

---

<div align="center">

**Built with ❤️ for job seekers everywhere**

[Demo](https://prep-pilot-ai.vercel.app) • [Report Bug](https://github.com/yourusername/prep-pilot-ai/issues) • [Request Feature](https://github.com/yourusername/prep-pilot-ai/issues)

</div>
