'use client'
import { useGameAction } from '@/lib/app/action'
import { useGame } from '@/lib/app/game'
import React from 'react'
import {
  AlertTriangle,
  BookOpen,
  Heart,
  Layers3,
  Search,
  Settings,
  Sparkles,
  Swords,
  Trash2,
  WandSparkles,
} from 'lucide-react'
import { AnimatedList } from '@/components/ui/animated-list'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { Dock, DockIcon } from '@/components/ui/dock'
import { GridPattern } from '@/components/ui/grid-pattern'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const formatAction = (action: string | null | undefined) =>
  action ? action.replaceAll('_', ' ') : 'ไม่มีเอฟเฟกต์'

export default function Page() {
  const { gameId, gameState } = useGame()
  const { drawCard, randomEvent, selectEvent } = useGameAction()

  const overviewStats = [
    {
      label: 'พลังชีวิต',
      value: gameState.health,
      note: 'เหลือก่อนเกมจบ',
      icon: Heart,
      tone: 'from-rose-500/25 via-rose-500/5 to-transparent',
    },
    {
      label: 'แต้มในมือ',
      value: gameState.scoreInHand,
      note: `${gameState.cardsInHand.length} ใบในมือ`,
      icon: Sparkles,
      tone: 'from-sky-500/25 via-sky-500/5 to-transparent',
    },
    {
      label: 'จั่วได้',
      value: gameState.pickPoint,
      note: 'แต้มสำหรับเลือกการ์ด',
      icon: WandSparkles,
      tone: 'from-amber-500/25 via-amber-500/5 to-transparent',
    },
  ]

  const resourceStats = [
    {
      label: 'กองหลัก',
      value: gameState.deck.length,
      icon: Layers3,
    },
    {
      label: 'กองทิ้ง',
      value: gameState.trash.length,
      icon: Trash2,
    },
    {
      label: 'ความรู้',
      value: gameState.knowledge.length,
      icon: BookOpen,
    },
    {
      label: 'อันตราย',
      value: gameState.dangerous.length,
      icon: AlertTriangle,
    },
    {
      label: 'สกิล',
      value: gameState.skill.length,
      icon: Swords,
    },
    {
      label: 'อายุ',
      value: gameState.ageCards.length,
      icon: Sparkles,
    },
  ]

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
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_45%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.2),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.15),transparent_30%),linear-gradient(180deg,#09090b_0%,#0f172a_45%,#020617_100%)]">
      <GridPattern className="text-slate-900/10 dark:text-white/10" />
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
          <Card className="relative overflow-hidden border-white/30 bg-white/75 shadow-2xl shadow-sky-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-500/70 to-transparent" />
            <CardHeader className="gap-3">
              <AnimatedGradientText className="w-fit">
                Magic UI Game Board
              </AnimatedGradientText>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  เกมกำลังอยู่ในสถานะ {gameState.state}
                </CardTitle>
                <CardDescription className="max-w-md text-sm text-slate-600 dark:text-slate-300">
                  จัดเลย์เอาต์ใหม่ให้หน้าเกมอ่านสถานะได้เร็วขึ้น
                  พร้อมพื้นหลังและเอฟเฟกต์แนว Magic UI
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {overviewStats.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.label}
                      className={`relative overflow-hidden rounded-2xl border border-white/40 bg-linear-to-br ${item.tone} p-4 dark:border-white/10`}
                    >
                      <div className="absolute right-3 top-3 rounded-full bg-white/70 p-2 text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">
                        <Icon className="size-4" />
                      </div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {item.note}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-950/3 p-4 dark:border-white/10 dark:bg-white/3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Session
                    </p>
                    <p className="mt-1 font-mono text-sm text-slate-800 dark:text-slate-200">
                      {gameId}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sky-700 dark:text-sky-300"
                  >
                    Phase {gameState.phase}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resourceStats.map((item) => {
              const Icon = item.icon

              return (
                <Card
                  key={item.label}
                  className="border-white/30 bg-white/70 shadow-lg shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <CardDescription className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                          {item.label}
                        </CardDescription>
                        <CardTitle className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                          {item.value}
                        </CardTitle>
                      </div>
                      <div className="rounded-2xl border border-white/40 bg-white/80 p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                        <Icon className="size-5" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/30 bg-white/75 shadow-xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <CardHeader className="gap-2">
              <CardDescription className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Event Arena
              </CardDescription>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-white">
                  เหตุการณ์ที่เลือกได้ตอนนี้
                </CardTitle>
                <Badge className="rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  {gameState.gameEvent.length} choices
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {gameState.gameEvent.length === 0 ? (
                <div className="flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-950/3 p-8 text-center dark:border-white/10 dark:bg-white/3">
                  <div className="space-y-3">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300">
                      <WandSparkles className="size-6" />
                    </div>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      ยังไม่มีเหตุการณ์ในรอบนี้
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      กดปุ่มสุ่มเหตุการณ์จาก dock ด้านล่างเพื่อสร้างตัวเลือกใหม่
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {gameState.gameEvent.map((event, index) => (
                    <Card
                      key={`${event.dangerous.id}-${event.knowledge.id}-${index}`}
                      className="relative overflow-hidden border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))] shadow-lg shadow-slate-950/10 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.7))]"
                    >
                      <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-orange-500/70 to-transparent" />
                      <CardHeader className="gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardDescription className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                              Danger Card
                            </CardDescription>
                            <CardTitle className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                              {event.dangerous.title}
                            </CardTitle>
                          </div>
                          <CardAction className="flex flex-wrap justify-end gap-1">
                            {event.dangerous.dangerous?.map((danger, idx) => (
                              <Badge
                                key={idx}
                                variant="destructive"
                                className="rounded-full px-2.5 py-0.5"
                              >
                                {danger}
                              </Badge>
                            ))}
                          </CardAction>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-2xl border border-sky-200/70 bg-sky-500/5 p-4 dark:border-sky-400/20 dark:bg-sky-400/10">
                          <p className="text-xs uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
                            Knowledge Reward
                          </p>
                          <p className="mt-2 text-base font-medium text-slate-900 dark:text-white">
                            {event.knowledge.title}
                          </p>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            แต้ม {event.knowledge.score ?? 0} •{' '}
                            {formatAction(event.knowledge.action)}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                          onClick={() => selectEvent(event)}
                        >
                          เลือกการ์ดนี้
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/30 bg-white/75 shadow-xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
            <CardHeader className="gap-2">
              <CardDescription className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Hand Stack
              </CardDescription>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-white">
                  การ์ดในมือ
                </CardTitle>
                <Badge
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white/70 px-3 py-1 dark:border-white/15 dark:bg-white/10"
                >
                  {gameState.cardsInHand.length} cards
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {gameState.cardsInHand.length === 0 ? (
                <div className="flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-950/3 p-8 text-center dark:border-white/10 dark:bg-white/3">
                  <div className="space-y-3">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-300">
                      <Search className="size-6" />
                    </div>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      มือว่างอยู่
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      ใช้ปุ่มจั่วการ์ดเพื่อเติมตัวเลือกสำหรับเทิร์นถัดไป
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatedList className="items-stretch gap-3" delay={180}>
                  {gameState.cardsInHand.map((card) => (
                    <Card
                      key={card.id}
                      className="overflow-hidden border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,249,255,0.82))] shadow-lg shadow-sky-950/10 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.6))]"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardDescription className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                              {card.card}
                            </CardDescription>
                            <CardTitle className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                              {card.title}
                            </CardTitle>
                          </div>
                          <Badge className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-700 dark:text-emerald-300">
                            +{card.score ?? 0}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        <p>{formatAction(card.action)}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Badge variant="outline" className="rounded-full">
                            token {card.token ?? 0}
                          </Badge>
                          <Badge variant="outline" className="rounded-full">
                            mode {card.mode ?? 'NORMAL'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </AnimatedList>
              )}
            </CardContent>
          </Card>
        </section>

        <div className="sticky bottom-4 left-0 flex justify-center pb-2">
          <Dock className="border-white/40 bg-white/75 px-3 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
            <DockIcon
              className="bg-slate-950 text-white dark:bg-white dark:text-slate-950"
              title="สถานะเกมปัจจุบัน"
            >
              <Sparkles />
            </DockIcon>
            <DockIcon
              className="bg-sky-500 text-white"
              onClick={handleRandomEvent}
              title="สุ่มเหตุการณ์"
            >
              <Settings />
            </DockIcon>
            <DockIcon
              className="bg-orange-500 text-white"
              onClick={handleDrawCard}
              title="จั่วการ์ด"
            >
              <Search />
            </DockIcon>
          </Dock>
        </div>
      </div>
    </main>
  )
}
