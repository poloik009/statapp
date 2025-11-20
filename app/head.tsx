export default function Head() {
  const frameMetadata = {
    version: "1",
    imageUrl: "/og-image.png",
    button: {
      title: "View Stats",
      action: {
        type: "launch_frame",
        name: "StatApp",
        url: process.env.NEXT_PUBLIC_APP_URL || "https://statapp.vercel.app",
        splashImageUrl: "/icon-512.png",
        splashBackgroundColor: "#8465CB",
      },
    },
  }

  return (
    <>
      <meta property="fc:miniapp" content={JSON.stringify(frameMetadata)} />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="/og-image.png" />
      <meta property="fc:frame:button:1" content="View Stats" />
      <meta property="fc:frame:button:1:action" content="launch_frame" />
      <link rel="manifest" href="/manifest.json" />
    </>
  )
}
