"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCcw, Target, ArrowRight } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  topic: string
}

interface QuizSectionProps {
  onProgress: () => void
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the value of 5²?",
    options: ["10", "25", "50", "5"],
    correctAnswer: "25",
    topic: "Exponents",
  },
  {
    id: 2,
    question: "Which fraction is equivalent to 0.8?",
    options: ["1/2", "3/4", "4/5", "7/10"],
    correctAnswer: "4/5",
    topic: "Decimals & Fractions",
  },
  {
    id: 3,
    question: "If a triangle has angles 60°, 70°, what is the third angle?",
    options: ["50°", "60°", "70°", "80°"],
    correctAnswer: "50°",
    topic: "Geometry",
  },
  {
    id: 4,
    question: "Solve for y: y - 12 = 20",
    options: ["8", "12", "20", "32"],
    correctAnswer: "32",
    topic: "Algebra",
  },
  {
    id: 5,
    question: "What is the least common multiple (LCM) of 4 and 6?",
    options: ["2", "12", "24", "6"],
    correctAnswer: "12",
    topic: "Number Theory",
  },
  {
    id: 6,
    question: "What is the product of 1.5 and 4?",
    options: ["0.6", "6", "60", "0.06"],
    correctAnswer: "6",
    topic: "Decimals",
  },
  {
    id: 7,
    question: "How many sides does a hexagon have?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6",
    topic: "Geometry",
  },
  {
    id: 8,
    question: "What is the ratio of vowels to consonants in the word 'MATH'?",
    options: ["1:3", "3:1", "2:2", "1:4"],
    correctAnswer: "1:3",
    topic: "Ratios",
  },
  {
    id: 9,
    question: "Calculate the mean of these numbers: 10, 20, 30.",
    options: ["10", "20", "30", "60"],
    correctAnswer: "20",
    topic: "Statistics",
  },
  {
    id: 10,
    question: "If you roll a standard six-sided die, what is the probability of rolling an even number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    correctAnswer: "1/2",
    topic: "Probability",
  },
]

export default function QuizSection({ onProgress }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return

    setIsAnswered(true)
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setQuizCompleted(true)
      onProgress() // Update overall user progress for quiz completion
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">🎯 Quiz Challenge!</h2>
        <p className="text-xl text-gray-300">Test your knowledge and earn points!</p>
      </div>

      {!quizCompleted ? (
        <Card className="bg-black/40 backdrop-blur-sm border-4 border-orange-600 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400 text-xl">
              <Target className="w-6 h-6" />
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-2xl font-bold text-white mb-6">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-md border-2
                    ${
                      isAnswered
                        ? option === currentQuestion.correctAnswer
                          ? "bg-green-600 text-white border-green-500"
                          : selectedOption === option
                            ? "bg-red-600 text-white border-red-500"
                            : "bg-gray-700 text-gray-300 border-gray-600 opacity-70"
                        : selectedOption === option
                          ? "bg-orange-500 text-white border-orange-400"
                          : "bg-gray-800/50 text-gray-200 border-gray-700 hover:bg-gray-700/50"
                    }
                  `}
                  disabled={isAnswered}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
              {!isAnswered && (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-full px-8 py-4 shadow-lg border-2 border-orange-500 transform hover:scale-105 transition-all"
                >
                  Submit Answer
                </Button>
              )}
              {isAnswered && (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-8 py-4 shadow-lg border-2 border-blue-500 transform hover:scale-105 transition-all"
                >
                  Next Question <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              {isAnswered && (
                <div className="flex items-center gap-2 text-white text-lg font-bold">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-400" /> Correct!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-400" /> Incorrect.
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-black/40 backdrop-blur-sm border-4 border-green-600 shadow-xl rounded-3xl text-white text-center p-8">
          <CardTitle className="text-4xl font-bold mb-4">Quiz Completed!</CardTitle>
          <p className="text-2xl mb-6">
            You scored <span className="text-green-400 font-extrabold">{score}</span> out of{" "}
            <span className="font-extrabold">{quizQuestions.length}</span>!
          </p>
          <Button
            onClick={handleRestartQuiz}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-4 shadow-lg border-2 border-purple-500 transform hover:scale-105 transition-all"
          >
            <RefreshCcw className="w-5 h-5 mr-2" /> Play Again!
          </Button>
        </Card>
      )}
    </div>
  )
}
