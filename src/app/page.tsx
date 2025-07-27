'use client'

import { useState } from 'react'
import ChatBox from './components/ChatBox'

const models = [
  { id: 'HuggingFaceH4/zephyr-7b-beta', name: 'Zephyr 7B Beta' },
  { id: 'mistralai/mixtral-8x7b-instruct', name: 'Mixtral 8x7B' },
  { id: 'google/gemma-7b-it', name: 'Gemma 7B IT' }
]

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">🌟 Welcome to Dasmat's AI Portfolio</h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2">This portfolio showcases my projects and integrates a live AI chat assistant using OpenRouter models. Built with Next.js, TailwindCSS, and ❤️.</p>
      </header>

      <section className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 transition duration-500">
        <h2 className="text-3xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">🤖 Ask Me Anything</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Chat with my integrated AI assistant powered by OpenRouter models.</p>
        <ChatBox models={models} />
      </section>

      <footer className="text-center text-sm text-gray-500 mt-10 dark:text-gray-400">
        © 2025 Dasmat's Portfolio. All rights reserved.
      </footer>
    </main>
  )
}
