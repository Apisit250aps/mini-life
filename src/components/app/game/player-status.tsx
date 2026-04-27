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
  IconSwords,
} from '@tabler/icons-react'
import { useGameStore } from '@/lib/app/game.store'

export default function PlayerStatus() {
  const { player } = useGameStore()
  return (
    <TerminalContent>
      <pre className="px-4">
        <code>Player Status</code>
      </pre>
      <Terminal className="">
        <TypingAnimation>initial player status:</TypingAnimation>
        <AnimatedSpan className="text-red-500">
          <span className="flex items-center">
            <IconHeartFilled size={14} /> HP: {player.health}
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
      </Terminal>
    </TerminalContent>
  )
}
