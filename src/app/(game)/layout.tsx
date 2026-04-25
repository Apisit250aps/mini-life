import cardRepository from '@/internal/repositories/card.repo'
import { GameProvider } from '@/lib/app/game'
import React from 'react'
import { v7 as uuidv7 } from 'uuid'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cards = await cardRepository.findAll({})
  const gameId = uuidv7()
  return (
    <GameProvider gameId={gameId} cards={cards}>
      {children}
    </GameProvider>
  )
}
