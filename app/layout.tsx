import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BlogFooter } from "@/components/blog-footer"
import { GoogleAdSense } from "@/components/google-adsense"

export const metadata: Metadata = {
  title: "My Blog - 技術とライフスタイルのブログ",
  description: "技術、デザイン、ライフスタイルについて書いているブログです。日々の学びや発見を共有しています。",
  generator: "v0.dev",
  keywords: ["ブログ", "技術", "デザイン", "ライフスタイル", "Next.js", "microCMS"],
  authors: [{ name: "山田太郎" }],
  openGraph: {
    title: "My Blog - 技術とライフスタイルのブログ",
    description: "技術、デザイン、ライフスタイルについて書いているブログです。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog - 技術とライフスタイルのブログ",
    description: "技術、デザイン、ライフスタイルについて書いているブログです。",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* <GoogleAdSense /> */}
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex-1">{children}</div>
          <BlogFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
