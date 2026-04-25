import { ConfirmDialog } from '@/components/share/overlay'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useCardMutation } from '@/lib/client/queries/card.query'
import { Trash } from 'lucide-react';
import React, { useCallback } from 'react'

export default function CardDelete({ id }: { id: string }) {
  const { remove } = useCardMutation()

  const onConfirm = useCallback(async () => {
    await remove(id)
  }, [remove, id])

  return (
    <ConfirmDialog
      title={'คุณแน่ใจหรือไม่ว่าต้องการลบการ์ดนี้?'}
      description="การกระทำนี้ไม่สามารถย้อนกลับได้"
      onConfirm={onConfirm}
      trigger={
        <DropdownMenuItem variant={'destructive'}>
          <Trash /> ลบการ์ด
        </DropdownMenuItem>
      }
    />
  )
}
