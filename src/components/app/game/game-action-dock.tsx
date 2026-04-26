import { Search, Settings, Sparkles } from 'lucide-react'

import { Dock, DockIcon } from '@/components/ui/dock'

type GameActionDockProps = {
  onRandomEvent: () => void
  onDrawCard: () => void
}

export function GameActionDock({
  onRandomEvent,
  onDrawCard,
}: GameActionDockProps) {
  return (
    <div className="sticky bottom-10 z-20 flex justify-center pb-1">
      <Dock className="border-white/40 bg-white/75 px-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        <DockIcon
          className="bg-slate-950 text-white dark:bg-white dark:text-slate-950"
          title="สถานะเกมปัจจุบัน"
        >
          <Sparkles />
        </DockIcon>
        <DockIcon
          className="bg-sky-500 text-white"
          onClick={onRandomEvent}
          title="สุ่มเหตุการณ์"
        >
          <Settings />
        </DockIcon>
        <DockIcon
          className="bg-orange-500 text-white"
          onClick={onDrawCard}
          title="จั่วการ์ด"
        >
          <Search />
        </DockIcon>
      </Dock>
    </div>
  )
}
