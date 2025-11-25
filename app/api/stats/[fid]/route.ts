import { type NextRequest, NextResponse } from "next/server"

type RouteContext = {
  params: Promise<{ fid: string }>
}

const HUB_URL = "https://nemes.farcaster.xyz:2281"

async function fetchAllCasts(fid: string) {
  try {
    const response = await fetch(`${HUB_URL}/v1/castsByFid?fid=${fid}&pageSize=1000`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch casts:", response.status)
      return []
    }

    const data = await response.json()
    return data.messages || []
  } catch (error) {
    console.error("[v0] Error fetching casts:", error)
    return []
  }
}

async function fetchAllReactions(fid: string) {
  try {
    const response = await fetch(`${HUB_URL}/v1/reactionsByFid?fid=${fid}&pageSize=1000`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch reactions:", response.status)
      return []
    }

    const data = await response.json()
    return data.messages || []
  } catch (error) {
    console.error("[v0] Error fetching reactions:", error)
    return []
  }
}

async function getUserProfile(fid: string) {
  try {
    const response = await fetch(`${HUB_URL}/v1/userDataByFid?fid=${fid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Error fetching profile:", error)
    return null
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { fid } = await context.params

  try {
    console.log("[v0] Fetching stats for FID:", fid)

    const [casts, reactions, profile] = await Promise.all([
      fetchAllCasts(fid),
      fetchAllReactions(fid),
      getUserProfile(fid),
    ])

    console.log("[v0] Fetched casts:", casts.length)
    console.log("[v0] Fetched reactions:", reactions.length)

    // Count total likes and recasts received on user's casts
    let totalLikes = 0
    let totalRecasts = 0

    // Fetch reactions for each cast
    for (const cast of casts.slice(0, 100)) {
      // Limit to first 100 casts for performance
      try {
        if (cast.data?.castAddBody?.hash) {
          const castHash = cast.hash
          const reactionsResponse = await fetch(
            `${HUB_URL}/v1/reactionsByCast?target_fid=${fid}&target_hash=${castHash}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            },
          )

          if (reactionsResponse.ok) {
            const reactionsData = await reactionsResponse.json()
            const castReactions = reactionsData.messages || []

            castReactions.forEach((reaction: any) => {
              if (reaction.data?.reactionBody?.type === 1) {
                // Type 1 = Like
                totalLikes++
              } else if (reaction.data?.reactionBody?.type === 2) {
                // Type 2 = Recast
                totalRecasts++
              }
            })
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching reactions for cast:", error)
      }
    }

    // Check for spam label (simplified check)
    const spamLabel = false // TODO: Implement actual spam detection

    const stats = {
      totalCasts: casts.length,
      totalLikes,
      totalRecasts,
      spamLabel,
    }

    console.log("[v0] Final stats:", stats)

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", message: String(error) }, { status: 500 })
  }
}
