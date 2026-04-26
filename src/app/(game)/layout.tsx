import { CardEntity } from '@/internal/entities/card.entity'
import cardRepository from '@/internal/repositories/card.repo'
import { GameProvider } from '@/lib/app/game'
import { shuffle } from 'lodash'
import React from 'react'
import { v7 as uuidv7 } from 'uuid'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cards = await cardRepository.findAll({})
  const gameId = uuidv7()

  const deck = cards.flatMap((card) =>
    Array.from({ length: card.unit }, () => {
      const id = uuidv7()
      return { ...card, id }
    }),
  )

  return (
    <GameProvider gameId={gameId} cards={shuffle(deck)}>
      {children}
    </GameProvider>
  )
}
