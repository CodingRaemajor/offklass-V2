"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Lightbulb } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm MathBot, your friendly math helper! Ask me anything about 6th grade math - fractions, decimals, algebra, geometry, and more! What would you like to learn today? 🤖✨",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    "How do I add fractions?",
    "What are decimals?",
    "Help me with algebra",
    "Explain geometry basics",
    "What is probability?",
    "How do ratios work?",
  ]

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      // Call our API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textToSend }),
      })

      const data = await response.json()

      if (response.ok) {
        // Add bot response
        const botMessage: Message = {
          id: Date.now() + 1,
          text: data.message,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      } else {
        // Handle error
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: data.error || "Sorry, I had trouble understanding that. Can you try asking again? 🤔",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Oops! I'm having trouble connecting right now. Please try again in a moment! 😅",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">🤖 AI Math Helper!</h2>
        <p className="text-xl text-gray-300">Ask me anything about 6th grade math!</p>
      </div>

      {/* Chat Container */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-purple-600 shadow-xl rounded-3xl h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Bot className="w-6 h-6" />
            MathBot - Your AI Tutor
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3 rounded-2xl shadow-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white/90 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/90 text-gray-800 p-3 rounded-2xl rounded-bl-sm shadow-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-yellow-600 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Lightbulb className="w-6 h-6" />
            Quick Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-xl p-3 text-sm font-semibold transform hover:scale-105 transition-all shadow-lg border-2 border-yellow-500"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-green-600 shadow-xl rounded-3xl">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me a math question... 🤔"
              className="flex-1 bg-white/90 border-2 border-green-500 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-400"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl px-6 py-3 font-bold transform hover:scale-105 transition-all shadow-lg border-2 border-green-500"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
