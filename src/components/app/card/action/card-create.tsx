import { ModalDialog } from '@/components/share/overlay'
import React, { useCallback } from 'react'
import CardForm from '../card-form'
import { Button } from '@/components/ui/button'
import { CardFormValues } from '@/internal/entities/card.entity'
import { useCardMutation } from '@/lib/client/queries/card.query'
import { useOverlay } from '@/hooks/use-overlay'
import { Plus } from 'lucide-react'

export default function CardCreateAction() {
  const { create } = useCardMutation()
  const { closeAll } = useOverlay()
  const onSubmit = useCallback(
    async (data: CardFormValues) => {
      await create({
        title: data.title,
        unit: data.unit,
        card: data.card,
        pick: data.pick,
        dangerous: data.dangerous as [number, number, number],
        score: data.score,
        action: data.action,
        token: data.token as 1 | 2,
        mode: data.mode,
      })
      closeAll()
    },
    [create, closeAll],
  )
  return (
    <ModalDialog
      title={'สร้างการ์ดใหม่'}
      trigger={
        <Button>
          <Plus /> สร้างการ์ด
        </Button>
      }
    >
      <CardForm onSubmit={onSubmit} />
    </ModalDialog>
  )
}
