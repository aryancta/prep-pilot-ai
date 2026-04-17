"use client"

import { useState } from "react"
import { Copy, FileText, TrendingUp, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ResumeBullet } from "@/types"

interface TailoredBulletsProps {
  bullets: ResumeBullet[]
  onCopy?: (text: string) => void
}

export function TailoredBullets({ bullets, onCopy }: TailoredBulletsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    onCopy?.(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const experienceBullets = bullets.filter(b => b.sectionName === 'experience')
  const summaryBullets = bullets.filter(b => b.sectionName === 'summary')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Resume Optimization
        </CardTitle>
        <CardDescription>
          AI-enhanced bullets tailored to this specific role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Improvements ({bullets.length})</TabsTrigger>
            {experienceBullets.length > 0 && (
              <TabsTrigger value="experience">Experience ({experienceBullets.length})</TabsTrigger>
            )}
            {summaryBullets.length > 0 && (
              <TabsTrigger value="summary">Summary ({summaryBullets.length})</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <BulletList bullets={bullets} onCopy={handleCopy} copiedId={copiedId} />
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <BulletList bullets={experienceBullets} onCopy={handleCopy} copiedId={copiedId} />
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <BulletList bullets={summaryBullets} onCopy={handleCopy} copiedId={copiedId} />
          </TabsContent>
        </Tabs>

        {/* Summary stats */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-200">Optimization Complete</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Enhanced {bullets.length} resume bullets with metrics, impact statements, and role-specific keywords.
                Average improvement score: {Math.round(bullets.reduce((sum, b) => sum + b.impactScore, 0) / bullets.length)}/10
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface BulletListProps {
  bullets: ResumeBullet[]
  onCopy: (text: string, id: string) => void
  copiedId: string | null
}

function BulletList({ bullets, onCopy, copiedId }: BulletListProps) {
  if (bullets.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No bullets in this category</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bullets.map((bullet, index) => (
        <motion.div
          key={bullet.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-4"
        >
          {/* Original */}
          <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive" className="text-xs">Original</Badge>
                  <span className="text-xs text-muted-foreground">
                    Impact: {bullet.impactScore - 3}/10
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{bullet.originalText}</p>
              </div>
            </div>
          </div>

          {/* Improved */}
          <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs">
                    AI-Enhanced
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Impact: {bullet.impactScore}/10
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{bullet.tailoredText}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCopy(bullet.tailoredText, bullet.id)}
                className="shrink-0"
              >
                {copiedId === bullet.id ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Improvements highlight */}
          <div className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Key improvements:</strong> Added quantifiable metrics, strengthened action verbs, 
              included role-specific keywords, and emphasized business impact.
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}