"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, MessageSquare, ArrowRight, Lightbulb, Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { InterviewQuestion } from "@/types"
import { getDifficultyColor, getCategoryColor } from "@/lib/utils"

interface InterviewQuestionTabsProps {
  questions: InterviewQuestion[]
  onStartPractice?: () => void
}

export function InterviewQuestionTabs({ questions, onStartPractice }: InterviewQuestionTabsProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedQuestions(newExpanded)
  }

  // Group questions by category
  const categories = ['behavioral', 'technical', 'role-specific', 'gap-focused']
  const questionsByCategory = categories.reduce((acc, category) => {
    acc[category] = questions.filter(q => q.category === category)
    return acc
  }, {} as Record<string, InterviewQuestion[]>)

  const totalQuestions = questions.length
  const mostLikely = questions.slice(0, 3) // Top 3 most likely questions

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Interview Preparation ({totalQuestions} Questions)
            </CardTitle>
            <CardDescription>
              Personalized questions based on your resume and the job requirements
            </CardDescription>
          </div>
          <Button onClick={onStartPractice} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
            <Play className="h-4 w-4 mr-2" />
            Start Practice
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="most-likely" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="most-likely">Most Likely</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="role-specific">Role-Specific</TabsTrigger>
            <TabsTrigger value="gap-focused">Gap-Focused</TabsTrigger>
          </TabsList>

          <TabsContent value="most-likely" className="space-y-4">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Highest Priority Questions</h3>
              <p className="text-sm text-muted-foreground">
                These questions are most likely to be asked based on your profile and the role
              </p>
            </div>
            <QuestionList 
              questions={mostLikely} 
              expandedQuestions={expandedQuestions}
              onToggle={toggleQuestion}
            />
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="mb-4">
                <h3 className="font-semibold mb-2 capitalize">
                  {category.replace('-', ' ')} Questions ({questionsByCategory[category].length})
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getCategoryDescription(category)}
                </p>
              </div>
              <QuestionList 
                questions={questionsByCategory[category]} 
                expandedQuestions={expandedQuestions}
                onToggle={toggleQuestion}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface QuestionListProps {
  questions: InterviewQuestion[]
  expandedQuestions: Set<string>
  onToggle: (questionId: string) => void
}

function QuestionList({ questions, expandedQuestions, onToggle }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No questions in this category</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border rounded-lg overflow-hidden"
        >
          <button
            onClick={() => onToggle(question.id)}
            className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryColor(question.category)}>
                    {question.category}
                  </Badge>
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </div>
                <p className="font-medium text-sm leading-relaxed">
                  {question.questionText}
                </p>
              </div>
              <div className="shrink-0">
                {expandedQuestions.has(question.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </button>

          <AnimatePresence>
            {expandedQuestions.has(question.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t bg-muted/20">
                  {question.hintText && (
                    <div className="flex gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="font-medium text-sm text-blue-800 dark:text-blue-200 mb-1">
                          Answer Strategy
                        </h5>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {question.hintText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

function getCategoryDescription(category: string): string {
  const descriptions = {
    behavioral: "Questions about your past experiences, problem-solving approach, and work style",
    technical: "Questions testing your technical knowledge and problem-solving skills",
    'role-specific': "Questions tailored to the specific responsibilities of this position",
    'gap-focused': "Questions addressing areas where you might need to demonstrate learning ability"
  }
  return descriptions[category as keyof typeof descriptions] || ""
}