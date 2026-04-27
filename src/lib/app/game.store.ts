'use client'

import { CardEntity } from '@/internal/entities/card.entity'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { shuffleCardsByType } from './game'
const isBrowser = typeof window !== 'undefined'

// กำหนด Storage
const storage = isBrowser
  ? createJSONStorage(() => localStorage)
  : createJSONStorage(() => ({
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    }))

export type GameEvent = {
  dangerous: CardEntity
  knowledge: CardEntity
}

export type State = 'idle' | 'event' | 'attack' | 'destroy' | 'game_over'
export type Player = {
  health: number
  pickPoint: number
  cardsInHand: CardEntity[]
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
  //
  setPlayerState: (state: Partial<Player>) => void
  setEnvironmentState: (state: Partial<GameEnvironment>) => void
  //
  // getters
  getDangerousScore: () => number
  // game actions
  pickCard: () => CardEntity | null
  pickCardWithPP: () => CardEntity | null
  pickCardWithHP: () => CardEntity | null
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
      },

      // --- Actions ---
      setupGame: (newState) => set((prev) => ({ ...prev, ...newState })),

      startGame: () => set(initialState),

      resetGame: () => {
        const { deck } = get()
        const dangerousCards = deck.filter((c) => c.card === 'DANGEROUS')
        const knowledgeCards = deck.filter((c) => c.card === 'KNOWLEDGE')
        const skillCards = deck.filter((c) => c.card === 'SKILL')
        const ageCards = deck.filter((c) => c.card === 'AGE')

        const events = dangerousCards.map((dangerous, i) => ({
          dangerous,
          knowledge: knowledgeCards[i],
        }))

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
          },
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
        const { cards, player } = get()
        if (cards.skill.length === 0) return null

        const skill = [...cards.skill]
        const card = skill.pop() || null

        if (card) {
          set({
            player: {
              ...player,
              cardsInHand: [...player.cardsInHand, card],
            },
            cards: {
              ...cards,
              skill,
            },
          })
        }
        return card
      },

      pickCardWithPP: () => {
        const { player, pickCard } = get()
        if (player.pickPoint <= 0) return null

        const card = pickCard()
        if (card) {
          set({ player: { ...player, pickPoint: player.pickPoint - 1 } })
        }
        return card
      },

      pickCardWithHP: () => {
        const { player, pickCard } = get()
        if (player.health <= 0) return null

        const card = pickCard()
        if (card) {
          set({ player: { ...player, health: player.health - 1 } })
        }
        return card
      },
    }),
    {
      name: 'mini-life-game',
      storage,
      partialize: (state) => {
        const { environment, ...rest } = state
        return {
          ...rest,
          environment: {
            events: environment.events,
            event: environment.event,
          },
        }
      },
    },
  ),
)
