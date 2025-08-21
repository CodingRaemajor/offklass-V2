import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are MathBot, a friendly and encouraging AI tutor for 6th grade students. 
      Your job is to help kids learn math in a fun, easy-to-understand way. 
      Always be positive, use simple language, and include emojis to make learning fun! 
      Break down complex problems into simple steps. 
      If a student is struggling, offer encouragement and try a different approach.
      Keep responses concise but helpful - aim for 2-3 sentences unless more detail is needed.
      Topics you help with include: fractions, decimals, basic algebra, geometry, ratios, probability, and statistics.`,
      prompt: prompt,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return Response.json(
      { error: "Sorry, I had trouble understanding that. Can you try asking again?" },
      { status: 500 },
    )
  }
}
