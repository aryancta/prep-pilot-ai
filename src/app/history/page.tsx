"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  TrendingUp, 
  Trash2, 
  ExternalLink,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SessionCard } from "@/components/session-card"
import { LoadingState } from "@/components/loading-state"
import { EmptyState } from "@/components/empty-state"
import type { AnalysisSession } from "@/types"
import { formatDate, getScoreColor } from "@/lib/utils"
import { toast } from "sonner"

export default function HistoryPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<AnalysisSession[]>([])
  const [filteredSessions, setFilteredSessions] = useState<AnalysisSession[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'high-score' | 'pending'>('all')

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetch("/api/sessions")
        
        if (!response.ok) {
          throw new Error("Failed to fetch sessions")
        }
        
        const data = await response.json()
        setSessions(data.sessions)
        setFilteredSessions(data.sessions)
      } catch (error) {
        console.error("Fetch sessions error:", error)
        toast.error("Failed to load session history")
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  useEffect(() => {
    let filtered = sessions

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(session => 
        session.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.roleTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    switch (selectedFilter) {
      case 'recent':
        filtered = filtered.filter(session => {
          const daysSince = (Date.now() - new Date(session.createdAt).getTime()) / (1000 * 60 * 60 * 24)
          return daysSince <= 7
        })
        break
      case 'high-score':
        filtered = filtered.filter(session => session.fitScore >= 70)
        break
      case 'pending':
        filtered = filtered.filter(session => session.status === 'draft' || session.status === 'analyzed')
        break
    }

    setFilteredSessions(filtered)
  }, [sessions, searchQuery, selectedFilter])

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Failed to delete session")
      }

      setSessions(prev => prev.filter(s => s.id !== sessionId))
      toast.success("Session deleted successfully")
    } catch (error) {
      console.error("Delete session error:", error)
      toast.error("Failed to delete session")
    }
  }

  const handleViewSession = (sessionId: string) => {
    router.push(`/analysis/${sessionId}`)
  }

  if (loading) return <LoadingState />

  const stats = {
    total: sessions.length,
    avgScore: sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.fitScore, 0) / sessions.length) : 0,
    recent: sessions.filter(s => {
      const daysSince = (Date.now() - new Date(s.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSince <= 7
    }).length,
    completed: sessions.filter(s => s.status === 'completed').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-6xl py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Session History</h1>
              <p className="text-lg text-muted-foreground mt-2">
                Review your previous interview preparations and track your progress
              </p>
            </div>
            <Button
              onClick={() => router.push("/onboarding")}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(stats.avgScore)}`}>
                      {stats.avgScore}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold">{stats.recent}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-violet-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{stats.completed}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by company or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <Button
                    variant={selectedFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('all')}
                  >
                    All ({sessions.length})
                  </Button>
                  <Button
                    variant={selectedFilter === 'recent' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('recent')}
                  >
                    Recent ({stats.recent})
                  </Button>
                  <Button
                    variant={selectedFilter === 'high-score' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('high-score')}
                  >
                    High Score
                  </Button>
                  <Button
                    variant={selectedFilter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter('pending')}
                  >
                    In Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid gap-6"
          >
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <SessionCard
                  session={session}
                  onClick={() => handleViewSession(session.id)}
                  onDelete={() => handleDeleteSession(session.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}