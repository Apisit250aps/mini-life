import { WandSparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GameEvent, useGameStore } from '@/lib/app/game.store'

type EventStatusPanelProps = {
  gameEvents: GameEvent[]
  selectedEvent?: GameEvent
  onSelectEvent: (event: GameEvent) => void
}

const formatAction = (action: string | null | undefined) =>
  action ? action.replaceAll('_', ' ') : 'ไม่มีเอฟเฟกต์'

export function EventStatusPanel({}: EventStatusPanelProps) {
  const { phase, environment } = useGameStore()

  return (
    <Card className="h-full min-h-0 border-white/30 bg-white/75 shadow-xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <CardHeader className="gap-2">
        <CardDescription className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
          Event Status
        </CardDescription>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-white">
            สถานะ Event
          </CardTitle>
          <Badge className="rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            {environment.eventOptions.length} choices
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto pr-1">
        {environment.event ? (
          <div className="mb-3 rounded-2xl border border-emerald-300/70 bg-emerald-500/10 p-3 dark:border-emerald-400/30 dark:bg-emerald-400/10">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
                Event ที่เลือก
              </p>

              <div className="">
                <Badge className="rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
                  ล่าสุด
                </Badge>
                <Badge>
                  {environment.event.dangerous.dangerous?.[phase] ?? 0} danger
                </Badge>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {environment.event.dangerous.title}
            </p>

            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              รับ: {environment.event.knowledge.title} • แต้ม{' '}
              {environment.event.knowledge.score ?? 0} •{' '}
              {formatAction(environment.event.knowledge.action)}
            </p>
          </div>
        ) : null}

        {environment.eventOptions.length === 0 ? (
          <div className="flex min-h-96 items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-950/3 p-8 text-center dark:border-white/10 dark:bg-white/3">
            <div className="space-y-3">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300">
                <WandSparkles className="size-6" />
              </div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">
                ยังไม่มีเหตุการณ์ในรอบนี้
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                กดปุ่มสุ่มเหตุการณ์เพื่อสร้าง event ใหม่
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {environment.eventOptions.map((event, index) => (
              <Card
                key={`${event.dangerous.id}-${event.knowledge.id}-${index}`}
                className="relative overflow-hidden border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))] shadow-lg shadow-slate-950/10 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.7))]"
              >
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-orange-500/70 to-transparent" />
                <CardHeader className="gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardDescription className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                        Danger
                      </CardDescription>
                      <CardTitle className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
                        {event.dangerous.title}
                      </CardTitle>
                    </div>
                    <CardAction className="flex flex-wrap justify-end gap-1">
                      {event.dangerous.dangerous?.map((danger, idx) => (
                        <Badge
                          key={idx}
                          variant="destructive"
                          className="rounded-full px-2 py-0.5"
                        >
                          {danger}
                        </Badge>
                      ))}
                    </CardAction>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border border-sky-200/70 bg-sky-500/5 p-3 dark:border-sky-400/20 dark:bg-sky-400/10">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
                      Knowledge
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                      {event.knowledge.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      แต้ม {event.knowledge.score ?? 0} •{' '}
                      {formatAction(event.knowledge.action)}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full rounded-xl bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    onClick={() => {}}
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
  )
}
