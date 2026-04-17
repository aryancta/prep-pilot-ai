"use client"

import { 
  Calendar, 
  ExternalLink, 
  Trash2, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { AnalysisSession } from "@/types"
import { formatDate, getScoreColor, getScoreBgColor } from "@/lib/utils"

interface SessionCardProps {
  session: AnalysisSession
  onClick?: () => void
  onDelete?: () => void
}

export function SessionCard({ session, onClick, onDelete }: SessionCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', icon: CheckCircle2, color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' }
      case 'analyzed':
        return { label: 'Ready for Practice', icon: TrendingUp, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' }
      case 'draft':
        return { label: 'In Progress', icon: Clock, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' }
      default:
        return { label: 'Unknown', icon: AlertCircle, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' }
    }
  }

  const statusInfo = getStatusInfo(session.status)
  const StatusIcon = statusInfo.icon

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:border-muted-foreground/20 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Main Content */}
          <div className="flex-1 min-w-0" onClick={onClick}>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold truncate">
                    {session.roleTitle || 'Untitled Position'}
                  </h3>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="font-medium">
                    {session.companyName || 'Unknown Company'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(session.createdAt)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {session.summary || 'Analysis summary not available'}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Fit Score */}
              <div className={`p-3 rounded-lg ${getScoreBgColor(session.fitScore)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">Fit Score</span>
                  <TrendingUp className="h-3 w-3" />
                </div>
                <div className={`text-lg font-bold ${getScoreColor(session.fitScore)}`}>
                  {session.fitScore}%
                </div>
              </div>

              {/* Skills (if available) */}
              {session.skillMatches && (
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Skills</span>
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                  <div className="text-lg font-bold">
                    {session.skillMatches.filter(s => s.type === 'matched').length}/
                    {session.skillMatches.length}
                  </div>
                </div>
              )}

              {/* Interview Questions */}
              {session.interviewQuestions && (
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Questions</span>
                    <MessageSquare className="h-3 w-3 text-blue-500" />
                  </div>
                  <div className="text-lg font-bold">
                    {session.interviewQuestions.length}
                  </div>
                </div>
              )}

              {/* Prep Progress */}
              {session.prepPlanDays && (
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Prep Plan</span>
                    <Clock className="h-3 w-3 text-violet-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold">
                      {session.prepPlanDays.filter(d => d.completed).length}/{session.prepPlanDays.length}
                    </div>
                    <Progress 
                      value={(session.prepPlanDays.filter(d => d.completed).length / session.prepPlanDays.length) * 100} 
                      className="h-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                onClick?.()
              }}
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              View
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.()
              }}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:border-red-300"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}