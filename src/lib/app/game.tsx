'use client'
import { CardEntity } from '@/internal/entities/card.entity'
import { shuffle } from 'lodash'
import React, { createContext, useEffect } from 'react'
import { useGameStore } from './game.store'

const GameContext = createContext<{ cards: CardEntity[] } | null>(null)

export const shuffleCardsByType = (cards: CardEntity[], type: string) =>
  shuffle(cards.filter((card) => card.card === type))

export function GameProvider({
  cards,
  children,
}: {
  cards: CardEntity[]
  children: React.ReactNode
}) {
  const shuffledCards = shuffle(cards)
  const { setupGame } = useGameStore()

  useEffect(() => {
    setupGame({
      deck: shuffledCards,
    })
  }, [setupGame, shuffledCards])

  return (
    <GameContext.Provider value={{ cards }}>{children}</GameContext.Provider>
  )
}

export const useGame = () => {
  const context = React.useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
