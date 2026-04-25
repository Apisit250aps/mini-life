import DataTable from '@/components/share/data-table'
import { useCardsQuery } from '@/lib/client/queries/card.query'
import React from 'react'

export default function CardDataTable() {
  const { data: cards, isPending } = useCardsQuery()
  const columns = React.useMemo(
    () => [
      {
        header: 'ชื่อการ์ด',
        accessorKey: 'title',
      },
      {
        header: 'ประเภทการ์ด',
        accessorKey: 'card',
      },
    ],
    [],
  )
  return (
    <DataTable
      columns={columns}
      data={cards?.data ?? []}
      isLoading={isPending}
    />
  )
}
