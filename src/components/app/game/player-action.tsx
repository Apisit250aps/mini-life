'use client'
import React from 'react'
import { Dock, DockIcon } from '@/components/ui/dock'
import { IconRestore, IconTerminal } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

import { useGameStore } from '@/lib/app/game.store'

export default function PlayerAction({
  ...props
}: React.ComponentProps<'div'>) {
  const { randomEvents, resetGame } = useGameStore()
  const handleReset = () => {
    resetGame()
    window.location.reload()
  }
  return (
    <div className={cn('relative', props.className)} {...props}>
      <Dock
        direction="middle"
        className="border-green-500 text-green-500 bg-black outline-1 outline-green-500 rounded-none"
      >
        <DockIcon onClick={handleReset} className="text-red-500">
          <IconRestore size={32} />
        </DockIcon>
        <DockIcon onClick={randomEvents}>
          <IconTerminal size={32} />
        </DockIcon>
      </Dock>
    </div>
  )
}
