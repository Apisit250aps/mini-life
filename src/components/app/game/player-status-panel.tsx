import {
  AlertTriangle,
  BookOpen,
  Heart,
  Layers3,
  Sparkles,
  Swords,
  Trash2,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'

import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGameStore } from '@/lib/app/game.store'

type OverviewStat = {
  label: string
  value: number
  note: string
  icon: LucideIcon
  tone: string
}

type ResourceStat = {
  label: string
  value: number
  icon: LucideIcon
}

export function PlayerStatusPanel() {
  const { player, cards, phase } = useGameStore()
  const overviewStats: OverviewStat[] = [
    {
      label: 'พลังชีวิต',
      value: player.health,
      note: 'เหลือก่อนเกมจบ',
      icon: Heart,
      tone: 'from-rose-500/25 via-rose-500/5 to-transparent',
    },
    {
      label: 'แต้มในมือ',
      value: player.scoreInHand,
      note: `${player.cardsInHand.length} ใบในมือ`,
      icon: Sparkles,
      tone: 'from-sky-500/25 via-sky-500/5 to-transparent',
    },
    {
      label: 'จั่วได้',
      value: player.pickPoint,
      note: 'แต้มสำหรับเลือกการ์ด',
      icon: WandSparkles,
      tone: 'from-amber-500/25 via-amber-500/5 to-transparent',
    },
  ]

  const resourceStats: ResourceStat[] = [
    {
      label: 'กองหลัก',
      value: cards.deck.length,
      icon: Layers3,
    },
    {
      label: 'กองทิ้ง',
      value: cards.trash.length,
      icon: Trash2,
    },
    {
      label: 'ความรู้',
      value: cards.knowledge.length,
      icon: BookOpen,
    },
    {
      label: 'อันตราย',
      value: cards.dangerous.length,
      icon: AlertTriangle,
    },
    {
      label: 'สกิล',
      value: cards.skill.length,
      icon: Swords,
    },
    {
      label: 'อายุ',
      value: cards.age.length,
      icon: Sparkles,
    },
  ]

  return (
    <Card className="relative h-full min-h-0 overflow-hidden border-white/30 bg-white/75 shadow-2xl shadow-sky-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-500/70 to-transparent" />
      <CardHeader className="gap-3">
        <AnimatedGradientText className="w-fit">
          Player Status
        </AnimatedGradientText>
        <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-white">
          สถานะผู้เล่น
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
          สรุปค่าสำคัญและจำนวนการ์ดทุกกอง
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto pr-1">
        <div className="space-y-3">
          {overviewStats.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className={`relative overflow-hidden rounded-2xl border border-white/40 bg-linear-to-br ${item.tone} p-4 dark:border-white/10`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <Icon className="size-4 text-slate-600 dark:text-slate-300" />
                </div>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
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
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              จำนวนการ์ด
            </p>
            <Badge variant="outline" className="rounded-full">
              Phase {phase}
            </Badge>
          </div>
          <div className="space-y-2">
            {resourceStats.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/40 bg-white/60 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-300/80 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Session
          </p>
          <p className="mt-1 break-all font-mono text-xs text-slate-800 dark:text-slate-200">
            {'session'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
