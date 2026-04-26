import { useGame } from './game'

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
    }))
    return card
  }

  return {
    drawCard,
  }
}

export { useGameAction }
