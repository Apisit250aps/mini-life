'use client'
import { CardEntity } from '@/internal/entities/card.entity'
import { shuffle } from 'lodash'
import React, { createContext } from 'react'

export type GameEvent = {
  dangerous: CardEntity
  knowledge: CardEntity
}

export type GameState = {
  // player state
  health: number
  cardsInHand: CardEntity[]
  scoreInHand: number
  // environment state
  gameEvent: GameEvent[]
  selectEvent?: GameEvent
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
    health: 20,
    scoreInHand: 0,
    cardsInHand: [],
    deck: [],
    trash: [],
    knowledge: shuffleCardsByType(cards, 'KNOWLEDGE'),
    dangerous: shuffleCardsByType(cards, 'DANGEROUS'),
    skill: shuffleCardsByType(cards, 'SKILL'),
    ageCards: shuffleCardsByType(cards, 'AGE'),
    gameEvent: [],
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
