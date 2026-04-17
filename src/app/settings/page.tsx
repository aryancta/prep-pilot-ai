"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Settings as SettingsIcon, 
  Palette, 
  Download, 
  Trash2, 
  Calendar,
  User,
  Building2,
  Moon,
  Sun,
  Monitor
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [preferences, setPreferences] = useState({
    defaultRole: "",
    defaultCompany: "",
    calendarIntegrationEnabled: false
  })

  useEffect(() => {
    setMounted(true)
    // Load preferences from localStorage or API
    const savedPrefs = localStorage.getItem('prep-pilot-preferences')
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs))
    }
  }, [])

  const savePreferences = () => {
    localStorage.setItem('prep-pilot-preferences', JSON.stringify(preferences))
    toast.success("Preferences saved successfully!")
  }

  const exportData = () => {
    // Mock export functionality
    toast.success("Data export started! You'll receive a download link shortly.")
  }

  const resetDemoData = async () => {
    if (!confirm("This will reset all demo data and cannot be undone. Continue?")) {
      return
    }

    try {
      // In a real app, this would call an API to reset demo data
      localStorage.removeItem('prep-pilot-preferences')
      toast.success("Demo data has been reset successfully!")
    } catch (error) {
      toast.error("Failed to reset demo data")
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container max-w-4xl py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Customize your PrepPilot AI experience and manage your data
          </p>
        </motion.div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme & Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize the visual appearance of PrepPilot AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Color Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === "light" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <Sun className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Light</p>
                      </button>
                      
                      <button
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === "dark" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <Moon className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Dark</p>
                      </button>
                      
                      <button
                        onClick={() => setTheme("system")}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === "system" 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <Monitor className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">System</p>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Current Theme</h4>
                        <p className="text-sm text-muted-foreground">
                          {theme === "system" ? "Follows your system preference" : `${theme?.charAt(0).toUpperCase()}${theme?.slice(1)} mode`}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {theme}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Default Preferences
                  </CardTitle>
                  <CardDescription>
                    Set default values to speed up future analysis creation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultRole">Default Role</Label>
                      <Input
                        id="defaultRole"
                        placeholder="e.g., Software Engineer"
                        value={preferences.defaultRole}
                        onChange={(e) => setPreferences(prev => ({ ...prev, defaultRole: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        This will be pre-filled in the onboarding form
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultCompany">Default Company</Label>
                      <Input
                        id="defaultCompany"
                        placeholder="e.g., TechCorp Inc."
                        value={preferences.defaultCompany}
                        onChange={(e) => setPreferences(prev => ({ ...prev, defaultCompany: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave blank if you apply to different companies
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button onClick={savePreferences}>
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Data
                  </CardTitle>
                  <CardDescription>
                    Download your analysis sessions and preparation history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Export includes all your analysis sessions, interview practice history, 
                      and preparation plans in JSON format.
                    </p>
                    <Button onClick={exportData} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Trash2 className="h-5 w-5" />
                    Reset Demo Data
                  </CardTitle>
                  <CardDescription>
                    Clear all demo sessions and start fresh
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="text-sm font-medium text-destructive mb-2">⚠️ Warning</p>
                      <p className="text-sm text-muted-foreground">
                        This action will permanently delete all your demo analysis sessions, 
                        practice history, and saved preparations. This cannot be undone.
                      </p>
                    </div>
                    <Button onClick={resetDemoData} variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Reset All Demo Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Calendar Integration
                  </CardTitle>
                  <CardDescription>
                    Connect your calendar to schedule interview preparation tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Google Calendar</h4>
                          <p className="text-sm text-muted-foreground">
                            Add prep tasks and interview dates to your calendar
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground">
                        Coming Soon
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-8 w-8 text-orange-500" />
                        <div>
                          <h4 className="font-medium">Outlook Calendar</h4>
                          <p className="text-sm text-muted-foreground">
                            Sync with Microsoft Outlook calendar
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground">
                        Coming Soon
                      </Badge>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/30 border-dashed border-2">
                      <p className="text-sm text-muted-foreground text-center">
                        Calendar integrations will be available in a future update. 
                        For now, you can manually export your prep plan as an ICS file.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}