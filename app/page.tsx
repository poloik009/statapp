"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useFarcasterContext } from "@/hooks/use-farcaster-context"
import { ConnectButton } from "@/components/connect-button"
import { StatsDisplay } from "@/components/stats-display"
import { Spinner } from "@/components/ui/spinner"

export default function HomePage() {
  const { isConnected } = useAccount()
  const { user, isLoading: isLoadingContext } = useFarcasterContext()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isReady || isLoadingContext) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Spinner className="w-12 h-12 text-primary" />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-3 text-balance">StatApp</h1>
          <p className="text-muted-foreground text-lg">View your Farcaster statistics</p>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-4 mb-4">
            {user.pfpUrl && (
              <img
                src={user.pfpUrl || "/placeholder.svg"}
                alt={user.displayName || user.username || "User"}
                className="w-12 h-12 rounded-full border-2 border-primary/20"
              />
            )}
            <div className="text-left">
              <div className="font-semibold text-foreground">{user.displayName || user.username}</div>
              <div className="text-sm text-muted-foreground">FID: {user.fid}</div>
            </div>
          </div>
        )}

        {/* Connect Button */}
        {!isConnected && (
          <div className="flex flex-col items-center gap-6">
            <ConnectButton />
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Connect your wallet to view your Farcaster statistics including posts, likes, and recasts
            </p>
          </div>
        )}

        {/* Stats Display */}
        {isConnected && user && <StatsDisplay fid={user.fid} />}
      </div>
    </main>
  )
}
