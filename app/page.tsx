"use client"

import { useState, useEffect } from "react"
import {
  BookOpen,
  Brain,
  Trophy,
  Star,
  Play,
  MessageCircle,
  Target,
  Zap,
  GraduationCap,
  Heart,
  RotateCcw,
} from "lucide-react"
import VideoSection from "@/components/video-section"
import FlashcardSection from "@/components/flashcard-section"
import QuizSection from "@/components/quiz-section"
import ChatbotSection from "@/components/chatbot-section"
import AchievementsSection from "@/components/achievements-section"

interface UserProgress {
  videosWatched: number
  flashcardsCompleted: number
  quizzesCompleted: number
  totalPoints: number
  level: number
  badges: string[]
}

export default function MathLearningGame() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [userProgress, setUserProgress] = useState<UserProgress>({
    videosWatched: 0,
    flashcardsCompleted: 0,
    quizzesCompleted: 0,
    totalPoints: 0,
    level: 1,
    badges: [],
  })

  useEffect(() => {
    const savedProgress = localStorage.getItem("mathGameProgress")
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("mathGameProgress", JSON.stringify(userProgress))
  }, [userProgress])

  const updateProgress = (type: string, points = 10) => {
    setUserProgress((prev) => {
      const newProgress = { ...prev }

      switch (type) {
        case "video":
          newProgress.videosWatched += 1
          break
        case "flashcard":
          newProgress.flashcardsCompleted += 1
          break
        case "quiz":
          newProgress.quizzesCompleted += 1
          points = 50
          break
      }

      newProgress.totalPoints += points
      newProgress.level = Math.floor(newProgress.totalPoints / 100) + 1

      if (newProgress.videosWatched >= 5 && !newProgress.badges.includes("Video Master")) {
        newProgress.badges.push("Video Master")
      }
      if (newProgress.quizzesCompleted >= 3 && !newProgress.badges.includes("Quiz Champion")) {
        newProgress.badges.push("Quiz Champion")
      }
      if (newProgress.totalPoints >= 500 && !newProgress.badges.includes("Math Star")) {
        newProgress.badges.push("Math Star")
      }

      return newProgress
    })
  }

  const resetAllProgress = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all your progress? This will clear all your points, badges, and completed activities. This action cannot be undone!",
    )

    if (confirmReset) {
      // Reset user progress state
      const initialProgress: UserProgress = {
        videosWatched: 0,
        flashcardsCompleted: 0,
        quizzesCompleted: 0,
        totalPoints: 0,
        level: 1,
        badges: [],
      }

      setUserProgress(initialProgress)

      // Clear all localStorage data
      localStorage.removeItem("mathGameProgress")
      localStorage.removeItem("watchedVideos")
      localStorage.removeItem("completedFlashcards")
      localStorage.removeItem("completedQuizzes")

      // Show success message
      alert("🎉 All progress has been reset! You can start your math adventure fresh!")

      // Navigate back to dashboard
      setActiveSection("dashboard")
    }
  }

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-pink-700 p-8 rounded-3xl relative overflow-hidden shadow-lg border-4 border-purple-500">
          {/* Decorative school elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-6 text-3xl">📚</div>
            <div className="absolute top-6 right-8 text-2xl">✏️</div>
            <div className="absolute bottom-4 left-8 text-3xl">🎨</div>
            <div className="absolute bottom-6 right-6 text-2xl">📐</div>
            <div className="absolute top-1/2 left-1/4 text-2xl">⭐</div>
            <div className="absolute top-1/3 right-1/3 text-2xl">🌟</div>
          </div>

          <div className="relative z-10 text-center text-white">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-3 border-white/30 shadow-lg">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold drop-shadow-lg">Math Adventure!</h1>
                <p className="text-xl opacity-90">Grade 6 Explorer</p>
              </div>
            </div>

            {/* Stats Display */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold text-lg">{userProgress.totalPoints} Points</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30 shadow-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold text-lg">{userProgress.badges.length} Badges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userProgress.videosWatched}/10</div>
              <div className="text-sm opacity-90">Videos</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xl font-bold">📺 Watch & Learn</div>
            <div className="text-sm opacity-90">Fun video lessons</div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(userProgress.videosWatched / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userProgress.flashcardsCompleted}/15</div>
              <div className="text-sm opacity-90">Cards</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xl font-bold">🧠 Memory Cards</div>
            <div className="text-sm opacity-90">Practice & remember</div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(userProgress.flashcardsCompleted / 15) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userProgress.quizzesCompleted}/10</div>
              <div className="text-sm opacity-90">Quizzes</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xl font-bold">🎯 Quiz Time</div>
            <div className="text-sm opacity-90">Test your skills</div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(userProgress.quizzesCompleted / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Activity Menu */}
      <div className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-4 border-purple-500">
        <h3 className="text-white text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-red-400" />
          Choose Your Adventure!
          <Heart className="w-6 h-6 text-red-400" />
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveSection("videos")}
            className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transform hover:scale-110 transition-all duration-200 active:scale-95 shadow-lg border-3 border-blue-500"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Videos</span>
            <span className="text-sm opacity-90">📺 Watch & Learn</span>
          </button>

          <button
            onClick={() => setActiveSection("flashcards")}
            className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transform hover:scale-110 transition-all duration-200 active:scale-95 shadow-lg border-3 border-green-500"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Cards</span>
            <span className="text-sm opacity-90">🧠 Memory Game</span>
          </button>

          <button
            onClick={() => setActiveSection("quiz")}
            className="bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transform hover:scale-110 transition-all duration-200 active:scale-95 shadow-lg border-3 border-orange-500"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Quiz</span>
            <span className="text-sm opacity-90">🎯 Test Time</span>
          </button>

          <button
            onClick={() => setActiveSection("chatbot")}
            className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transform hover:scale-110 transition-all duration-200 active:scale-95 shadow-lg border-3 border-purple-500"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Helper</span>
            <span className="text-sm opacity-90">🤖 Ask Me!</span>
          </button>
        </div>
      </div>

      {/* Reset Progress Button */}
      <div className="text-center">
        <button
          onClick={resetAllProgress}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all shadow-lg border-3 border-red-500 flex items-center gap-3 mx-auto"
        >
          <RotateCcw className="w-6 h-6" />🔄 Reset All Progress
        </button>
        <p className="text-gray-400 text-sm mt-2">This will clear all your points, badges, and completed activities</p>
      </div>

      {/* Achievement Showcase */}
      {userProgress.badges.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-3xl shadow-xl border-4 border-yellow-500">
          <h3 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-7 h-7" />🎉 Amazing Work! You Earned These Badges! 🎉
          </h3>
          <div className="flex flex-wrap gap-3">
            {userProgress.badges.map((badge, index) => (
              <div
                key={index}
                className="bg-white/90 text-gray-800 px-6 py-3 rounded-full border-3 border-white shadow-lg transform hover:scale-105 transition-all font-bold"
              >
                🏆 {badge}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, #1a202c 0%, #2d3748 100%)
      `,
      }}
    >
      {/* Cool Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0),
          radial-gradient(circle at 75px 75px, rgba(255,255,255,0.05) 1px, transparent 0)
        `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-500 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-pink-500 rounded-full opacity-20 blur-lg"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-green-500 rounded-full opacity-20 blur-lg"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-2xl"></div>

      {/* Header */}
      <nav className="bg-black/60 backdrop-blur-lg shadow-lg border-b-4 border-purple-700 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Math Adventure
                </h1>
                <p className="text-sm text-gray-300">Grade 6 Learning Fun!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-purple-800/50 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-purple-600 shadow-md">
                <div className="flex items-center gap-2 text-purple-300">
                  <Star className="w-5 h-5" />
                  <span className="font-bold text-lg">{userProgress.totalPoints} Points</span>
                </div>
              </div>
              <div className="bg-pink-800/50 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-pink-600 shadow-md"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Navigation Tabs */}
        <div className="bg-black/60 backdrop-blur-lg p-3 rounded-3xl mb-8 shadow-lg border-3 border-purple-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "dashboard", label: "Home", icon: BookOpen, emoji: "🏠" },
              { id: "videos", label: "Videos", icon: Play, emoji: "📺" },
              { id: "flashcards", label: "Cards", icon: Brain, emoji: "🧠" },
              { id: "quiz", label: "Quiz", icon: Target, emoji: "🎯" },
              { id: "chatbot", label: "Helper", icon: MessageCircle, emoji: "🤖" },
              { id: "achievements", label: "Badges", icon: Trophy, emoji: "🏆" },
            ].map(({ id, label, icon: Icon, emoji }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md ${
                  activeSection === id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-2 border-purple-400"
                    : "text-gray-200 hover:text-purple-300 hover:bg-purple-900/30 bg-black/30 border-2 border-gray-700"
                }`}
              >
                <span className="text-lg">{emoji}</span>
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-4 border-white/20">
          {activeSection === "dashboard" && renderDashboard()}
          {activeSection === "videos" && <VideoSection onProgress={() => updateProgress("video")} />}
          {activeSection === "flashcards" && <FlashcardSection onProgress={() => updateProgress("flashcard")} />}
          {activeSection === "quiz" && <QuizSection onProgress={() => updateProgress("quiz")} />}
          {activeSection === "chatbot" && <ChatbotSection />}
          {activeSection === "achievements" && <AchievementsSection userProgress={userProgress} />}
        </div>
      </div>
    </div>
  )
}
