"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Building2, Users, Code } from "lucide-react"
import { getSampleData } from "@/lib/sample-data"

interface SampleDataPickerProps {
  onLoadSample: (resumeText: string, jobDescription: string, companyName?: string, roleTitle?: string) => void
}

const sampleProfiles = [
  {
    id: "fullstack",
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    company: "CloudTech Industries",
    experience: "3+ years",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    icon: Code,
    description: "Experienced full stack developer with strong frontend and backend skills"
  },
  {
    id: "senior",
    name: "Mike Chen", 
    role: "Senior Software Engineer",
    company: "TechCorp Inc.",
    experience: "5+ years",
    skills: ["React", "Python", "Kubernetes", "GraphQL"],
    icon: Building2,
    description: "Senior engineer with leadership experience and strong technical background"
  },
  {
    id: "junior",
    name: "Alex Rodriguez",
    role: "Junior Developer",
    company: "StartupXYZ",
    experience: "1-2 years",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    icon: Users,
    description: "Recent graduate with solid fundamentals and eagerness to learn"
  }
]

export function SampleDataPicker({ onLoadSample }: SampleDataPickerProps) {
  const handleLoadSample = (profileId: string) => {
    const { resumeText, jobDescription, companyName, roleTitle } = getSampleData()
    
    // You could customize the data based on profileId if you had multiple samples
    onLoadSample(resumeText, jobDescription, companyName, roleTitle)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Try with Sample Data</h3>
        <p className="text-sm text-muted-foreground">
          Explore PrepPilot AI with realistic resume and job description examples
        </p>
      </div>
      
      <div className="grid gap-4">
        {sampleProfiles.map((profile) => (
          <Card key={profile.id} className="transition-colors hover:bg-muted/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-violet-500/20">
                    <profile.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{profile.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {profile.role} • {profile.experience}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleLoadSample(profile.id)}
                  className="shrink-0"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Use This
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">
                {profile.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          Sample data includes realistic resume content and job descriptions for testing
        </p>
      </div>
    </div>
  )
}