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
  dangerousPoint: number
}

type GameContextValue = {
  gameId: string
  gameState: GameState
  defaultGameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  // state
}

type GameAction =
  | { type: 'SET'; payload: React.SetStateAction<GameState> }
  | { type: 'RESET'; payload: GameState }

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET':
      return typeof action.payload === 'function'
        ? action.payload(state)
        : action.payload
    case 'RESET':
      return action.payload
    default:
      return state
  }
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
  const defaultGameState = React.useMemo<GameState>(
    () => ({
      state: 'idle',
      phase: 0,
      health: 18,
      pickPoint: 0,
      dangerousPoint: 0,
      scoreInHand: 0,
      cardsInHand: [],
      deck: [],
      trash: [],
      knowledge: shuffleCardsByType(cards, 'KNOWLEDGE'),
      dangerous: shuffleCardsByType(cards, 'DANGEROUS'),
      skill: shuffleCardsByType(cards, 'SKILL'),
      ageCards: shuffleCardsByType(cards, 'AGE'),
      gameEvent: [],
    }),
    [cards],
  )
  const [gameState, dispatch] = React.useReducer(gameReducer, defaultGameState)

  const setGameState = React.useCallback<
    React.Dispatch<React.SetStateAction<GameState>>
  >((nextState) => {
    dispatch({ type: 'SET', payload: nextState })
  }, [])

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
