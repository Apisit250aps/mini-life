import { ActionDropdown } from '@/components/share/overlay'
import { CardEntity } from '@/internal/entities/card.entity'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import CardUpdateAction from './action/card-update'
import CardDelete from './action/card-delete'

const ColumnAction = ({ row }: CellContext<CardEntity, unknown>) => {
  return (
    <ActionDropdown>
      <CardUpdateAction card={row.original} />
      <CardDelete id={row.original.id} />
    </ActionDropdown>
  )
}

export const cardColumns: ColumnDef<CardEntity>[] = [
  {
    header: 'ชื่อการ์ด',
    accessorKey: 'title',
  },
  {
    header: 'ประเภทการ์ด',
    accessorKey: 'card',
  },
  {
    header: 'จัดการ',
    cell: ColumnAction,
  },
]
