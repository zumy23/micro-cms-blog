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
    {
      href: "https://github.com",
      label: "GitHub",
      icon: Github,
    },
    {
      href: "https://twitter.com",
      label: "Twitter",
      icon: Twitter,
    },
    {
      href: "mailto:contact@example.com",
      label: "Email",
      icon: Mail,
    },
    {
      href: "/rss.xml",
      label: "RSS",
      icon: Rss,
    },
  ]

  return (
    <footer className="bg-muted/30 border-t mt-16">
      {/* フッター上部の広告 */}
      <div className="container py-8">
        <AdBanner adSlot="3333333333" adFormat="horizontal" className="w-full max-w-4xl mx-auto" />
      </div>

      <Separator />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">My Blog</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              技術、デザイン、ライフスタイルについて書いているブログです。
              日々の学びや発見を共有し、読者の皆様にとって有益な情報をお届けします。
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
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
            <span>&copy; {currentYear} My Blog. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              利用規約
            </Link>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>by</span>
              <Link href="/about" className="hover:text-primary transition-colors">
                山田太郎
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
