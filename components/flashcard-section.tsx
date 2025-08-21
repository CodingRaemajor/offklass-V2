"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle } from "lucide-react"

interface Flashcard {
  id: number
  question: string
  answer: string
  topic: string
}

interface FlashcardSectionProps {
  onProgress: () => void
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is 3/4 + 1/2?",
    answer: "1 and 1/4 (or 5/4)",
    topic: "Fractions",
  },
  {
    id: 2,
    question: "Convert 0.75 to a fraction.",
    answer: "3/4",
    topic: "Decimals",
  },
  {
    id: 3,
    question: "If x + 7 = 15, what is x?",
    answer: "x = 8",
    topic: "Algebra",
  },
  {
    id: 4,
    question: "What is the area of a rectangle with length 5cm and width 3cm?",
    answer: "15 square cm",
    topic: "Geometry",
  },
  {
    id: 5,
    question: "What is 0.25 as a percentage?",
    answer: "25%",
    topic: "Decimals",
  },
  {
    id: 6,
    question: "Simplify the ratio 10:5.",
    answer: "2:1",
    topic: "Ratios",
  },
  {
    id: 7,
    question: "What is the perimeter of a square with side length 6m?",
    answer: "24 meters",
    topic: "Geometry",
  },
  {
    id: 8,
    question: "What is 1/3 of 12?",
    answer: "4",
    topic: "Fractions",
  },
  {
    id: 9,
    question: "Multiply 0.5 × 0.6.",
    answer: "0.30 or 0.3",
    topic: "Decimals",
  },
  {
    id: 10,
    question: "If a bag has 3 red balls and 2 blue balls, what is the probability of picking a red ball?",
    answer: "3/5",
    topic: "Probability",
  },
]

export default function FlashcardSection({ onProgress }: FlashcardSectionProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completedCards, setCompletedCards] = useState<number[]>([])
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)

  const currentCard = flashcards[currentCardIndex]

  useEffect(() => {
    // Reset state when component mounts or flashcards change
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setCompletedCards([])
    setCorrectCount(0)
    setIncorrectCount(0)
  }, [])

  const handleNextCard = () => {
    setShowAnswer(false)
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      // All cards completed, reset or show completion message
      alert("You've gone through all the flashcards! Great job!")
      setCurrentCardIndex(0) // Loop back to start
      setCompletedCards([]) // Reset completed for next round
      setCorrectCount(0)
      setIncorrectCount(0)
    }
  }

  const handlePrevCard = () => {
    setShowAnswer(false)
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer)
  }

  const handleMarkCorrect = () => {
    if (!completedCards.includes(currentCard.id)) {
      setCompletedCards((prev) => [...prev, currentCard.id])
      setCorrectCount((prev) => prev + 1)
      onProgress() // Update overall user progress
    }
    handleNextCard()
  }

  const handleMarkIncorrect = () => {
    if (!completedCards.includes(currentCard.id)) {
      setCompletedCards((prev) => [...prev, currentCard.id])
      setIncorrectCount((prev) => prev + 1)
    }
    handleNextCard()
  }

  const handleReset = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setCompletedCards([])
    setCorrectCount(0)
    setIncorrectCount(0)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">🧠 Flashcard Fun!</h2>
        <p className="text-xl text-gray-300">Test your memory and learn new math facts!</p>
      </div>

      {/* Flashcard Display */}
      <Card
        className="relative w-full max-w-2xl mx-auto h-96 perspective-1000 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-4 border-purple-700 shadow-2xl rounded-3xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardContent
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 backface-hidden transition-transform duration-700 rounded-3xl ${
            showAnswer ? "rotate-y-180" : ""
          }`}
        >
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-white/10 backdrop-blur-sm border-4 border-white/20 shadow-lg ${
              showAnswer ? "opacity-0" : "opacity-100"
            }`}
          >
            <CardTitle className="text-2xl font-bold text-white mb-4">Question:</CardTitle>
            <p className="text-4xl font-extrabold text-white text-center leading-snug">{currentCard.question}</p>
            <div className="absolute bottom-4 right-4 text-sm text-gray-300">Topic: {currentCard.topic}</div>
          </div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl bg-white/10 backdrop-blur-sm border-4 border-white/20 shadow-lg rotate-y-180 ${
              showAnswer ? "opacity-100" : "opacity-0"
            }`}
          >
            <CardTitle className="text-2xl font-bold text-white mb-4">Answer:</CardTitle>
            <p className="text-4xl font-extrabold text-white text-center leading-snug">{currentCard.answer}</p>
            <div className="absolute bottom-4 right-4 text-sm text-gray-300">Topic: {currentCard.topic}</div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-3 shadow-lg border-2 border-blue-500 transform hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Previous
        </Button>
        <Button
          onClick={handleFlipCard}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-3 shadow-lg border-2 border-purple-500 transform hover:scale-105 transition-all"
        >
          <RotateCcw className="w-5 h-5 mr-2" /> {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
        <Button
          onClick={handleNextCard}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-3 shadow-lg border-2 border-blue-500 transform hover:scale-105 transition-all"
        >
          Next <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Mark Correct/Incorrect */}
      {showAnswer && (
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={handleMarkCorrect}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6 py-3 shadow-lg border-2 border-green-500 transform hover:scale-105 transition-all"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> I Got It!
          </Button>
          <Button
            onClick={handleMarkIncorrect}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full px-6 py-3 shadow-lg border-2 border-red-500 transform hover:scale-105 transition-all"
          >
            <XCircle className="w-5 h-5 mr-2" /> Needs Practice
          </Button>
        </div>
      )}

      {/* Progress Stats */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-green-600 shadow-xl rounded-3xl">
        <CardContent className="p-6 flex justify-around items-center text-white">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{correctCount}</div>
            <div className="text-sm">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">{incorrectCount}</div>
            <div className="text-sm">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{completedCards.length}</div>
            <div className="text-sm">Completed</div>
          </div>
          <Button
            onClick={handleReset}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-full px-6 py-3 shadow-lg border-2 border-gray-500 transform hover:scale-105 transition-all"
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
