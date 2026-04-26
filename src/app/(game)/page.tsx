'use client'
import { useGameAction } from '@/lib/app/action'
import { useGame } from '@/lib/app/game'
import React, { use } from 'react'
import { Home, Search, Settings } from 'lucide-react'
import { AnimatedList } from '@/components/ui/animated-list'
import { Dock, DockIcon } from '@/components/ui/dock'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
export default function Page() {
  const { gameId, gameState } = useGame()
  const { drawCard, randomEvent, selectEvent } = useGameAction()

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
    <main className="min-h-screen bg-background grid grid-cols-5 py-10">
      <div className="px-4">
        <ul>
          <li>Health: {gameState.health}</li>
          <li>Score: {gameState.scoreInHand}</li>

          <li>Deck: {gameState.deck.length} cards</li>
          <li>Trash: {gameState.trash.length} cards</li>
          <li>Knowledge: {gameState.knowledge.length} cards</li>
          <li>Dangerous: {gameState.dangerous.length} cards</li>
          <li>Skill: {gameState.skill.length} cards</li>
          <li>Age Cards: {gameState.ageCards.length} cards</li>
        </ul>
      </div>
      <section className="container mx-auto col-span-3">
        <h1>Game ID: {gameId}</h1>

        <div className="flex h-full">
          <AnimatedList className="flex-1 flex-col gap-4">
            {gameState.cardsInHand.map((card) => (
              <div key={card.id} className="p-4 bg-white rounded shadow">
                <h2 className="text-lg font-bold">{card.title}</h2>
                <p>{card.score}</p>
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gameState.gameEvent.map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      {event.dangerous.title}
                    </CardTitle>
                    <CardAction>
                      {event.dangerous.dangerous?.map((danger, idx) => (
                        <Badge
                          key={idx}
                          variant={'destructive'}
                          className="mr-1"
                        >
                          {danger}
                        </Badge>
                      ))}
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p>{event.knowledge.title}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="">
                      <Button onClick={() => selectEvent(event)}>
                        เลือกการ์ดนี้
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </AnimatedList>
        </div>
        <div className="sticky bottom-4 left-0 w-full">
          <Dock>
            <DockIcon>
              <Home />
            </DockIcon>
            <DockIcon onClick={handleRandomEvent}>
              <Settings />
            </DockIcon>
            <DockIcon onClick={handleDrawCard}>
              <Search />
            </DockIcon>
          </Dock>
        </div>
      </section>
      <div className=""></div>
    </main>
  )
}
