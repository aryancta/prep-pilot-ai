"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Upload, FileText, Sparkles, ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { SampleDataPicker } from "@/components/sample-data-picker"
import { onboardingFormSchema, type OnboardingFormData } from "@/lib/validators"
import { toast } from "sonner"

export default function OnboardingPage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [step, setStep] = useState(1)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      resumeText: "",
      jobDescription: "",
      companyName: "",
      roleTitle: "",
      source: "paste"
    }
  })

  const onSubmit = async (data: OnboardingFormData) => {
    setIsAnalyzing(true)
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const result = await response.json()
      router.push(`/analysis/${result.sessionId}`)
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    form.setValue("source", "upload")
    
    // Mock file parsing for now
    if (file.type === "application/pdf") {
      form.setValue("resumeText", "PDF content will be extracted here...")
      toast.success("PDF uploaded successfully")
    } else if (file.name.endsWith(".docx")) {
      form.setValue("resumeText", "DOCX content will be extracted here...")
      toast.success("Word document uploaded successfully")
    } else {
      toast.error("Please upload a PDF or Word document")
    }
  }

  const handleSampleData = (resumeText: string, jobDescription: string, companyName?: string, roleTitle?: string) => {
    form.setValue("resumeText", resumeText)
    form.setValue("jobDescription", jobDescription)
    form.setValue("companyName", companyName || "")
    form.setValue("roleTitle", roleTitle || "")
    form.setValue("source", "sample")
    setStep(2)
    toast.success("Sample data loaded!")
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s analyze your{" "}
            <span className="text-gradient">interview readiness</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and job description to get personalized insights, 
            tailored bullets, and a custom interview prep plan.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span className={step >= 1 ? "text-foreground font-medium" : ""}>Upload Resume</span>
            <span className={step >= 2 ? "text-foreground font-medium" : ""}>Add Job Details</span>
            <span className={step >= 3 ? "text-foreground font-medium" : ""}>Analyze</span>
          </div>
        </motion.div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Resume Upload */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Upload Your Resume
                  </CardTitle>
                  <CardDescription>
                    Paste your resume text or upload a PDF/Word document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="paste" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="paste">Paste Text</TabsTrigger>
                      <TabsTrigger value="upload">Upload File</TabsTrigger>
                      <TabsTrigger value="sample">Use Sample</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="paste" className="space-y-4">
                      <Textarea
                        {...form.register("resumeText")}
                        placeholder="Paste your resume content here..."
                        className="min-h-[300px]"
                      />
                      {form.formState.errors.resumeText && (
                        <p className="text-sm text-red-500">{form.formState.errors.resumeText.message}</p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="upload" className="space-y-4">
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium mb-2">
                          {uploadedFile ? uploadedFile.name : "Click to upload resume"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF and Word documents
                        </p>
                        <input
                          id="file-upload"
                          type="file"
                          accept=".pdf,.docx,.doc"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(file)
                          }}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sample">
                      <SampleDataPicker onLoadSample={handleSampleData} />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      type="button" 
                      onClick={() => setStep(2)}
                      disabled={!form.watch("resumeText")}
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Job Description */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Job Description & Details
                  </CardTitle>
                  <CardDescription>
                    Provide the job posting you&apos;re applying for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company Name</label>
                      <Input
                        {...form.register("companyName")}
                        placeholder="e.g., TechCorp Inc."
                      />
                      {form.formState.errors.companyName && (
                        <p className="text-sm text-red-500 mt-1">{form.formState.errors.companyName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Role Title</label>
                      <Input
                        {...form.register("roleTitle")}
                        placeholder="e.g., Senior Software Engineer"
                      />
                      {form.formState.errors.roleTitle && (
                        <p className="text-sm text-red-500 mt-1">{form.formState.errors.roleTitle.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Job Description</label>
                    <Textarea
                      {...form.register("jobDescription")}
                      placeholder="Paste the full job description here..."
                      className="min-h-[300px]"
                    />
                    {form.formState.errors.jobDescription && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.jobDescription.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setStep(3)}
                      disabled={!form.watch("jobDescription") || !form.watch("companyName") || !form.watch("roleTitle")}
                    >
                      Review & Analyze
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Ready to Analyze
                  </CardTitle>
                  <CardDescription>
                    Review your information and start the analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <h4 className="font-medium mb-2">Application Details</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Company:</strong> {form.watch("companyName") || "Not specified"}</p>
                        <p><strong>Role:</strong> {form.watch("roleTitle") || "Not specified"}</p>
                        <p><strong>Resume:</strong> {form.watch("resumeText") ? `${form.watch("resumeText")!.slice(0, 100)}...` : "Not provided"}</p>
                        <p><strong>Job Description:</strong> {form.watch("jobDescription") ? `${form.watch("jobDescription")!.slice(0, 100)}...` : "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
                      <h4 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">What you&apos;ll get:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Instant fit score and skill analysis</li>
                        <li>• AI-optimized resume bullets</li>
                        <li>• Personalized interview questions</li>
                        <li>• 7-day preparation timeline</li>
                        <li>• Mock interview practice sessions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isAnalyzing} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Start Analysis
                          <Sparkles className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  )
}