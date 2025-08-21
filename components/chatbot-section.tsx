"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Lightbulb } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there, awesome student! 🤖✨ I'm MathBot, your friendly math helper! I'm here to help you with Grade 6 math - fractions, decimals, algebra, geometry, and so much more! What would you like to learn about today? 😊",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const botResponse = data.text || "Oops! I couldn't generate a response right now. Please try again!"

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "How do I add fractions?",
    "What is a decimal?",
    "How do I solve equations?",
    "What is area?",
    "What is probability?",
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">🤖 Your Math Helper Friend!</h2>
        <p className="text-xl text-gray-300">Ask me anything about Grade 6 math - I'm here to help you succeed!</p>
      </div>

      {/* Quick Questions */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-purple-600 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-xl">
            <Lightbulb className="w-6 h-6" />💡 Quick Questions to Get Started!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                onClick={() => setInputText(question)}
                variant="outline"
                className="border-2 border-purple-500 text-purple-300 hover:bg-purple-900/30 rounded-full px-6 py-3 font-semibold transform hover:scale-105 transition-all shadow-md"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-blue-600 shadow-xl rounded-3xl">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl transform hover:scale-105 transition-all shadow-lg ${
                    message.isBot
                      ? "bg-gradient-to-br from-purple-800 to-pink-800 text-purple-200 border-3 border-purple-600"
                      : "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-3 border-blue-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {message.isBot && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                    )}
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold mb-1">{message.isBot ? "🤖 MathBot" : "😊 You"}</p>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-purple-800 to-pink-800 text-purple-200 border-3 border-purple-600 px-6 py-4 rounded-3xl max-w-xs shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">🤖 MathBot</p>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-purple-600 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
            <div className="flex gap-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me a math question... 😊"
                className="flex-1 border-3 border-purple-600 focus:border-purple-500 rounded-2xl px-6 py-4 text-lg bg-black/20 text-white placeholder:text-gray-400"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-4 transform hover:scale-105 transition-all shadow-lg border-2 border-purple-500"
              >
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Topics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { topic: "Fractions", icon: "🍕", color: "from-red-800 to-red-900 border-red-600" },
          { topic: "Decimals", icon: "💰", color: "from-green-800 to-green-900 border-green-600" },
          { topic: "Algebra", icon: "⚖️", color: "from-blue-800 to-blue-900 border-blue-600" },
          { topic: "Geometry", icon: "🏠", color: "from-yellow-800 to-yellow-900 border-yellow-600" },
        ].map(({ topic, icon, color }) => (
          <Card
            key={topic}
            className={`bg-gradient-to-br ${color} border-4 cursor-pointer hover:shadow-lg transition-all transform hover:scale-110 rounded-3xl text-white`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <div className="font-bold text-lg">{topic}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
