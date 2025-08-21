import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Ensure the prompt is a string
    if (typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Invalid prompt format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"), // Using the latest GPT-4o model
      system:
        "You are a friendly and encouraging math tutor for 6th graders. Explain concepts clearly, use simple language, and provide examples relevant to a child's world (like pizza, toys, games). Always be positive and supportive. Focus on Grade 6 math topics like fractions, decimals, algebra basics, geometry (area, perimeter), ratios, probability, and statistics (mean).",
      prompt: prompt,
    })

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return new Response(JSON.stringify({ error: "Failed to generate response from AI." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
