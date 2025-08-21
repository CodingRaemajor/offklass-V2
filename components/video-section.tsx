"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, CheckCircle, BookOpen } from "lucide-react"

interface VideoLesson {
  id: number
  title: string
  description: string
  youtubeId: string // Just the ID part of the YouTube URL
  topic: string
}

interface VideoSectionProps {
  onProgress: () => void
}

const videoLessons: VideoLesson[] = [
  {
    id: 1,
    title: "Understanding Fractions",
    description: "Learn the basics of fractions, numerators, and denominators.",
    youtubeId: "mgI_F1_s_18",
    topic: "Fractions",
  },
  {
    id: 2,
    title: "Adding and Subtracting Fractions",
    description: "Master adding and subtracting fractions with common and uncommon denominators.",
    youtubeId: "m_gC5g_f-1g",
    topic: "Fractions",
  },
  {
    id: 3,
    title: "Introduction to Decimals",
    description: "Explore what decimals are and how they relate to fractions.",
    youtubeId: "kd_x_g_y_18",
    topic: "Decimals",
  },
  {
    id: 4,
    title: "Multiplying and Dividing Decimals",
    description: "Learn the rules for multiplying and dividing decimal numbers.",
    youtubeId: "v6_g_g_g_1g",
    topic: "Decimals",
  },
  {
    id: 5,
    title: "Basics of Algebra: Variables",
    description: "Understand what variables are and how they are used in algebraic expressions.",
    youtubeId: "NybHckSEQBI",
    topic: "Algebra",
  },
  {
    id: 6,
    title: "Solving One-Step Equations",
    description: "Learn how to solve simple equations using inverse operations.",
    youtubeId: "Qyd_g_g_g_1g",
    topic: "Algebra",
  },
  {
    id: 7,
    title: "Area and Perimeter of Rectangles",
    description: "Calculate the area and perimeter of rectangular shapes.",
    youtubeId: "A_g_g_g_g_1g",
    topic: "Geometry",
  },
  {
    id: 8,
    title: "Introduction to Ratios",
    description: "Discover how ratios compare quantities and how to simplify them.",
    youtubeId: "g_g_g_g_g_1g",
    topic: "Ratios",
  },
  {
    id: 9,
    title: "Understanding Probability",
    description: "Learn about the likelihood of events and how to calculate basic probabilities.",
    youtubeId: "g_g_g_g_g_1h",
    topic: "Probability",
  },
  {
    id: 10,
    title: "Mean, Median, Mode, and Range",
    description: "An introduction to basic statistical concepts.",
    youtubeId: "g_g_g_g_g_1i",
    topic: "Statistics",
  },
]

export default function VideoSection({ onProgress }: VideoSectionProps) {
  const [watchedVideos, setWatchedVideos] = useState<number[]>([])

  const handleVideoWatched = (videoId: number) => {
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos((prev) => [...prev, videoId])
      onProgress() // Update overall user progress
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-3">📺 Video Lessons!</h2>
        <p className="text-xl text-gray-300">Watch fun videos to learn new math concepts!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="bg-black/40 backdrop-blur-sm border-4 border-blue-600 shadow-xl rounded-3xl text-white overflow-hidden"
          >
            <CardHeader className="p-0">
              <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold mb-2 flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-blue-400" />
                {lesson.title}
              </CardTitle>
              <p className="text-gray-300 text-sm mb-4">{lesson.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> {lesson.topic}
                </span>
                <Button
                  onClick={() => handleVideoWatched(lesson.id)}
                  disabled={watchedVideos.includes(lesson.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg border-2 ${
                    watchedVideos.includes(lesson.id)
                      ? "bg-green-600 text-white border-green-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-blue-500 transform hover:scale-105 transition-all"
                  }`}
                >
                  {watchedVideos.includes(lesson.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" /> Watched!
                    </>
                  ) : (
                    "Mark as Watched"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
