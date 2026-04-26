'use client'

import { useCallback, useEffect } from 'react'
import { GameEvent, useGame, shuffleCardsByType } from './game'
import { toast } from 'sonner'
import { useCardAction } from './skills'

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
    console.log('skill before', game.gameState.skill.length)
    if (!game.gameState.pickPoint) {
      toast.error('คุณไม่มีแต้มให้จั่วการ์ด')
      return null
    }

    const card = game.gameState.skill[0]
    const newSkillCards = game.gameState.skill.slice(1)
    const shouldReshuffle = newSkillCards.length === 0

    game.setGameState((prev) => {
      const updated = {
        ...prev,
        skill: newSkillCards,
        cardsInHand: [...prev.cardsInHand, card],
        scoreInHand: prev.scoreInHand + (card.score || 0),
        pickPoint: prev.pickPoint - 1,
        dangerousPoint: prev.dangerousPoint - (card.score || 0),
      }

      if (shouldReshuffle) {
        console.log('reshuffle skill')
        updated.skill = shuffleCardsByType([...updated.cardsInHand], 'SKILL')
      }

      return updated
    })
    console.log('skill after', newSkillCards.length)

    if (action.isPassiveSkill(card.action!)) {
      action.actionPassiveSkill(card.action)
    }

    return card
  }, [action, game])

  const randomEvent = useCallback(() => {
    if (game.gameState.state !== 'idle') {
      toast.error('ไม่สามารถสุ่มเหตุการณ์ได้ในขณะนี้')
      return
    }
    const events: GameEvent[] = []
    for (let i = 0; i < 3; i++) {
      const randomKnowledge = game.gameState.knowledge[i]
      const randomDangerous = game.gameState.dangerous[i]
      events.push({
        knowledge: randomKnowledge,
        dangerous: randomDangerous,
      })
    }
    game.setGameState((prev) => ({
      ...prev,
      dangerous: prev.dangerous.slice(3),
      knowledge: prev.knowledge.slice(3),
      gameEvent: [...prev.gameEvent, ...events],
      state: 'event',
    }))
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
