'use client'
import { CardEntity } from '@/internal/entities/card.entity'
import React, { createContext, useEffect } from 'react'

type GameContextValue = {
  gameId: string
  // state
  health: number
  age: number
  knowledgeLevel: number
  // cards data
  cards: CardEntity[]
  deck: CardEntity[]
  trash: CardEntity[]
  knowledge: CardEntity[]
  // actions
  setHealth: React.Dispatch<React.SetStateAction<number>>
  setAge: React.Dispatch<React.SetStateAction<number>>
  setKnowledgeLevel: React.Dispatch<React.SetStateAction<number>>
  // card actions
  setDeck: React.Dispatch<React.SetStateAction<CardEntity[]>>
  setTrash: React.Dispatch<React.SetStateAction<CardEntity[]>>
  setKnowledge: React.Dispatch<React.SetStateAction<CardEntity[]>>
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({
  gameId,
  cards,
  children,
}: {
  gameId: string
  cards: CardEntity[]
  children: React.ReactNode
}) {
  const [health, setHealth] = React.useState(100)
  const [age, setAge] = React.useState(0)
  const [knowledgeLevel, setKnowledgeLevel] = React.useState(0)
  // card actions
  const [deck, setDeck] = React.useState<CardEntity[]>(cards)
  const [trash, setTrash] = React.useState<CardEntity[]>([])
  const [knowledge, setKnowledge] = React.useState<CardEntity[]>([])
  return (
    <GameContext.Provider
      value={{
        // id
        gameId,
        // state
        health,
        age,
        knowledgeLevel,
        cards,
        deck,
        trash,
        knowledge,
        // actions
        setHealth,
        setAge,
        setKnowledgeLevel,
        setDeck,
        setTrash,
        setKnowledge,
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
