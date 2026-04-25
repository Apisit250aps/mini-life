'use client'

import { FieldInput, SelectInput } from '@/components/share/input'
import {
  CardFormSchema,
  type CardFormInput,
  type CardFormValues,
} from '@/internal/entities/card.entity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import React, { useMemo } from 'react'
import { Button } from '@/components/ui/button'

const CARD_TYPE_OPTIONS = [
  { value: 'KNOWLEDGE', label: 'ความรู้' },
  { value: 'SKILL', label: 'ทักษะ' },
  { value: 'DANGEROUS', label: 'อันตราย' },
  { value: 'AGE', label: 'อายุ' },
]

const TOKEN_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
]

const CARD_MODE_OPTIONS = [
  { value: 'NORMAL', label: 'Normal' },
  { value: 'HARD', label: 'Hard' },
]

export const CARD_ACTION_OPTIONS = [
  { value: 'HEALTH_ONE', label: 'Health +1' },
  { value: 'HEALTH_TWO', label: 'Health +2' },
  { value: 'PICK_ONE', label: 'Pick +1' },
  { value: 'PICK_TWO', label: 'Pick +2' },
  { value: 'DESTROY', label: 'Destroy' },
  { value: 'MULTIPLY', label: 'Multiply' },
  { value: 'COPY', label: 'Copy' },
  { value: 'REDUCE', label: 'Reduce' },
  { value: 'SORT', label: 'Sort' },
  { value: 'EXCHANGE_ONE', label: 'Exchange +1' },
  { value: 'EXCHANGE_TWO', label: 'Exchange +2' },
  { value: 'SWAP', label: 'Swap' },
  { value: 'HURT_ONE', label: 'Health -1' },
  { value: 'HURT_TWO', label: 'Health -2' },
  { value: 'ZERO', label: 'Zero' },
  { value: 'STOP', label: 'Stop' },
]

export default function CardForm({
  onSubmit,
  value,
}: FormValueProps<CardFormValues>) {
  const form = useForm<CardFormInput, unknown, CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    defaultValues: useMemo(() => {
      if (value) {
        return {
          title: value?.title,
          unit: value?.unit,
          card: value?.card,
          pick: value?.pick,
          dangerous: value?.dangerous,
          score: value?.score,
          action: value?.action,
          token: value?.token,
          mode: value?.mode,
        }
      }
      return {
        title: '',
        unit: 1,
        card: 'KNOWLEDGE',
        pick: null,
        dangerous: [0, 0, 0],
        score: 0,
        action: null,
        token: 1,
        mode: 'NORMAL',
      }
    }, [value]),
  })

  const cardType = useWatch({ control: form.control, name: 'card' })

  const isKnowledgeOrSkill = cardType === 'KNOWLEDGE' || cardType === 'SKILL' || cardType === 'AGE'
  const isDangerous = cardType === 'DANGEROUS'
  const isAge = cardType === 'AGE'

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FieldInput name="title" controller={form.control} label="ชื่อการ์ด" />
      <SelectInput
        name="card"
        controller={form.control}
        label="ประเภทการ์ด"
        options={CARD_TYPE_OPTIONS}
      />
      <FieldInput
        name="unit"
        controller={form.control}
        label="จำนวนการ์ด"
        type="number"
      />
      <SelectInput
        name="token"
        controller={form.control}
        label="Token"
        options={TOKEN_OPTIONS}
      />

      {isKnowledgeOrSkill && (
        <>
          <FieldInput
            name="score"
            controller={form.control}
            label="คะแนน"
            type="number"
          />
          <SelectInput
            name="action"
            controller={form.control}
            label="Action"
            options={CARD_ACTION_OPTIONS}
            placeholder="เลือก action"
          />
        </>
      )}

      {isDangerous && (
        <>
          <FieldInput
            name="pick"
            controller={form.control}
            label="จำนวนหยิบ"
            type={'number'}
          />
          <FieldInput
            name="dangerous.0"
            controller={form.control}
            label="อันตราย 1 (0–10)"
            type={'number'}
          />
          <FieldInput
            name="dangerous.1"
            controller={form.control}
            label="อันตราย 2 (0–10)"
            type={'number'}
          />
          <FieldInput
            name="dangerous.2"
            controller={form.control}
            label="อันตราย 3 (0–10)"
            type="number"
          />
        </>
      )}

      {isAge && (
        <>
          <SelectInput
            name="mode"
            controller={form.control}
            label="โหมดการ์ด"
            options={CARD_MODE_OPTIONS}
          />
        </>
      )}
      <div className="flex justify-end">
        <Button>{value ? 'บันทึกการเปลี่ยนแปลง' : 'สร้างการ์ด'}</Button>
      </div>
    </form>
  )
}
