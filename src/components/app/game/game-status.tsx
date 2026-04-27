import React from 'react'
import { TerminalContent } from '../share/termimal-content'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/ui/terminal'

import {
  IconCards,
  IconHandStop,
  IconHeartFilled,
  IconSkull,
  IconSwords,
} from '@tabler/icons-react'
import { useGameStore } from '@/lib/app/game.store'

export default function GameStatus() {
  const { phase, player, environment, state } = useGameStore()
  return (
    <TerminalContent>
      <pre className="px-4 flex justify-between">
        <code>Game Status </code>
        <code>Phase [{phase + 1}]</code>
        <code>State [{state}]</code>
        <code>Events: {environment.events.length}</code>
      </pre>
      <Terminal className="">
        {environment.event && (
          <>
            <TypingAnimation>
              {environment.event.dangerous.title}
            </TypingAnimation>
            <AnimatedSpan className="text-red-500">
              <span className="flex items-center">
                <IconSkull size={14} /> DANGEROUS:{' '}
                {environment.event.dangerous.dangerous?.[phase]}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-yellow-500">
              <span className="flex items-center">
                <IconCards size={14} /> Pick point: {player.pickPoint}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-yellow-500">
              <span className="flex items-center">
                <IconHandStop size={14} /> Cards in hand:{' '}
                {player.cardsInHand.length}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-yellow-500">
              <span className="flex items-center">
                <IconSwords size={14} /> Attack Point: {player.scoreInHand}
              </span>
            </AnimatedSpan>
          </>
        )}
      </Terminal>
    </TerminalContent>
  )
}
