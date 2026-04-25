import { ModalDialog } from '@/components/share/overlay'
import React, { useCallback } from 'react'
import CardForm from '../card-form'
import { Button } from '@/components/ui/button'
import { CardFormValues } from '@/internal/entities/card.entity'
import { useCardMutation } from '@/lib/client/queries/card.query'
import { useOverlay } from '@/hooks/use-overlay'

export default function CardCreateAction() {
  const { create } = useCardMutation()
  const { closeAll } = useOverlay()
  const onSubmit = useCallback(
    async (data: CardFormValues) => {
      await create({
        title: data.title,
        card: data.card,
        pick: data.pick,
        dangerous: data.dangerous as [number, number, number],
        score: data.score,
        action: data.action,
        token: data.token as 1 | 2,
        age: data.age,
        ageLevel: data.ageLevel,
      })
      closeAll()
    },
    [create, closeAll],
  )
  return (
    <ModalDialog title={'สร้างการ์ดใหม่'} trigger={<Button>สร้างการ์ด</Button>}>
      <CardForm onSubmit={onSubmit} />
    </ModalDialog>
  )
}
