"use client"

import { useEffect } from "react"

interface AdBannerProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  fullWidthResponsive?: boolean
  className?: string
}

export function AdBanner({ adSlot, adFormat = "auto", fullWidthResponsive = true, className = "" }: AdBannerProps) {
  const adSenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID

  useEffect(() => {
    if (adSenseId && typeof window !== "undefined") {
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }
  }, [adSenseId])

  // 開発環境や広告IDが設定されていない場合はプレースホルダーを表示
  if (!adSenseId || process.env.NODE_ENV === "development") {
    return (
      <div
        className={`bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center ${className}`}
      >
        <div className="text-sm text-muted-foreground">
          <div className="mb-2">📢 広告スペース</div>
          <div className="text-xs">{!adSenseId ? "AdSense ID未設定" : "開発環境"}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adSenseId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}
