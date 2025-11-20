"use client"

import { useState, useEffect } from "react"
import { initializeFarcasterSDK } from "@/lib/farcaster-sdk"

type FarcasterUser = {
  fid: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

export function useFarcasterContext() {
  const [user, setUser] = useState<FarcasterUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadContext() {
      try {
        const context = await initializeFarcasterSDK()
        setUser(context.user)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContext()
  }, [])

  return { user, isLoading, error }
}
