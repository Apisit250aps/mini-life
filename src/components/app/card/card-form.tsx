'use client'

import { FieldInput, SelectInput } from '@/components/share/input'
import {
  CardFormSchema,
  type CardFormValues,
} from '@/internal/entities/card.entity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import React from 'react'

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

export default function CardForm() {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    defaultValues: {
      title: '',
      card: 'KNOWLEDGE',
      pick: null,
      dangerous: [0, 0, 0],
      score: 0,
      action: null,
      token: 1,
      age: null,
      ageLevel: null,
    },
  })

  const cardType = useWatch({ control: form.control, name: 'card' })

  const isKnowledgeOrSkill = cardType === 'KNOWLEDGE' || cardType === 'SKILL'
  const isDangerous = cardType === 'DANGEROUS'
  const isAge = cardType === 'AGE'

  return (
    <form
      onSubmit={form.handleSubmit((data) => console.log(data))}
      className="flex flex-col gap-4"
    >
      <FieldInput name="title" controller={form.control} label="ชื่อการ์ด" />
      <SelectInput
        name="card"
        controller={form.control}
        label="ประเภทการ์ด"
        options={CARD_TYPE_OPTIONS}
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
          <FieldInput name="action" controller={form.control} label="Action" />
        </>
      )}

      {isDangerous && (
        <>
          <FieldInput
            name="pick"
            controller={form.control}
            label="จำนวนหยิบ"
            type="number"
          />
          <FieldInput
            name="dangerous.0"
            controller={form.control}
            label="อันตราย 1 (0–10)"
            type="number"
          />
          <FieldInput
            name="dangerous.1"
            controller={form.control}
            label="อันตราย 2 (0–10)"
            type="number"
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
          <FieldInput
            name="age"
            controller={form.control}
            label="อายุ"
            type="number"
          />
          <FieldInput
            name="ageLevel"
            controller={form.control}
            label="ระดับอายุ"
            type="number"
          />
        </>
      )}
    </form>
  )
}
