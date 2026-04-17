"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-indigo-900 to-violet-900">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-electric-500/20 blur-3xl" />
      
      <div className="relative container py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-950/50 px-4 py-1.5 text-sm text-violet-300"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Built for Hackathon Success
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Turn any resume into a{" "}
                <span className="bg-gradient-to-r from-electric-400 to-violet-400 bg-clip-text text-transparent">
                  personalized
                </span>{" "}
                interview prep plan
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Upload your resume, paste a job description, and get instant fit scores, 
                tailored bullets, mock interviews, and a 7-day prep plan. All powered by AI.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">95% accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">3min setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <span className="text-gray-300">No signup required</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0">
                <Link href="/onboarding">
                  Start Free Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-violet-500/20 text-violet-300 hover:bg-violet-950/50">
                <Link href="#features">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="pt-8">
              <p className="text-sm text-gray-400 mb-4">Built with modern tech stack:</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Next.js 14</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>Prisma</span>
                <span>•</span>
                <span>SQLite</span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur-2xl opacity-20" />
              
              {/* Mock dashboard */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-white font-semibold">Senior Developer at TechCorp</h3>
                    <p className="text-gray-400 text-sm">Analysis completed</p>
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    78% Match
                  </div>
                </div>

                {/* Score visualization */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">React</span>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Node.js</span>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-4/6 h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Kubernetes</span>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-1/6 h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 bg-indigo-600/20 text-indigo-300 py-2 px-3 rounded-lg text-sm text-center">
                    View Tailored Resume
                  </div>
                  <div className="flex-1 bg-violet-600/20 text-violet-300 py-2 px-3 rounded-lg text-sm text-center">
                    Start Mock Interview
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 shadow-lg"
            >
              <Target className="h-6 w-6 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full p-3 shadow-lg"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}