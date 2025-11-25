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
    console.log("[v0] Casts response:", data.messages?.length || 0)
    return data.messages || []
  } catch (error) {
    console.error("[v0] Error fetching casts:", error)
    return []
  }
}

async function fetchUserLikes(fid: string) {
  try {
    console.log("[v0] Fetching likes for FID:", fid)
    const response = await fetch(`${HUB_URL}/v1/reactionsByFid?fid=${fid}&reaction_type=1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch likes:", response.status)
      return []
    }

    const data = await response.json()
    console.log("[v0] Likes response:", data.messages?.length || 0)
    return data.messages || []
  } catch (error) {
    console.error("[v0] Error fetching likes:", error)
    return []
  }
}

async function fetchUserRecasts(fid: string) {
  try {
    console.log("[v0] Fetching recasts for FID:", fid)
    const response = await fetch(`${HUB_URL}/v1/reactionsByFid?fid=${fid}&reaction_type=2`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch recasts:", response.status)
      return []
    }

    const data = await response.json()
    console.log("[v0] Recasts response:", data.messages?.length || 0)
    return data.messages || []
  } catch (error) {
    console.error("[v0] Error fetching recasts:", error)
    return []
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { fid } = await context.params

  try {
    console.log("[v0] === Fetching stats for FID:", fid, "===")

    const [casts, likes, recasts] = await Promise.all([fetchAllCasts(fid), fetchUserLikes(fid), fetchUserRecasts(fid)])

    const stats = {
      totalCasts: casts.length,
      totalLikes: likes.length,
      totalRecasts: recasts.length,
      spamLabel: false, // TODO: Implement spam detection
    }

    console.log("[v0] === Final stats ===", stats)

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats", message: String(error) }, { status: 500 })
  }
}
