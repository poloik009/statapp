"use client"

import sdk from "@farcaster/frame-sdk"

export async function initializeFarcasterSDK() {
  const context = await sdk.context
  return context
}

export { sdk }
