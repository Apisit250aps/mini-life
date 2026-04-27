import { Dices, HandFist, Play, RotateCcw, Sword, Swords } from 'lucide-react'

import { Dock, DockIcon } from '@/components/ui/dock'
import { useGameStore } from '@/lib/app/game.store'

export function GameActionDock() {
  const {
    state,
    player,
    randomEvents,
    pickCardWithHP,
    pickCardWithPP,
    resetGame,
    fightDangerous,
    readyIdle,
  } = useGameStore()

  return (
    <Dock className="sticky bottom-10 z-20 flex justify-center pb-1 border-white/40 bg-white/75 px-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <DockIcon
        className="bg-red-500 text-white"
        onClick={resetGame}
        title="รีเซ็ตเกม"
      >
        <RotateCcw />
      </DockIcon>
      {['idle'].includes(state) && (
        <DockIcon
          className="bg-sky-500 text-white"
          onClick={randomEvents}
          title="สุ่มเหตุการณ์"
        >
          <Dices />
        </DockIcon>
      )}
      {['destroy'].includes(state) && (
        <DockIcon
          className="bg-yellow-500 text-white"
          onClick={readyIdle}
          title="ต่อสู้กับอันตราย"
        >
          <Play />
        </DockIcon>
      )}
      {['attack'].includes(state) && (
        <>
          {player.pickPoint > 0 && (
            <DockIcon
              className="bg-primary text-white"
              onClick={pickCardWithPP}
              title="จั่วการ์ด"
            >
              <Sword />
            </DockIcon>
          )}
          {player.pickPoint <= 0 && (
            <DockIcon
              className="bg-yellow-500 text-white"
              onClick={fightDangerous}
              title="ต่อสู้กับอันตราย"
            >
              <Swords />
            </DockIcon>
          )}
          <DockIcon
            className="bg-red-500 text-white"
            onClick={pickCardWithHP}
            title="ฮึดสุดตัว"
          >
            <HandFist />
          </DockIcon>
        </>
      )}
    </Dock>
  )
}
