import {
  TypingAnimation,
  AnimatedSpan,
  Terminal,
} from '@/components/ui/terminal'
import { useGameStore } from '@/lib/app/game.store'
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconFileAlert,
  IconSkull,
  IconSwords,
} from '@tabler/icons-react'
import React from 'react'

export default function GameInitStatus() {
  const { deck, cards, environment, phase, selectEvent, state } = useGameStore()
  return (
    <React.Fragment>
      {['asd'].includes(state) && (
        <Terminal
          className="rounded-none bg-transparent border-none w-full"
          startOnView={true}
          sequence={!true}
        >
          <TypingAnimation duration={5}>Game initial state</TypingAnimation>
          <AnimatedSpan>✔ All cards loaded. [ {deck.length} ]</AnimatedSpan>
          <AnimatedSpan>
            ✔ All skill cards loaded. [ {cards.skill.length} ]
          </AnimatedSpan>
          <AnimatedSpan>
            ✔ All knowledge cards loaded. [ {cards.knowledge.length} ]
          </AnimatedSpan>
          <AnimatedSpan>
            ✔ All dangerous cards loaded. [ {cards.dangerous.length} ]
          </AnimatedSpan>
          <AnimatedSpan>
            ✔ All age cards loaded. [ {cards.age.length} ]
          </AnimatedSpan>
          <TypingAnimation duration={5}>
            Success! Cards initialization completed.
          </TypingAnimation>
          <TypingAnimation duration={5}>
            Environment ready. You can start the game now.
          </TypingAnimation>
          {/*  */}
        </Terminal>
      )}

      <Terminal
        className="rounded-none bg-transparent border-none overflow-y-scroll"
        sequence={!true}
      >
        {environment.eventOptions.length > 0 && (
          <>
            {environment.eventOptions.map((option, index) => (
              <div
                key={index}
                className="mb-4 border-l-2 border-red-500/50 pl-4"
                onClick={() => selectEvent(option)}
              >
                <div className="flex items-center text-red-500 font-semibold mb-2">
                  <IconAlertTriangle className="mr-2" size={18} />
                  <span>Event Loaded: {option.dangerous.title}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-400 ml-6">
                  <div className="flex items-center text-yellow-500">
                    <IconSkull className="mr-1" size={14} />
                    <span>
                      Danger Level: {option.dangerous.dangerous?.[phase]}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <IconFileAlert className="mr-1" size={14} />
                    <span>Danger Level: {option.dangerous.pick}</span>
                  </div>
                </div>
                =====================================================
                <div className="flex gap-4 text-xs text-gray-400 ml-6">
                  <div className="flex items-center text-green-500">
                    <IconSkull className="mr-1" size={14} />
                    <span>Skill: {option.knowledge.title}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <IconFileAlert className="mr-1" size={14} />
                    <span>Score: {option.knowledge.score}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <IconFileAlert className="mr-1" size={14} />
                    <span>Action: {option.knowledge.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </Terminal>
    </React.Fragment>
  )
}
