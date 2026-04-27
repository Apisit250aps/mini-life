import { Dices, HandFist, RotateCcw, Sword, Swords } from 'lucide-react'

import { Dock, DockIcon } from '@/components/ui/dock'
import { useGameStore } from '@/lib/app/game.store'

export function GameActionDock() {
  const { state, randomEvents, pickCardWithHP, pickCardWithPP, resetGame } = useGameStore()

  return (
    <Dock className="sticky bottom-10 z-20 flex justify-center pb-1 border-white/40 bg-white/75 px-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <DockIcon
        className="bg-red-500 text-white"
        onClick={resetGame}
        title="รีเซ็ตเกม"
      >
        <RotateCcw />
      </DockIcon>
      {['idle', 'event'].includes(state) && (
        <DockIcon
          className="bg-sky-500 text-white"
          onClick={randomEvents}
          title="สุ่มเหตุการณ์"
        >
          <Dices />
        </DockIcon>
      )}
      {['attack'].includes(state) && (
        <>
          <DockIcon
            className="bg-primary text-white"
            onClick={pickCardWithPP}
            title="จั่วการ์ด"
          >
            <Sword />
          </DockIcon>
          <DockIcon className="bg-green-500 text-white" title="พร้อมรับมือ">
            <Swords />
          </DockIcon>
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
