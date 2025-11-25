import { type NextRequest, NextResponse } from "next/server"

type RouteContext = {
  params: Promise<{ fid: string }>
}

const HUB_URL = "https://hub.pinata.cloud"

async function fetchAllCasts(fid: string) {
  try {
    console.log("[v0] Fetching casts for FID:", fid)
    const response = await fetch(`${HUB_URL}/v1/castsByFid?fid=${fid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch casts:", response.status, await response.text())
      return []
    }

    const data = await response.json()
    const messages = data.messages || []

    // Filter only actual casts (not replies) to count posts
    const casts = messages.filter((msg: any) => {
      const castData = msg.data?.castAddBody
      // A cast is a post if it doesn't have a parent cast (i.e., it's not a reply)
      return castData && !castData.parentCastId
    })

    console.log("[v0] Total casts (posts only):", casts.length, "Total messages:", messages.length)
    return casts
  } catch (error) {
    console.error("[v0] Error fetching casts:", error)
    return []
  }
}

async function fetchReactionsForCast(fid: string, castHash: string, reactionType: number) {
  try {
    const response = await fetch(
      `${HUB_URL}/v1/reactionsByCast?target_fid=${fid}&target_hash=${castHash}&reaction_type=${reactionType}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.messages || []
  } catch (error) {
    return []
  }
}

async function calculateReceivedReactions(fid: string, casts: any[]) {
  let totalLikes = 0
  let totalRecasts = 0

  // Limit to first 50 casts to avoid timeout for users with many posts
  const castsToCheck = casts.slice(0, 50)

  console.log("[v0] Calculating reactions for", castsToCheck.length, "casts")

  // Process casts in batches to avoid overwhelming the API
  const batchSize = 10
  for (let i = 0; i < castsToCheck.length; i += batchSize) {
    const batch = castsToCheck.slice(i, i + batchSize)

    const batchResults = await Promise.all(
      batch.map(async (cast: any) => {
        const castHash = cast.hash
        if (!castHash) return { likes: 0, recasts: 0 }

        const [likes, recasts] = await Promise.all([
          fetchReactionsForCast(fid, castHash, 1), // Type 1 = Like
          fetchReactionsForCast(fid, castHash, 2), // Type 2 = Recast
        ])

        return {
          likes: likes.length,
          recasts: recasts.length,
        }
      }),
    )

    // Sum up batch results
    batchResults.forEach((result) => {
      totalLikes += result.likes
      totalRecasts += result.recasts
    })
  }

  console.log("[v0] Total likes:", totalLikes, "Total recasts:", totalRecasts)
  return { totalLikes, totalRecasts }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { fid } = await context.params

  try {
    console.log("[v0] === Fetching stats for FID:", fid, "===")

    const casts = await fetchAllCasts(fid)

    const { totalLikes, totalRecasts } = await calculateReceivedReactions(fid, casts)

    const stats = {
      totalCasts: casts.length,
      totalLikes,
      totalRecasts,
      spamLabel: false, // TODO: Implement spam detection
    }

    console.log("[v0] === Final stats ===", stats)

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", message: String(error) }, { status: 500 })
  }
}
