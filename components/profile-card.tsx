import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Mail, User } from "lucide-react"

export function ProfileCard() {
  const socialLinks = [
    ...(process.env.NEXT_PUBLIC_GITHUB_URL ? [{
      href: process.env.NEXT_PUBLIC_GITHUB_URL,
      label: "GitHub",
      icon: Github,
    }] : []),
    ...(process.env.NEXT_PUBLIC_TWITTER_URL ? [{
      href: process.env.NEXT_PUBLIC_TWITTER_URL,
      label: "Twitter",
      icon: Twitter,
    }] : []),
    ...(process.env.NEXT_PUBLIC_AUTHOR_EMAIL ? [{
      href: `mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`,
      label: "Email",
      icon: Mail,
    }] : []),
  ]

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 mb-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover border-2 border-primary/10"
            />
          </div>
          <h3 className="font-bold text-lg mb-2">{process.env.NEXT_PUBLIC_AUTHOR_NAME || "名無し"}</h3>
          {process.env.NEXT_PUBLIC_AUTHOR_TITLE && (
            <p className="text-sm text-muted-foreground mb-4">{process.env.NEXT_PUBLIC_AUTHOR_TITLE}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {process.env.NEXT_PUBLIC_AUTHOR_DESCRIPTION && (
          <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
            {process.env.NEXT_PUBLIC_AUTHOR_DESCRIPTION}
          </p>
        )}

        {/* SNSリンク */}
        <div className="flex justify-center gap-2 mb-4">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <Button key={social.label} variant="outline" size="sm" asChild>
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

        {/* 詳細プロフィールへのリンク */}
        <div className="text-center">
          <Button variant="ghost" size="sm" asChild className="text-xs">
            <Link href="/about">
              <User className="h-3 w-3 mr-1" />
              詳しいプロフィール
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
