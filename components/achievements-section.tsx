"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star } from "lucide-react"
import { Play, Award, Zap, Crown } from "lucide-react"

interface UserProgress {
  videosWatched: number
  flashcardsCompleted: number
  quizzesCompleted: number
  totalPoints: number
  level: number
  badges: string[]
}

interface AchievementsSectionProps {
  userProgress: UserProgress
}

export default function AchievementsSection({ userProgress }: AchievementsSectionProps) {
  const allBadges = [
    { name: "Video Master", description: "Watched 5 video lessons!", icon: "📺" },
    { name: "Quiz Champion", description: "Completed 3 quizzes!", icon: "🎯" },
    { name: "Math Star", description: "Earned 500 total points!", icon: "⭐" },
    { name: "Fraction Fanatic", description: "Mastered fractions!", icon: "🍕" },
    { name: "Decimal Dynamo", description: "Conquered decimals!", icon: "💰" },
    { name: "Algebra Ace", description: "Solved tough equations!", icon: "⚖️" },
    { name: "Geometry Guru", description: "Explored shapes and space!", icon: "🏠" },
    { name: "Probability Pro", description: "Understood chances!", icon: "🎲" },
    { name: "Statistics Savvy", description: "Cracked data analysis!", icon: "📊" },
    { name: "Daily Streak", description: "Logged in 7 days in a row!", icon: "🗓️" },
    { name: "First Step", description: "Completed your first activity!", icon: "🚀" },
    { name: "Explorer", description: "Visited all sections of the app!", icon: "🗺️" },
  ]

  const achievements = [
    {
      id: "first_video",
      title: "First Steps",
      description: "Watch your first math video",
      icon: "🎬",
      requirement: 1,
      currentProgress: userProgress.videosWatched,
      category: "videos",
      unlocked: userProgress.videosWatched >= 1,
      points: 10,
    },
    {
      id: "video_master",
      title: "Video Master",
      description: "Watch 5 math videos",
      icon: "📺",
      requirement: 5,
      currentProgress: userProgress.videosWatched,
      category: "videos",
      unlocked: userProgress.videosWatched >= 5,
      points: 50,
    },
    {
      id: "binge_watcher",
      title: "Binge Watcher",
      description: "Watch all 10 videos",
      icon: "🍿",
      requirement: 10,
      currentProgress: userProgress.videosWatched,
      category: "videos",
      unlocked: userProgress.videosWatched >= 10,
      points: 100,
    },
    {
      id: "flashcard_starter",
      title: "Memory Builder",
      description: "Complete your first flashcard",
      icon: "🧠",
      requirement: 1,
      currentProgress: userProgress.flashcardsCompleted,
      category: "flashcards",
      unlocked: userProgress.flashcardsCompleted >= 1,
      points: 10,
    },
    {
      id: "flashcard_pro",
      title: "Flashcard Pro",
      description: "Complete 10 flashcards",
      icon: "⚡",
      requirement: 10,
      currentProgress: userProgress.flashcardsCompleted,
      category: "flashcards",
      unlocked: userProgress.flashcardsCompleted >= 10,
      points: 75,
    },
    {
      id: "memory_master",
      title: "Memory Master",
      description: "Complete all 15 flashcards",
      icon: "🎯",
      requirement: 15,
      currentProgress: userProgress.flashcardsCompleted,
      category: "flashcards",
      unlocked: userProgress.flashcardsCompleted >= 15,
      points: 150,
    },
    {
      id: "quiz_rookie",
      title: "Quiz Rookie",
      description: "Complete your first quiz",
      icon: "🎲",
      requirement: 1,
      currentProgress: userProgress.quizzesCompleted,
      category: "quizzes",
      unlocked: userProgress.quizzesCompleted >= 1,
      points: 25,
    },
    {
      id: "quiz_champion",
      title: "Quiz Champion",
      description: "Complete 3 quizzes",
      icon: "🏆",
      requirement: 3,
      currentProgress: userProgress.quizzesCompleted,
      category: "quizzes",
      unlocked: userProgress.quizzesCompleted >= 3,
      points: 100,
    },
    {
      id: "quiz_master",
      title: "Quiz Master",
      description: "Complete all 5 quizzes",
      icon: "👑",
      requirement: 5,
      currentProgress: userProgress.quizzesCompleted,
      category: "quizzes",
      unlocked: userProgress.quizzesCompleted >= 5,
      points: 200,
    },
    {
      id: "point_collector",
      title: "Point Collector",
      description: "Earn 100 points",
      icon: "⭐",
      requirement: 100,
      currentProgress: userProgress.totalPoints,
      category: "points",
      unlocked: userProgress.totalPoints >= 100,
      points: 50,
    },
    {
      id: "math_star",
      title: "Math Star",
      description: "Earn 500 points",
      icon: "🌟",
      requirement: 500,
      currentProgress: userProgress.totalPoints,
      category: "points",
      unlocked: userProgress.totalPoints >= 500,
      points: 100,
    },
    {
      id: "math_legend",
      title: "Math Legend",
      description: "Earn 1000 points",
      icon: "💫",
      requirement: 1000,
      currentProgress: userProgress.totalPoints,
      category: "points",
      unlocked: userProgress.totalPoints >= 1000,
      points: 250,
    },
    {
      id: "level_up",
      title: "Level Up!",
      description: "Reach Level 5",
      icon: "🚀",
      requirement: 5,
      currentProgress: userProgress.level,
      category: "special",
      unlocked: userProgress.level >= 5,
      points: 100,
    },
    {
      id: "math_explorer",
      title: "Math Explorer",
      description: "Reach Level 10",
      icon: "🗺️",
      requirement: 10,
      currentProgress: userProgress.level,
      category: "special",
      unlocked: userProgress.level >= 10,
      points: 200,
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "videos":
        return <Play className="w-5 h-5" />
      case "flashcards":
        return <Award className="w-5 h-5" />
      case "quizzes":
        return <Zap className="w-5 h-5" />
      case "points":
        return <Star className="w-5 h-5" />
      case "special":
        return <Crown className="w-5 h-5" />
      default:
        return <Trophy className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "videos":
        return "bg-blue-700 text-white border-blue-500"
      case "flashcards":
        return "bg-green-700 text-white border-green-500"
      case "quizzes":
        return "bg-orange-700 text-white border-orange-500"
      case "points":
        return "bg-purple-700 text-white border-purple-500"
      case "special":
        return "bg-yellow-700 text-white border-yellow-500"
      default:
        return "bg-gray-700 text-white border-gray-500"
    }
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">🏆 Your Awesome Badges!</h2>
        <p className="text-xl text-gray-300">Keep learning to unlock more amazing achievements!</p>
      </div>

      {/* Earned Badges */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-yellow-600 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400 text-xl">
            <Trophy className="w-6 h-6" />
            Earned Badges ({userProgress.badges.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userProgress.badges.length === 0 ? (
            <p className="text-gray-300 text-center py-4">
              No badges earned yet! Keep playing to get your first one! 🎉
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProgress.badges.map((badgeName, index) => {
                const badgeInfo = allBadges.find((b) => b.name === badgeName)
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-700 to-orange-700 text-white p-4 rounded-2xl flex items-center gap-4 shadow-lg border-3 border-yellow-600 transform hover:scale-105 transition-all"
                  >
                    <div className="text-4xl">{badgeInfo?.icon || "🏅"}</div>
                    <div>
                      <h4 className="font-bold text-lg">{badgeName}</h4>
                      <p className="text-sm opacity-90">{badgeInfo?.description || "A special achievement!"}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Possible Badges */}
      <Card className="bg-black/40 backdrop-blur-sm border-4 border-purple-600 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-xl">
            <Star className="w-6 h-6" />
            All Possible Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBadges.map((badge, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl flex items-center gap-4 shadow-md border-3 ${
                  userProgress.badges.includes(badge.name)
                    ? "bg-gradient-to-br from-green-700 to-blue-700 border-green-600 text-white"
                    : "bg-gray-800/50 border-gray-700 text-gray-400 opacity-70"
                }`}
              >
                <div className="text-4xl">{badge.icon}</div>
                <div>
                  <h4 className="font-bold text-lg">{badge.name}</h4>
                  <p className="text-sm">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Categories */}
      <Card className="border-2 border-purple-600 bg-purple-900/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Trophy className="w-5 h-5" />
            Achievement Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["videos", "flashcards", "quizzes", "points", "special"].map((category) => {
              const categoryAchievements = achievements.filter((a) => a.category === category)
              const unlockedInCategory = categoryAchievements.filter((a) => a.unlocked).length

              return (
                <div key={category} className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-2 rounded-full border-2 flex items-center justify-center ${getCategoryColor(category)}`}
                  >
                    {getCategoryIcon(category)}
                  </div>
                  <div className="font-bold text-sm capitalize text-gray-300">{category}</div>
                  <div className="text-xs text-gray-400">
                    {unlockedInCategory}/{categoryAchievements.length}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
