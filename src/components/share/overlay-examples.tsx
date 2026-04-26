'use client'

import { useOverlay } from '@/hooks/use-overlay'
import { Button } from '@/components/ui/button'

/**
 * Example component showing how to use the new overlay hook API
 *
 * Usage:
 * ```typescript
 * const ui = useOverlay()
 *
 * // Show dialog
 * ui.dialog.show({
 *   title: 'Dialog Title',
 *   description: 'Optional description',
 *   children: <CustomComponent />,
 *   size: 'md',
 *   closeOutside: true
 * })
 *
 * // Show alert
 * ui.alert.show({
 *   title: 'Confirm Action?',
 *   description: 'Are you sure?',
 *   confirmText: 'ยืนยัน',
 *   cancelText: 'ยกเลิก',
 *   onConfirm: async () => {
 *     // Handle confirmation
 *   }
 * })
 * ```
 */
export function OverlayExamples() {
  const ui = useOverlay()

  const handleShowSimpleDialog = () => {
    ui.dialog.show({
      title: 'Simple Dialog',
      description: 'This is a simple dialog example',
      children: <p>Dialog content here</p>,
    })
  }

  const handleShowLargeDialog = () => {
    ui.dialog.show({
      title: 'Large Dialog',
      size: 'lg',
      children: (
        <div>
          <p>This is a large dialog with more content</p>
          <p>You can put any React component here</p>
        </div>
      ),
    })
  }

  const handleShowAlert = () => {
    ui.alert.show({
      title: 'Delete Item?',
      description: 'This action cannot be undone.',
      confirmText: 'ลบ',
      cancelText: 'ยกเลิก',
      onConfirm: () => {
        console.log('Item deleted!')
      },
    })
  }

  const handleShowAsyncAlert = () => {
    ui.alert.show({
      title: 'Confirm Action',
      description: 'This will perform an async action',
      confirmText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onConfirm: async () => {
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('Async action completed!')
      },
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleShowSimpleDialog}>Show Simple Dialog</Button>
      <Button onClick={handleShowLargeDialog}>Show Large Dialog</Button>
      <Button onClick={handleShowAlert}>Show Alert</Button>
      <Button onClick={handleShowAsyncAlert}>Show Async Alert</Button>
    </div>
  )
}
