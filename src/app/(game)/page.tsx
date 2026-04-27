'use client'

import React from 'react'
import { DrawnCardsPanel } from '@/components/app/game/drawn-cards-panel'
import { EventStatusPanel } from '@/components/app/game/event-status-panel'
import { GameActionDock } from '@/components/app/game/game-action-dock'
import { PlayerStatusPanel } from '@/components/app/game/player-status-panel'
import { GridPattern } from '@/components/ui/grid-pattern'
import { GameEvent, useGameStore } from '@/lib/app/game.store'

export default function Page() {
  return (
    <main className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_45%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.2),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.15),transparent_30%),linear-gradient(180deg,#09090b_0%,#0f172a_45%,#020617_100%)]">
      <GridPattern className="text-slate-900/10 dark:text-white/10" />
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="relative mx-auto grid h-full max-w-[1600px] grid-rows-[minmax(0,1fr)_auto] gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <section className="grid min-h-0 gap-4 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
          <PlayerStatusPanel />
          <DrawnCardsPanel />
          <EventStatusPanel
            gameEvents={[]}
            onSelectEvent={function (event: GameEvent): void {
              throw new Error('Function not implemented.')
            }}
          />
        </section>
      </div>
      <GameActionDock />
    </main>
  )
}
