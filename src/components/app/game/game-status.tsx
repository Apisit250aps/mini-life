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
      <Terminal className="" startOnView={true} sequence={!true}>
        {environment.event && (
          <React.Fragment>
            <AnimatedSpan className="text-green-500">
              Tasks {'>'} {environment.event.dangerous.title}
            </AnimatedSpan>
            <AnimatedSpan className="text-red-500">
              <span className="flex items-center">
                <IconSkull size={14} /> DANGEROUS:{' '}
                {environment.event.dangerous.dangerous?.[phase]}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-yellow-500">
              <span className="flex items-center">
                <IconCards size={14} /> Destroy:{' '}
                {environment.event.dangerous.token}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              ============================================
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              Learning skill {'>'} {environment.event.dangerous.title}
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              <span className="flex items-center">
                <IconSwords size={14} /> SKILL:{' '}
                {environment.event.knowledge.title}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              <span className="flex items-center">
                <IconSwords size={14} /> SCORE:{' '}
                {environment.event.knowledge.score}
              </span>
            </AnimatedSpan>
            <AnimatedSpan className="text-green-500">
              <span className="flex items-center">
                <IconSwords size={14} /> ACTION:{' '}
                {environment.event.knowledge.action}
              </span>
            </AnimatedSpan>
          </React.Fragment>
        )}
      </Terminal>
    </TerminalContent>
  )
}
