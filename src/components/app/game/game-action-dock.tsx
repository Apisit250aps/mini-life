import { Bandage, Dices, Swords } from 'lucide-react'

import { Dock, DockIcon } from '@/components/ui/dock'
import { useGameAction } from '@/lib/app/action'
import { useGame } from '@/lib/app/game'

export function GameActionDock() {
  const { gameId, gameState } = useGame()
  const { drawCard, randomEvent, selectEvent } = useGameAction()

  const handleDrawCard = () => {
    const card = drawCard()
    if (card) {
      console.log('Drew card:', card)
    }
  }

  const handleRandomEvent = () => {
    randomEvent()
  }
  return (
    <div className="sticky bottom-10 z-20 flex justify-center pb-1">
      <Dock className="border-white/40 bg-white/75 px-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        {['idle', 'event'].includes(gameState.state) && (
          <DockIcon
            className="bg-sky-500 text-white"
            onClick={handleRandomEvent}
            title="สุ่มเหตุการณ์"
          >
            <Dices />
          </DockIcon>
        )}
        {['attack'].includes(gameState.state) && (
          <>
            <DockIcon
              className="bg-primary text-white"
              onClick={handleDrawCard}
              title="จั่วการ์ด"
            >
              <Swords />
            </DockIcon>
            {gameState.pickPoint <= 0 && (
              <DockIcon
                className="bg-red-500 text-white"
                onClick={handleDrawCard}
                title="ฮึดสุดตัว"
              >
                <Bandage />
              </DockIcon>
            )}
          </>
        )}
      </Dock>
    </div>
  )
}
