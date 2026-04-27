import { Card, CardContent } from '@/components/ui/card'
import { Terminal } from '@/components/ui/terminal'
import { cn } from '@/lib/utils'
import React from 'react'

export function TerminalContent({
  children,
  className,
}: React.ComponentProps<'div'>) {
  return (
    <Card
      className={cn(
        'rounded-none outline-1 outline-green-500 bg-black text-green-500',
        className,
      )}
    >
      {children}
    </Card>
  )
}
