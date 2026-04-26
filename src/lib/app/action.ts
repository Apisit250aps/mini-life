import { useCallback, useEffect } from 'react'
import { GameEvent, useGame } from './game'

const useGameAction = () => {
  const game = useGame()
  if (!game) {
    throw new Error('useGameAction must be used within a GameProvider')
  }

  const drawCard = () => {
    const card = game.gameState.skill[0]
    game.setGameState((prev) => ({
      ...prev,
      skill: prev.skill.slice(1),
      cardsInHand: [...prev.cardsInHand, card],
      scoreInHand: prev.scoreInHand + (card.score || 0),
    }))
    return card
  }

  const randomEvent = () => {
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
    }))
  }

  const selectEvent = (event: GameEvent) => {
    const unselect = game.gameState.gameEvent.filter((e) => e !== event)
    console.log(unselect.length)
    game.setGameState((prev) => ({
      ...prev,
      deck: [...prev.deck, event.knowledge, event.dangerous],
      gameEvent: [],
      selectEvent: event,
    }))
  }

  return {
    drawCard,
    randomEvent,
    selectEvent,
  }
}

export { useGameAction }
