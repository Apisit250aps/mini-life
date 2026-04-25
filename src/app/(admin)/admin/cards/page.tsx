'use client'
import CardCreateAction from '@/components/app/card/action/card-create'
import CardDataTable from '@/components/app/card/card-data-table'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>การ์ดทั้งหมด</CardTitle>
        <CardAction>
          <CardCreateAction />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardDataTable />
      </CardContent>
    </Card>
  )
}
