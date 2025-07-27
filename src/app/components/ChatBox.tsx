'use client'

import { useEffect, useRef, useState } from 'react'
import { SendHorizonal, Download, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ChatBoxProps {
  models: { id: string; name: string }[]
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  model?: string
}

export default function ChatBox({ models }: ChatBoxProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedModel, setSelectedModel] = useState(models[0].id)
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMsg, setStreamingMsg] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages, streamingMsg])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setIsTyping(true)
    setStreamingMsg('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, model: selectedModel })
      })

      const data = await res.json()

      if (res.ok && data.message) {
        simulateStreaming(data.message, selectedModel)
      } else {
        const fallback = selectedModel !== 'mixtral-8x7b' ? 'mixtral-8x7b' : null
        if (fallback) {
          setSelectedModel(fallback)
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: `⚠️ Model failed. Switched to fallback model: ${fallback}`,
              model: fallback
            }
          ])
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: `⚠️ Error: ${data?.message || 'Unknown error'}`,
              model: selectedModel
            }
          ])
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ ${err.message || 'Network error occurred.'}`,
          model: selectedModel
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const simulateStreaming = (text: string, model: string) => {
    let index = 0
    setStreamingMsg('')
    const interval = setInterval(() => {
      if (index < text.length) {
        setStreamingMsg((prev) => prev + text[index])
        index++
      } else {
        clearInterval(interval)
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: text, model }
        ])
        setStreamingMsg('')
      }
    }, 15) // speed
  }

  const exportChat = (type: 'json' | 'md') => {
    let blob
    if (type === 'json') {
      blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' })
    } else {
      const md = messages.map((m) => `**${m.role}**:\n${m.content}`).join('\n\n---\n\n')
      blob = new Blob([md], { type: 'text/markdown' })
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-export.${type}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-sm"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => exportChat('json')}
            title="Export as JSON"
            className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            JSON
          </button>
          <button
            onClick={() => exportChat('md')}
            title="Export as Markdown"
            className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            MD
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-2"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 h-64 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-200'}`}>
              {msg.role === 'assistant' && msg.model && (
                <div className="text-[10px] text-indigo-400 mb-1 italic">{msg.model}</div>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {streamingMsg && (
          <div className="flex items-start">
            <div className="text-sm bg-gray-200 dark:bg-gray-700 rounded-lg p-2 text-black dark:text-gray-200 max-w-[80%] whitespace-pre-wrap animate-pulse">
              {streamingMsg}
            </div>
          </div>
        )}

        {isTyping && (
          <div className="text-xs text-indigo-400 animate-pulse">AI is typing...</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded border dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  )
}
