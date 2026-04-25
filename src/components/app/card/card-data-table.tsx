import DataTable from '@/components/share/data-table'
import { useCardsQuery } from '@/lib/client/queries/card.query'
import React from 'react'
import { cardColumns } from './card-data-columns'
import { CardEntity } from '@/internal/entities/card.entity'
import { ColumnDef } from '@tanstack/react-table'

export default function CardDataTable() {
  const { data: cards, isPending } = useCardsQuery()

  const { columns, data } = React.useMemo<{
    columns: ColumnDef<CardEntity>[]
    data: CardEntity[]
  }>(() => {
    return {
      columns: cardColumns,
      data: (cards?.data as CardEntity[]) ?? [],
    }
  }, [cards?.data])

  return <DataTable columns={columns} data={data} isLoading={isPending} />
}
