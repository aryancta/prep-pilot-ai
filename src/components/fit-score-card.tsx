"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getScoreColor } from "@/lib/utils"

interface FitScoreCardProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function FitScoreCard({ score, maxScore = 100, size = 'md', animated = false }: FitScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(animated ? 0 : score)
  
  useEffect(() => {
    if (!animated) return
    
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [score, animated])

  const percentage = Math.round((animatedScore / maxScore) * 100)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32", 
    lg: "w-40 h-40"
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Fit Score
        </CardTitle>
        <CardDescription>
          How well your resume matches this role
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative flex items-center justify-center">
          <svg 
            className={`transform -rotate-90 ${sizeClasses[size]}`}
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted-foreground/20"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              className={`${getScoreColor(animatedScore)} transition-colors duration-500`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: animated ? strokeDashoffset : circumference - (percentage / 100) * circumference
              }}
              initial={animated ? { strokeDashoffset: circumference } : false}
              animate={animated ? { strokeDashoffset } : false}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              className={`font-bold ${textSizeClasses[size]} ${getScoreColor(animatedScore)}`}
              initial={animated ? { scale: 0 } : false}
              animate={animated ? { scale: 1 } : false}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {Math.round(animatedScore)}
            </motion.span>
            <span className="text-xs text-muted-foreground">out of {maxScore}</span>
          </div>
        </div>

        {/* Score interpretation */}
        <div className="mt-4 text-center">
          <p className={`font-medium ${getScoreColor(animatedScore)}`}>
            {getScoreLabel(animatedScore)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {getScoreDescription(animatedScore)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent Match"
  if (score >= 65) return "Strong Match"
  if (score >= 50) return "Good Match"
  if (score >= 35) return "Fair Match"
  return "Needs Improvement"
}

function getScoreDescription(score: number): string {
  if (score >= 80) return "You're very well qualified for this position"
  if (score >= 65) return "You meet most of the key requirements"
  if (score >= 50) return "You have solid foundational skills"
  if (score >= 35) return "Consider strengthening key areas"
  return "Significant skill gaps need attention"
}