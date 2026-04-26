'use client'
import { useGameAction } from '@/lib/app/action'
import { useGame } from '@/lib/app/game'
import React from 'react'

export default function Page() {
  const { gameId } = useGame()
  const { drawCard } = useGameAction()
  
  const handleDrawCard = () => {
    const card = drawCard()
    if (card) {
      console.log('Drew card:', card)
    }
  }

  return (
    <main className="min-h-screen bg-background grid grid-cols-5">
      <div className=""></div>
      <section className="container mx-auto py-10 col-span-3">
        <h1>Game ID: {gameId}</h1>
      </section>
      <div className="">
        <button onClick={handleDrawCard} className="px-4 py-2 bg-blue-500 text-white rounded">
          draw
        </button>
      </div>
    </main>
  )
}
