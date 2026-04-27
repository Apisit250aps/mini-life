import { Bandage, Dices, HandFist, Sword, Swords } from 'lucide-react'

import { Dock, DockIcon } from '@/components/ui/dock'
import { useGame } from '@/lib/app/game'
import { useGameStore } from '@/lib/app/game.store'

export function GameActionDock() {
  const { state, player } = useGameStore()
  const handleDrawCard = () => {}

  const handleRandomEvent = () => {}
  return (
    <Dock className="sticky bottom-10 z-20 flex justify-center pb-1 border-white/40 bg-white/75 px-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      {['idle', 'event'].includes(state) && (
        <DockIcon
          className="bg-sky-500 text-white"
          onClick={handleRandomEvent}
          title="สุ่มเหตุการณ์"
        >
          <Dices />
        </DockIcon>
      )}
      {['attack'].includes(state) && (
        <>
          <DockIcon
            className="bg-primary text-white"
            onClick={handleDrawCard}
            title="จั่วการ์ด"
          >
            <Sword />
          </DockIcon>
          <DockIcon className="bg-green-500 text-white" title="พร้อมรับมือ">
            <Swords />
          </DockIcon>
          <DockIcon
            className="bg-red-500 text-white"
            onClick={() => alert('ฮึดสุดตัวแล้ว!')}
            title="ฮึดสุดตัว"
          >
            <HandFist />
          </DockIcon>
        </>
      )}
    </Dock>
  )
}
