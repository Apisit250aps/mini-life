'use client'
import { useGame } from '@/lib/app/game'
import React from 'react'

export default function Page() {
  const { gameId } = useGame()
  return (
    <main className="min-h-screen bg-background grid grid-cols-5">
      <div className=""></div>
      <section className="container mx-auto py-10 col-span-3">
        <h1>Game ID: {gameId}</h1>
      </section>
      <div className=""></div>
    </main>
  )
}
