'use client'

import React from 'react'

import { GameEvent, useGameStore } from '@/lib/app/game.store'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { Card, CardContent } from '@/components/ui/card'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/ui/terminal'
import PlayerStatus from '@/components/app/game/player-status'
import GameStatus from '@/components/app/game/game-status'
import PlayerAction from '@/components/app/game/player-action'
import GameInitStatus from '@/components/app/game/game-init-status'

export default function Page() {
  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <FlickeringGrid color={'rgb(0, 255, 0)'} maxOpacity={1} gridGap={10} />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-4">
        <div className="grid grid-cols-5 w-full">
          {/* เอา div เปล่าออก และใช้ col-start-2 เพื่อขยับ section ไปอยู่ตรงกลาง */}
          <section className="col-span-3 col-start-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2 grid-cols-2 h-50 text-green-500 ">
                <PlayerStatus />
                <GameStatus />
              </div>
              <Card className="rounded-none outline-1 outline-green-500 bg-black text-green-500 h-140 ">
                <CardContent>
                  <GameInitStatus />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
        <PlayerAction />
      </div>
    </main>
  )
}
