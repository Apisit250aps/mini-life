'use client'

import { useCallback, useEffect } from 'react'
import { GameEvent, useGame, shuffleCardsByType } from './game'
import { toast } from 'sonner'
import { useCardAction } from './skills'
import { CardEntity } from '@/internal/entities/card.entity'

const useGameAction = () => {
  const action = useCardAction()

  const game = useGame()
  if (!game) {
    throw new Error('useGameAction must be used within a GameProvider')
  }

  const { defaultGameState } = game
  const resetGame = useCallback(() => {
    game.setGameState(defaultGameState)
  }, [defaultGameState, game])

  const drawCard = useCallback(() => {
    if (game.gameState.state !== 'attack') {
      toast.error('คุณไม่สามารถจั่วการ์ดได้ในขณะนี้')
      return null
    }
    game.setGameState((prev) => {
      if (!prev.pickPoint) {
        toast.error('คุณไม่มีแต้มให้จั่วการ์ด')
        return prev
      }

      const card = prev.skill[0]
      if (!card) {
        return prev
      }

      const nextSkillCards = prev.skill.slice(1)

      const updated = {
        ...prev,
        skill: nextSkillCards,
        cardsInHand: [...prev.cardsInHand, card],
        scoreInHand: prev.scoreInHand + (card.score || 0),
        pickPoint: prev.pickPoint - 1,
        dangerousPoint: prev.dangerousPoint - (card.score || 0),
      }

      if (nextSkillCards.length === 0) {
        updated.skill = shuffleCardsByType([...updated.cardsInHand], 'SKILL')
      }

      if (action.isActiveSkill(card.action || '')) {
        action.actionPassiveSkill(card.action!)
      }

      return updated
    })
  }, [action, game])

  const randomEvent = useCallback(() => {
    let blocked = false
    game.setGameState((prev) => {
      if (prev.state !== 'idle') {
        blocked = true
        return prev
      }

      const events: GameEvent[] = Array.from({ length: 3 })
        .map((_, i) => ({
          knowledge: prev.knowledge[i],
          dangerous: prev.dangerous[i],
        }))
        .filter((event): event is GameEvent =>
          Boolean(event.knowledge && event.dangerous),
        )

      return {
        ...prev,
        dangerous: prev.dangerous.slice(3),
        knowledge: prev.knowledge.slice(3),
        gameEvent: [...prev.gameEvent, ...events],
        state: 'event',
      }
    })

    if (blocked) {
      toast.error('ไม่สามารถสุ่มเหตุการณ์ได้ในขณะนี้')
    }
  }, [game])

  const selectEvent = useCallback(
    (event: GameEvent) => {
      game.setGameState((prev) => ({
        ...prev,
        deck: [...prev.deck, event.knowledge, event.dangerous],
        gameEvent: [],
        selectEvent: event,
        pickPoint: event.dangerous.pick || 0,
        state: 'attack',
        dangerousPoint: event.dangerous.dangerous?.[prev.phase] || 0,
      }))
    },
    [game],
  )

  const hurt = useCallback(() => {
    game.setGameState((prev) => ({
      ...prev,
      health: prev.health - 1,
      pickPoint: prev.pickPoint + 1,
    }))
    drawCard()
  }, [game, drawCard])

  useEffect(() => {
    if (game.gameState.health <= 0) {
      resetGame()
      toast.error('เกมจบแล้ว! คุณแพ้แล้วนะ')
    }
  }, [game.gameState.health, resetGame])

  return {
    drawCard,
    randomEvent,
    selectEvent,
    hurt,
    resetGame,
  }
}

export { useGameAction }
