"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SkillMatch } from "@/types"
import { getCategoryColor } from "@/lib/utils"

interface SkillRadarChartProps {
  matchedSkills: SkillMatch[]
  missingSkills: SkillMatch[]
}

export function SkillRadarChart({ matchedSkills, missingSkills }: SkillRadarChartProps) {
  // Group skills by category and calculate coverage
  const categories = ['frontend', 'backend', 'database', 'cloud', 'programming', 'tools']
  
  const data = categories.map(category => {
    const matchedInCategory = matchedSkills.filter(skill => skill.category === category)
    const missingInCategory = missingSkills.filter(skill => skill.category === category)
    const totalInCategory = matchedInCategory.length + missingInCategory.length
    
    const coverage = totalInCategory > 0 
      ? Math.round((matchedInCategory.length / totalInCategory) * 100)
      : 0
    
    return {
      category: category.charAt(0).toUpperCase() + category.slice(1),
      coverage,
      matched: matchedInCategory.length,
      missing: missingInCategory.length,
      total: totalInCategory
    }
  }).filter(item => item.total > 0) // Only show categories with skills

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
          Skill Coverage by Category
        </CardTitle>
        <CardDescription>
          Your strength across different technical areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10 }}
                    className="text-muted-foreground"
                  />
                  <Radar
                    name="Coverage"
                    dataKey="coverage"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Category breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Category Breakdown</h4>
              <div className="grid grid-cols-1 gap-2">
                {data.map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(item.category.toLowerCase())}>
                        {item.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.matched}/{item.total} skills
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {item.coverage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
            </div>
            <p className="text-muted-foreground">
              No categorized skills found. Skills will appear here as they are analyzed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}