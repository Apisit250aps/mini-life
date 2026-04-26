import { Search } from 'lucide-react'

import { AnimatedList } from '@/components/ui/animated-list'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CardEntity } from '@/internal/entities/card.entity'
import { useGame } from '@/lib/app/game'

type DrawnCardsPanelProps = {
  cardsInHand: CardEntity[]
}

const formatAction = (action: string | null | undefined) =>
  action ? action.replaceAll('_', ' ') : 'ไม่มีเอฟเฟกต์'

export function DrawnCardsPanel({ cardsInHand }: DrawnCardsPanelProps) {
  const { gameState } = useGame()
  return (
    <Card className="h-full min-h-0 border-white/30 bg-white/75 shadow-xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <CardHeader className="gap-2">
        <CardDescription className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
          Drawn Cards
        </CardDescription>
        <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-white">
          รายการการ์ดที่จั่ว
        </CardTitle>

        <CardAction className="space-x-2">
          <Badge className=" bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            {cardsInHand.length} cards
          </Badge>
          <Badge>{gameState.state}</Badge>
          <Badge>Dangerous Point: {gameState.dangerousPoint}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto pr-1 py-4">
        {cardsInHand.length === 0 ? (
          <div className="flex min-h-96 items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-950/3 p-8 text-center dark:border-white/10 dark:bg-white/3">
            <div className="space-y-3">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-300">
                <Search className="size-6" />
              </div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">
                ยังไม่มีการ์ดที่จั่ว
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                กดปุ่มจั่วการ์ดจาก dock ด้านล่างเพื่อเริ่มสะสมการ์ดในมือ
              </p>
            </div>
          </div>
        ) : (
          <AnimatedList className="items-stretch gap-3" delay={180}>
            {cardsInHand.map((card, index) => {
              return (
                <Card
                  key={`${card.id}-${index}`}
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
              )
            })}
          </AnimatedList>
        )}
      </CardContent>
    </Card>
  )
}
