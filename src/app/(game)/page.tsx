'use client'

import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { Card, CardContent } from '@/components/ui/card'
import PlayerStatus from '@/components/app/game/player-status'
import GameStatus from '@/components/app/game/game-status'
import PlayerAction from '@/components/app/game/player-action'
import GameInitStatus from '@/components/app/game/game-init-status'

export default function Page() {
  return (
    <main className="relative h-screen overflow-auto bg-black">
      <FlickeringGrid color={'rgb(0, 255, 0)'} maxOpacity={1} gridGap={10} />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 w-full">
          {/* เอา div เปล่าออก และใช้ col-start-2 เพื่อขยับ section ไปอยู่ตรงกลาง */}
          <div className=""></div>
          <section className="col-span-1 lg:col-span-3 col-start-2 h-100">
            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 text-green-500 ">
                <PlayerStatus />
                <GameStatus />
              </div>
              <Card className="rounded-none outline-1 outline-green-500 bg-black text-green-500 h-100 ">
                {/* <CardContent> */}
                <GameInitStatus />
                {/* </CardContent> */}
              </Card>
            </div>
          </section>
          <div className=""></div>
        </div>
        <PlayerAction className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-fit" />
      </div>
    </main>
  )
}
