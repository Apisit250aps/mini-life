'use client'

import React from 'react'
import { DrawnCardsPanel } from '@/components/app/game/drawn-cards-panel'
import { EventStatusPanel } from '@/components/app/game/event-status-panel'
import { GameActionDock } from '@/components/app/game/game-action-dock'
import { PlayerStatusPanel } from '@/components/app/game/player-status-panel'
import { GameEvent, useGameStore } from '@/lib/app/game.store'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { Card, CardContent } from '@/components/ui/card'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/ui/terminal'

export default function Page() {
  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <FlickeringGrid color={'rgb(0, 255, 0)'} maxOpacity={1} gridGap={10} />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-4">
        <div className="grid grid-cols-5 w-full">
          {/* เอา div เปล่าออก และใช้ col-start-2 เพื่อขยับ section ไปอยู่ตรงกลาง */}
          <section className="col-span-3 col-start-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2 grid-cols-2 h-40  text-green-500 ">
                <div className="border border-green-500 bg-black">
                  <Terminal className="rounded-none bg-transparent border-none">
                    <TypingAnimation>
                      pnpm dlx shadcn@latest init
                    </TypingAnimation>
                    <AnimatedSpan>✔ Preflight checks.</AnimatedSpan>
                    <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>
                    <TypingAnimation>
                      Success! Project initialization completed.
                    </TypingAnimation>
                  </Terminal>
                </div>
                <div className="border border-green-500 bg-black">
                  <Terminal className="rounded-none bg-transparent border-none">
                    <TypingAnimation>
                      pnpm dlx shadcn@latest init
                    </TypingAnimation>
                    <AnimatedSpan className="text-red-500">
                      ✔ Preflight checks.
                    </AnimatedSpan>
                    <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>
                    <TypingAnimation>
                      Success! Project initialization completed.
                    </TypingAnimation>
                  </Terminal>
                </div>
              </div>
              <Card className="rounded-none outline-1 outline-green-500 bg-black text-green-500 h-140 ">
                <CardContent>
                  <pre className="p-4">
                    <code className="grid gap-y-1 overflow-auto">
                      <TypingAnimation>
                        pnpm dlx shadcn@latest init
                      </TypingAnimation>
                      <AnimatedSpan>✔ Preflight checks.</AnimatedSpan>
                      <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>
                      <TypingAnimation>
                        Success! Project initialization completed.
                      </TypingAnimation>
                    </code>
                  </pre>
                  <Terminal className="rounded-none bg-transparent border-none">
                    <TypingAnimation>
                      pnpm dlx shadcn@latest init
                    </TypingAnimation>
                    <AnimatedSpan>✔ Preflight checks.</AnimatedSpan>
                    <AnimatedSpan>✔ Validating Tailwind CSS.</AnimatedSpan>
                    <TypingAnimation>
                      Success! Project initialization completed.
                    </TypingAnimation>
                  </Terminal>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
