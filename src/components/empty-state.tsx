"use client"

import { motion } from "framer-motion"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function EmptyState() {
  return (
    <Card>
      <CardContent className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-full flex items-center justify-center"
          >
            <FileText className="w-12 h-12 text-indigo-500" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No Analysis Sessions Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start your interview preparation journey by creating your first analysis session. 
              Upload your resume and get personalized insights in minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
              <Link href="/onboarding">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Analysis
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/">
                Learn More
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Instant fit scoring
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                AI-optimized resume
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Mock interview practice
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}