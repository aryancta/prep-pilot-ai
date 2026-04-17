"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const beforeBullets = [
  "Developed web applications using React and JavaScript",
  "Worked with databases and backend systems",
  "Collaborated with team members on various projects",
  "Fixed bugs and implemented new features"
]

const afterBullets = [
  "Architected and developed 5+ scalable web applications using React and TypeScript, serving 50,000+ daily active users with 99.9% uptime",
  "Designed high-performance database systems and RESTful APIs, reducing query response time by 40% and supporting 1M+ requests/day",
  "Led cross-functional agile teams of 8 engineers and designers, delivering 15+ features ahead of schedule and improving team velocity by 35%",
  "Implemented comprehensive testing strategies achieving 95% code coverage, reducing production bugs by 60% and deployment time by 50%"
]

const skillComparison = {
  matched: [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "PostgreSQL", level: 75 }
  ],
  missing: [
    { name: "Kubernetes", level: 0 },
    { name: "GraphQL", level: 0 },
    { name: "Microservices", level: 0 },
    { name: "Machine Learning", level: 0 }
  ]
}

export function BeforeAfter() {
  return (
    <section className="py-24 bg-muted/30">
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
              See the{" "}
              <span className="text-gradient">transformation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how PrepPilot AI transforms generic resume bullets into compelling, 
              metrics-driven statements that get noticed by recruiters.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <CardTitle className="text-xl">Before: Generic Resume</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {beforeBullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{bullet}</p>
                  </div>
                ))}
                <div className="pt-4 text-center">
                  <Badge variant="destructive" className="text-xs">
                    Lacks impact and specificity
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <CardTitle className="text-xl">After: AI-Optimized Resume</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {afterBullets.map((bullet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{bullet}</p>
                  </motion.div>
                ))}
                <div className="pt-4 text-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs">
                    Quantified impact with metrics
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Skills Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Skill Gap Analysis</CardTitle>
              <p className="text-muted-foreground">
                Identify your strengths and areas for improvement
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Matched Skills */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Matched Skills
                  </h4>
                  <div className="space-y-3">
                    {skillComparison.matched.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-green-600 dark:text-green-400 font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <XCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Skills to Develop
                  </h4>
                  <div className="space-y-3">
                    {skillComparison.missing.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-amber-600 dark:text-amber-400 font-medium">Learn</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-r from-amber-200 to-amber-300 dark:from-amber-800 dark:to-amber-700 rounded-full opacity-50" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transformation Arrow */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-full px-6 py-3 border border-indigo-500/30"
          >
            <span className="text-lg font-medium">Generic Resume</span>
            <ArrowRight className="h-6 w-6 text-indigo-500" />
            <span className="text-lg font-medium text-gradient">Interview-Ready Profile</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}