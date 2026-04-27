'use client'

import { CardEntity } from '@/internal/entities/card.entity'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { localStore } from './encrypt-store'
import { shuffleCardsByType } from './game'

import { v7 as uuid } from 'uuid'
import { omit } from 'lodash'

const storage = localStore()

export type GameEvent = {
  eventId: string
  dangerous: CardEntity
  knowledge: CardEntity
}

export type CardInHand = CardEntity & {
  used: boolean
}

export type State = 'idle' | 'event' | 'attack' | 'destroy' | 'game_over'
export type Player = {
  health: number
  pickPoint: number
  cardsInHand: CardInHand[]
  scoreInHand: number
}
export type CardState = {
  // cards data
  deck: CardEntity[]
  trash: CardEntity[]
  //
  knowledge: CardEntity[]
  dangerous: CardEntity[]
  skill: CardEntity[]
  age: CardEntity[]
}
export type GameEnvironment = {
  events: GameEvent[]
  event: GameEvent | null
  eventOptions: GameEvent[]
}

type GameState = {
  state: State
  phase: number
  deck: CardEntity[]
  player: Player
  // environment state
  cards: CardState
  environment: GameEnvironment
}

type GameActions = {
  setupGame: (state: Partial<GameState>) => void
  startGame: () => void
  resetGame: () => void
  refillDeck: () => void
  //
  setPlayerState: (state: Partial<Player>) => void
  setEnvironmentState: (state: Partial<GameEnvironment>) => void
  //
  // getters
  getDangerousScore: () => number
  // game actions
  pickCard: () => CardEntity | null
  pickCardWithPP: () => void
  pickCardWithHP: () => void
  //
  randomEvents: () => void
  selectEvent: (event: GameEvent) => void
}

const initialState: GameState = {
  state: 'idle',
  phase: 0,
  deck: [],
  player: {
    health: 10,
    pickPoint: 0,
    cardsInHand: [],
    scoreInHand: 0,
  },
  cards: {
    deck: [],
    trash: [],
    knowledge: [],
    dangerous: [],
    skill: [],
    age: [],
  },
  environment: {
    events: [],
    event: null,
    eventOptions: [],
  },
}
export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      state: 'idle',
      phase: 0,
      deck: [],
      player: {
        health: 18,
        pickPoint: 0,
        cardsInHand: [],
        scoreInHand: 0,
      },
      cards: {
        deck: [],
        trash: [],
        knowledge: [],
        dangerous: [],
        skill: [],
        age: [],
      },
      environment: {
        events: [],
        event: null,
        eventOptions: [],
      },

      // --- Actions ---
      setupGame: (newState) => set((prev) => ({ ...prev, ...newState })),

      startGame: () => set(initialState),

      resetGame: () => {
        const { deck } = get()
        const dangerousCards = shuffleCardsByType(deck, 'DANGEROUS')
        const knowledgeCards = shuffleCardsByType(deck, 'KNOWLEDGE')
        const skillCards = shuffleCardsByType(deck, 'SKILL')
        const ageCards = shuffleCardsByType(deck, 'AGE')

        const events = dangerousCards.map((dangerous, i) => {
          const eventId = uuid()
          return {
            eventId,
            dangerous,
            knowledge: knowledgeCards[i],
          }
        })

        set({
          cards: {
            deck: [],
            trash: [],
            knowledge: knowledgeCards,
            dangerous: dangerousCards,
            skill: skillCards,
            age: ageCards,
          },
          environment: {
            events,
            event: null,
            eventOptions: [],
          },
          player: {
            health: 18,
            pickPoint: 0,
            cardsInHand: [],
            scoreInHand: 0,
          },
          state: 'idle',
          phase: 0,
        })
      },

      setPlayerState: (playerState) =>
        set((prev) => ({
          player: { ...prev.player, ...playerState },
        })),

      setEnvironmentState: (envState) =>
        set((prev) => ({
          environment: { ...prev.environment, ...envState },
        })),
      // getters
      getDangerousScore: () => {
        const { environment, phase } = get()
        return environment.event?.dangerous.dangerous?.[phase] || 0
      },
      // Logic ที่แก้ไขแล้ว: Immutable update
      pickCard: () => {
        const { cards } = get()
        if (cards.skill.length === 0) return null
        const card = cards.skill[0]
        const skill = cards.skill.slice(1)
        if (card) {
          set((prev) => ({
            player: {
              ...prev.player,
              scoreInHand: prev.player.scoreInHand + (card.score ?? 0),
              cardsInHand: [
                ...prev.player.cardsInHand,
                { ...card, used: card.action ? false : true },
              ],
            },
            cards: {
              ...prev.cards,
              skill,
            },
          }))
          if (get().cards.skill.length === 0) {
            get().refillDeck()
          }
        }
        return card
      },
      pickCardWithPP: () => {
        const { player, pickCard } = get()
        if (player.pickPoint <= 0) return null

        const card = pickCard()
        if (card) {
          set((prev) => ({
            player: { ...prev.player, pickPoint: prev.player.pickPoint - 1 },
          }))
        }
      },

      pickCardWithHP: () => {
        const { player, pickCard } = get()
        console.log(
          'Attempting to pick card with HP. Current health:',
          player.health,
        )
        if (player.health <= 0) return null

        const card = pickCard()
        if (card) {
          set((prev) => ({
            player: { ...prev.player, health: prev.player.health - 1 },
          }))
        }
      },

      randomEvents: () => {
        if (get().state !== 'idle') return
        const { environment } = get()

        const shuffled = [...environment.events].sort(() => 0.5 - Math.random())
        const selected = shuffled.slice(0, 3)

        const remaining = environment.events.filter(
          (e) => !selected.includes(e),
        )

        set((prev) => ({
          state: 'event',
          environment: {
            ...prev.environment,
            events: remaining,
            eventOptions: selected,
            event: null,
          },
        }))
      },
      selectEvent: (event) => {
        const { environment } = get()
        const unselected = environment.eventOptions.filter(
          (e) => e.eventId !== event.eventId,
        )
        const toDeck = [
          ...unselected.map((e) => e.knowledge),
          ...unselected.map((e) => e.dangerous),
        ] as CardEntity[]

        set((prev) => ({
          state: 'attack',
          cards: {
            ...prev.cards,
            deck: [...prev.cards.deck, ...toDeck],
          },
          environment: {
            ...prev.environment,
            event,
            eventOptions: [],
          },
          player: {
            ...prev.player,
            pickPoint: event.dangerous.pick ?? 0,
          },
        }))
      },
      refillDeck: () => {
        set((prev) => ({
          cards: {
            ...prev.cards,
            skill: [
              ...(prev.player.cardsInHand
                .filter((card) => card.used)
                .map((card) => omit(card, ['used'])) as CardEntity[]),
              ...prev.cards.skill,
            ],
            trash: [],
          },
          player: {
            ...prev.player,
            cardsInHand: prev.player.cardsInHand.filter((card) => !card.used),
          },
        }))
      },
    }),
    {
      name: 'mini-life-game',
      storage,
    },
  ),
)
