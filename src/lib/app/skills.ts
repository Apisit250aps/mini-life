'use client'

import { useMemo } from 'react'
import { useGame } from './game'

const PASSIVE_SKILL = {
  HEALTH_ONE: 'เพิ่มพลังชีวิต 1',
  HEALTH_TWO: 'เพิ่มพลังชีวิต 2',
  PICK_ONE: 'เพิ่มการ์ดที่จั่วได้ 1',
  PICK_TWO: 'เพิ่มการ์ดที่จั่วได้ 2',
  HURT_ONE: 'ลดพลังชีวิต 1',
  HURT_TWO: 'ลดพลังชีวิต 2',
  ZERO: 'คะแนนเป็น 0',
  STOP: 'จั่วการ์ดเป็น 0',
} as const
const ACTIVE_SKILL = {
  DESTROY: 'ทำลายการ์ด',
  MULTIPLY: 'คูณคะแนน 2 เท่า',
  COPY: 'ตัดลอกความสามารถ',
  REDUCE: 'ลดเฟส',
  SORT: 'เรียงการ์ด 3 ใบบนสุด',
  EXCHANGE_ONE: 'แลกเปลี่ยน 1',
  EXCHANGE_TWO: 'แลกเปลี่ยนทั 2',
  SWAP: 'สอดไต้กอง',
} as const

export const CARD_ACTION_OPTIONS = [
  ...Object.entries(PASSIVE_SKILL).map(([key, label]) => ({
    value: key,
    label,
  })),
  ...Object.entries(ACTIVE_SKILL).map(([key, label]) => ({
    value: key,
    label,
  })),
]

export const CARD_ACTION = [
  // active skill
  ...Object.keys(PASSIVE_SKILL),
  // passive skill
  ...Object.keys(ACTIVE_SKILL),
] as const

const useActiveSkill = (action: keyof typeof ACTIVE_SKILL) => {
  switch (action) {
    case 'DESTROY':
      // logic for destroy
      break
    case 'MULTIPLY':
      // logic for multiply
      break
    case 'COPY':
      // logic for copy
      break
    case 'REDUCE':
      // logic for reduce
      break
    case 'SORT':
      // logic for sort
      break
    case 'EXCHANGE_ONE':
      // logic for exchange one
      break
    case 'EXCHANGE_TWO':
      // logic for exchange two
      break
    case 'SWAP':
      // logic for swap
      break
    default:
      break
  }
}

const useCardAction = () => {
  const { gameState, setGameState } = useGame()

  const passiveSkills = useMemo(() => {
    return Object.keys(PASSIVE_SKILL)
  }, [])
  const activeSkills = useMemo(() => {
    return Object.keys(ACTIVE_SKILL)
  }, [])

  const isPassiveSkill = (action: string) => {
    return action in PASSIVE_SKILL
  }

  const isActiveSkill = (
    action: string,
  ): action is keyof typeof ACTIVE_SKILL => {
    return action in ACTIVE_SKILL
  }

  const actionPassiveSkill = (action: string) => {
    switch (action) {
      case 'HEALTH_ONE':
        setGameState((prev) => ({
          ...prev,
          health: prev.health + 1,
        }))
        break
      case 'HEALTH_TWO':
        setGameState((prev) => ({
          ...prev,
          health: prev.health + 2,
        }))
        break
      case 'PICK_ONE':
        setGameState((prev) => ({
          ...prev,
          pickPoint: prev.pickPoint + 1,
        }))
        break
      case 'PICK_TWO':
        setGameState((prev) => ({
          ...prev,
          pickPoint: prev.pickPoint + 2,
        }))
        break
      case 'HURT_ONE':
        setGameState((prev) => ({
          ...prev,
          health: prev.health - 1,
        }))
        break
      case 'HURT_TWO':
        setGameState((prev) => ({
          ...prev,
          health: prev.health - 2,
        }))
        break
      case 'ZERO':
        setGameState((prev) => ({
          ...prev,
          score: 0,
        }))
        break
      case 'STOP':
        setGameState((prev) => ({
          ...prev,
          pickPoint: 0,
        }))
        break
      default:
        break
    }
  }

  return {
    passiveSkills,
    activeSkills,
    isPassiveSkill,
    isActiveSkill,
    //
    actionPassiveSkill,
  }
}

export { useCardAction, useActiveSkill }
