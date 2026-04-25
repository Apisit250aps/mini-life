import { ModalDialog } from '@/components/share/overlay'
import React, { useCallback } from 'react'
import CardForm from '../card-form'
import { CardEntity, CardFormValues } from '@/internal/entities/card.entity'
import { useCardMutation } from '@/lib/client/queries/card.query'
import { useOverlay } from '@/hooks/use-overlay'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pen } from 'lucide-react'

export default function CardUpdateAction({ card }: { card: CardEntity }) {
  const { update } = useCardMutation()
  const { closeAll } = useOverlay()
  const onSubmit = useCallback(
    async (data: CardFormValues) => {
      await update(card.id, {
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
    [update, card.id, closeAll],
  )
  return (
    <ModalDialog
      title={'แก้ไขการ์ด'}
      trigger={
        <DropdownMenuItem>
          <Pen />
          แก้ไขการ์ด
        </DropdownMenuItem>
      }
    >
      <CardForm
        onSubmit={onSubmit}
        value={{
          title: card.title,
          unit: card.unit,
          card: card.card,
          pick: card.pick,
          dangerous: card.dangerous,
          score: card.score,
          action: card.action,
          token: card.token,
          mode: card.mode,
        }}
      />
    </ModalDialog>
  )
}
