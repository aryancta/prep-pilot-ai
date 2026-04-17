"use client"

import { 
  Target, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  FileText, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  {
    icon: Target,
    title: "Smart Resume Analysis",
    description: "Get an instant fit score and detailed breakdown of how your resume matches the job requirements.",
    benefits: ["Keyword matching", "Skill gap analysis", "ATS optimization"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: MessageSquare,
    title: "AI Interview Coach",
    description: "Practice with our adaptive AI interviewer that asks follow-up questions based on your answers.",
    benefits: ["Real-time feedback", "Adaptive questioning", "Confidence building"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Calendar,
    title: "7-Day Prep Plan",
    description: "Get a personalized daily schedule that prepares you systematically for interview success.",
    benefits: ["Day-by-day tasks", "Time estimates", "Progress tracking"],
    color: "from-violet-500 to-purple-500"
  }
]

const workflow = [
  {
    step: "1",
    title: "Upload & Analyze",
    description: "Paste your resume and job description to get instant analysis"
  },
  {
    step: "2", 
    title: "Review & Improve",
    description: "See tailored resume bullets and identified skill gaps"
  },
  {
    step: "3",
    title: "Practice & Prepare", 
    description: "Use AI mock interviews and follow your prep plan"
  }
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-gradient">ace your interview</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From resume optimization to mock interviews, PrepPilot AI provides 
              a complete toolkit for interview success.
            </p>
          </motion.div>
        </div>

        {/* Workflow steps */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-8">How it works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {workflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden border-0 bg-gradient-to-b from-card to-card/50 h-full">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5`} />
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">3min</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Skills Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">AI Available</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-indigo-600 to-violet-600 border-0 text-white">
            <CardContent className="py-12">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Ready to land your dream job?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Join thousands of job seekers who&apos;ve improved their interview performance with PrepPilot AI.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/onboarding">
                  Start Your Analysis Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}