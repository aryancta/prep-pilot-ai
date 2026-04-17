"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Calendar, Clock, ChevronDown, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { PrepPlanDay } from "@/types"
import { formatDuration } from "@/lib/utils"

interface PrepPlanTimelineProps {
  days: PrepPlanDay[]
  onToggleComplete?: (dayId: string) => void
}

export function PrepPlanTimeline({ days, onToggleComplete }: PrepPlanTimelineProps) {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set([days[0]?.id]))

  const toggleDay = (dayId: string) => {
    const newExpanded = new Set(expandedDays)
    if (newExpanded.has(dayId)) {
      newExpanded.delete(dayId)
    } else {
      newExpanded.add(dayId)
    }
    setExpandedDays(newExpanded)
  }

  const completedDays = days.filter(day => day.completed).length
  const progress = (completedDays / days.length) * 100
  const totalTime = days.reduce((sum, day) => sum + day.estimatedMinutes, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          7-Day Interview Prep Plan
        </CardTitle>
        <CardDescription>
          Your personalized preparation schedule
        </CardDescription>
        
        {/* Progress overview */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress: {completedDays} of {days.length} days completed</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Total time: {formatDuration(totalTime)}</span>
            <span>Avg. per day: {formatDuration(Math.round(totalTime / days.length))}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {days.map((day, index) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg overflow-hidden transition-colors ${
                day.completed 
                  ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                  : 'hover:bg-muted/50'
              }`}
            >
              {/* Day header */}
              <div
                onClick={() => toggleDay(day.id)}
                className="flex items-center gap-4 p-4 cursor-pointer"
              >
                {/* Day indicator */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleComplete?.(day.id)
                    }}
                    className="shrink-0"
                  >
                    {day.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                  
                  {/* Timeline connector */}
                  {index < days.length - 1 && (
                    <div className="absolute left-7 mt-8 w-px h-6 bg-border" />
                  )}
                </div>

                {/* Day content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          Day {day.dayNumber}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDuration(day.estimatedMinutes)}
                        </Badge>
                      </div>
                      <h4 className={`font-medium ${day.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {day.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {day.tasks.length} tasks planned
                      </p>
                    </div>
                    
                    <div className="shrink-0">
                      {expandedDays.has(day.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded day content */}
              <AnimatePresence>
                {expandedDays.has(day.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 ml-10">
                      <div className="space-y-3">
                        {/* Task list */}
                        <div className="space-y-2">
                          {day.tasks.map((task, taskIndex) => (
                            <div
                              key={taskIndex}
                              className="flex items-start gap-3 p-3 rounded-lg bg-background border"
                            >
                              <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                                day.completed ? 'bg-green-500' : 'bg-muted-foreground'
                              }`} />
                              <p className={`text-sm flex-1 ${
                                day.completed ? 'line-through text-muted-foreground' : ''
                              }`}>
                                {task}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Day actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant={day.completed ? "secondary" : "default"}
                            onClick={() => onToggleComplete?.(day.id)}
                          >
                            {day.completed ? "Mark Incomplete" : "Mark Complete"}
                          </Button>
                          <Button size="sm" variant="outline">
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Summary card */}
        {completedDays > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
              Great Progress! 🎉
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              You&apos;ve completed {completedDays} out of {days.length} preparation days. 
              {completedDays === days.length 
                ? " You&apos;re fully prepared for your interview!"
                : ` Keep going - you&apos;re ${Math.round(progress)}% ready!`
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}