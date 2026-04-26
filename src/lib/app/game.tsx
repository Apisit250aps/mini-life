'use client'
import { CardEntity } from '@/internal/entities/card.entity'
import { shuffle } from 'lodash'
import React, { createContext } from 'react'

export type GameEvent = {
  dangerous: CardEntity
  knowledge: CardEntity
}

export type State = 'idle' | 'event' | 'attack' | 'destroy' | 'game_over'

export type GameState = {
  // global
  state: State
  phase: number
  // player state
  health: number
  pickPoint: number
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
  defaultGameState: GameState
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
  const defaultGameState: GameState = {
    state: 'idle',
    phase: 0,
    health: 18,
    pickPoint: 0,
    scoreInHand: 0,
    cardsInHand: [],
    deck: [],
    trash: [],
    knowledge: shuffleCardsByType(cards, 'KNOWLEDGE'),
    dangerous: shuffleCardsByType(cards, 'DANGEROUS'),
    skill: shuffleCardsByType(cards, 'SKILL'),
    ageCards: shuffleCardsByType(cards, 'AGE'),
    gameEvent: [],
  }
  const [gameState, setGameState] = React.useState<GameState>(defaultGameState)

  return (
    <GameContext.Provider
      value={{
        // id
        gameId,
        // state
        gameState,
        // state updater
        setGameState,
        // default state
        defaultGameState,
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
