import { ActionDropdown } from '@/components/share/overlay'
import { CardEntity } from '@/internal/entities/card.entity'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import CardUpdateAction from './action/card-update'
import CardDelete from './action/card-delete'
import { CARD_ACTION_OPTIONS } from './card-form'

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
    header: 'จำนวน',
    accessorKey: 'unit',
  },
  {
    header: 'แต้ม',
    accessorKey: 'score',
  },
  {
    header: 'ความเสี่ยง',
    accessorKey: 'dangerous',
    cell: ({ getValue }) => {
      const dangerous = getValue() as [number, number, number]
      return (
        <div className="flex flex-col">
          <span>ง่าน: {dangerous[0]}</span>
          <span>ปานกลาง: {dangerous[1]}</span>
          <span>ยาก: {dangerous[2]}</span>
        </div>
      )
    },
  },
  {
    header: 'การ์ดที่เลือก',
    accessorKey: 'pick',
  },
  {
    header: 'จ่ายโทเคน',
    accessorKey: 'token',
  },
  {
    header: 'แอคชั่น',
    accessorKey: 'action',
    cell: ({ getValue }) => {
      const action = getValue() as string
      const actionLabel = CARD_ACTION_OPTIONS.find(
        (option) => option.value === action,
      )?.label
      return <span className="font-mono">{actionLabel ?? '...'}</span>
    },
  },
  {
    header: 'โหมด',
    accessorKey: 'mode',
  },
  {
    header: 'จัดการ',
    cell: ColumnAction,
  },
]
