"use client"

import * as React from 'react'
import * as z from "zod"


import { useStoreModal } from '@/hooks/use-store-modal'

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  React.useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  return (
    <div>
        Root page
    </div>
  )
}
