import Link from "next/link"
import { BookOpen, Github, Twitter, Mail, Rss, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AdBanner } from "./ad-banner"

export function BlogFooter() {
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { href: "/", label: "ホーム" },
    { href: "/about", label: "About" },
    { href: "/category/tech", label: "技術" },
    { href: "/category/design", label: "デザイン" },
    { href: "/category/life", label: "ライフスタイル" },
  ]

  const socialLinks = [
    process.env.NEXT_PUBLIC_GITHUB_URL && {
      href: process.env.NEXT_PUBLIC_GITHUB_URL,
      label: "GitHub",
      icon: Github,
    },
    process.env.NEXT_PUBLIC_TWITTER_URL && {
      href: process.env.NEXT_PUBLIC_TWITTER_URL,
      label: "Twitter",
      icon: Twitter,
    },
    process.env.NEXT_PUBLIC_AUTHOR_EMAIL && {
      href: `mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`,
      label: "Email",
      icon: Mail,
    },
    {
      href: "/api/rss",
      label: "RSS",
      icon: Rss,
    },
  ].filter(Boolean)

  return (
    <footer className="bg-muted/30 border-t mt-16">
      {/* フッター上部の広告 */}
      <div className="container py-8">
        {/* <AdBanner adSlot="3333333333" adFormat="horizontal" className="w-full max-w-4xl mx-auto" /> */}
      </div>

      <Separator />

      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">{process.env.NEXT_PUBLIC_BLOG_TITLE || "My Blog"}</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              {process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "技術、デザイン、ライフスタイルについて書いているブログです。"}
              日々の学びや発見を共有し、読者の皆様にとって有益な情報をお届けします。
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                if (!social) return null
                const Icon = social.icon
                return (
                  <Button key={social.label} variant="outline" size="icon" asChild>
                    <Link
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="font-semibold mb-4">ナビゲーション</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 最近の記事 */}
          <div>
            <h3 className="font-semibold mb-4">最近の記事</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/sample-1"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  microCMSブログの始め方
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/sample-2"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  Next.js 15の新機能
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/sample-3"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  Tailwind CSSでモダンなデザイン
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 下部情報 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>&copy; {currentYear} {process.env.NEXT_PUBLIC_BLOG_TITLE || "My Blog"}. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {process.env.NEXT_PUBLIC_SHOW_PRIVACY_POLICY === 'true' && (
              <Link href="/privacy" className="hover:text-primary transition-colors">
                プライバシーポリシー
              </Link>
            )}
            {process.env.NEXT_PUBLIC_SHOW_TERMS_OF_SERVICE === 'true' && (
              <Link href="/terms" className="hover:text-primary transition-colors">
                利用規約
              </Link>
            )}
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>by</span>
              <Link href="/about" className="hover:text-primary transition-colors">
                {process.env.NEXT_PUBLIC_AUTHOR_NAME || "名無し"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
