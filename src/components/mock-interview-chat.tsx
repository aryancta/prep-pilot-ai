"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, User, Send, CheckCircle2, TrendingUp, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { PracticeSession } from "@/types"

interface MockInterviewChatProps {
  practiceSession: PracticeSession
  onAnswer: (answer: string) => void
  isLoading?: boolean
}

interface Message {
  id: string
  type: 'interviewer' | 'user' | 'feedback'
  content: string
  timestamp: Date
  feedback?: {
    strengths: string[]
    improvements: string[]
    suggestedAnswer?: string
    score: number
  }
}

export function MockInterviewChat({ practiceSession, onAnswer, isLoading = false }: MockInterviewChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'interviewer',
          content: `Hello! I'm your AI interview coach. I'll be conducting a mock interview based on your profile and the position you're applying for. Let's start with our first question.`,
          timestamp: new Date()
        }
      ])
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: currentAnswer,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    onAnswer(currentAnswer)
    setCurrentAnswer("")
    setIsTyping(true)

    // Simulate AI typing delay
    setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  const addFeedback = (feedback: any) => {
    const feedbackMessage: Message = {
      id: `feedback-${Date.now()}`,
      type: 'feedback',
      content: 'Here\'s my feedback on your answer:',
      timestamp: new Date(),
      feedback
    }

    setMessages(prev => [...prev, feedbackMessage])
  }

  const addNextQuestion = (question: string) => {
    const questionMessage: Message = {
      id: `question-${Date.now()}`,
      type: 'interviewer',
      content: question,
      timestamp: new Date()
    }

    setTimeout(() => {
      setMessages(prev => [...prev, questionMessage])
    }, 1000)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              {message.type !== 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-lg p-3 mb-2 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : message.type === 'feedback'
                    ? 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800'
                    : 'bg-muted'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Feedback content */}
                  {message.type === 'feedback' && message.feedback && (
                    <div className="mt-3 space-y-3">
                      <div>
                        <h5 className="font-medium text-green-700 dark:text-green-400 mb-1 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Strengths
                        </h5>
                        <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                          {message.feedback.strengths.map((strength, i) => (
                            <li key={i}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Areas for Improvement
                        </h5>
                        <ul className="text-sm text-amber-600 dark:text-amber-300 space-y-1">
                          {message.feedback.improvements.map((improvement, i) => (
                            <li key={i}>• {improvement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {message.feedback.suggestedAnswer && (
                        <div>
                          <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1">
                            <Lightbulb className="h-3 w-3" />
                            Suggestion
                          </h5>
                          <p className="text-sm text-blue-600 dark:text-blue-300">
                            {message.feedback.suggestedAnswer}
                          </p>
                        </div>
                      )}
                      
                      <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-blue-600 dark:text-blue-400">Response Score:</span>
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            {message.feedback.score}/100
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {message.type === 'user' 
                    ? 'You' 
                    : message.type === 'feedback'
                    ? 'AI Interviewer • Feedback'
                    : 'AI Interviewer'
                  } • {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-muted rounded-lg p-3 mb-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">AI Interviewer is thinking...</p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="space-y-3">
          <Textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[80px] resize-none"
            disabled={isLoading || isTyping}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmitAnswer()
              }
            }}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Press Cmd+Enter to submit
            </p>
            <Button
              onClick={handleSubmitAnswer}
              disabled={!currentAnswer.trim() || isLoading || isTyping}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>Analyzing...</>
              ) : (
                <>
                  Submit Answer
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}