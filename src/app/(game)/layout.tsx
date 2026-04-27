import { CardEntity } from '@/internal/entities/card.entity'
import cardRepository from '@/internal/repositories/card.repo'
import { GameProvider } from '@/lib/app/game'
import { shuffle } from 'lodash'
import React from 'react'
import { v7 as uuidv7 } from 'uuid'

import { hack } from '@/lib/app/card-set-hacker'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const cards = await cardRepository.findAll({})
  // const gameId = uuidv7()

  const deck = hack.flatMap((card) =>
    Array.from({ length: card.unit }, () => {
      const id = uuidv7()
      return {
        ...card,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as CardEntity
    }),
  )
  console.log('deck', deck)

  return (
    <GameProvider cards={shuffle(deck as CardEntity[])}>
      {children}
    </GameProvider>
  )
}
