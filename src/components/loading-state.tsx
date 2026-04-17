"use client"

import { motion } from "framer-motion"
import { Loader2, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function LoadingState() {
  return (
    <div className="container max-w-4xl py-12">
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Loading Analysis...</h2>
              <p className="text-muted-foreground">
                Please wait while we process your session data
              </p>
            </div>
            
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}