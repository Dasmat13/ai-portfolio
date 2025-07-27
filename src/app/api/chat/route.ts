import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json()

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://your-site.com',
      'X-Title': 'Dasmat-AI-Portfolio'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7
    })
  })

  const data = await response.json()

  return NextResponse.json({
    message: data?.choices?.[0]?.message?.content || '⚠️ No response from model.'
  })
}
