"use client"

import { useState, useEffect } from "react"

type UserStats = {
  totalCasts: number
  totalLikes: number
  totalRecasts: number
  spamLabel: boolean
}

export function useUserStats(fid: number | null) {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!fid) {
      setStats(null)
      return
    }

    async function fetchStats() {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch user stats from API
        const response = await fetch(`/api/stats/${fid}`)

        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [fid])

  return { stats, isLoading, error }
}
