import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "StatApp - Farcaster Statistics"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F6FB",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #E8E4F3 2%, transparent 0%), radial-gradient(circle at 75px 75px, #E8E4F3 2%, transparent 0%)",
        backgroundSize: "100px 100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "32px",
          padding: "80px 120px",
          boxShadow: "0 20px 60px rgba(132, 101, 203, 0.2)",
        }}
      >
        <h1
          style={{
            fontSize: 96,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #8465CB 0%, #6B4FB8 100%)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
            marginBottom: 24,
          }}
        >
          StatApp
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#6B7280",
            margin: 0,
          }}
        >
          View Your Farcaster Statistics
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
