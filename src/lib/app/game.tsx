'use client'
import { CardEntity } from '@/internal/entities/card.entity'
import { shuffle } from 'lodash'
import React, { createContext, use, useEffect } from 'react'

type GameState = {
  health: number
  age: number
  knowledgeLevel: number
  // cards data
  deck: CardEntity[]
  trash: CardEntity[]
  // knowledge cards that player has picked
  knowledge: CardEntity[]
  dangerous: CardEntity[]
  skill: CardEntity[]
  ageCards: CardEntity[]
}

type GameContextValue = {
  gameId: string
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  // state
}

const GameContext = createContext<GameContextValue | null>(null)

export const shuffleCardsByType = (cards: CardEntity[], type: string) =>
  shuffle(cards.filter((card) => card.card === type))

export function GameProvider({
  gameId,
  cards,
  children,
}: {
  gameId: string
  cards: CardEntity[]
  children: React.ReactNode
}) {
  const [gameState, setGameState] = React.useState<GameState>({
    health: 10,
    age: 0,
    knowledgeLevel: 0,
    deck: [],
    trash: [],
    knowledge: shuffleCardsByType(cards, 'KNOWLEDGE'),
    dangerous: shuffleCardsByType(cards, 'DANGEROUS'),
    skill: shuffleCardsByType(cards, 'SKILL'),
    ageCards: shuffleCardsByType(cards, 'AGE'),
  })

  return (
    <GameContext.Provider
      value={{
        // id
        gameId,
        // state
        gameState,
        // state updater
        setGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = React.useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
