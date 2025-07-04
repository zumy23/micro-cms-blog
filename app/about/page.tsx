import { BlogHeader } from "@/components/blog-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Mail, MapPin, Calendar, Code, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "microCMS",
    "Vercel",
    "Git",
    "Docker",
  ]

  const experiences = [
    {
      title: "フロントエンドエンジニア",
      company: "Tech Company",
      period: "2022年 - 現在",
      description: "React/Next.jsを使用したWebアプリケーション開発",
    },
    {
      title: "Webデベロッパー",
      company: "Digital Agency",
      period: "2020年 - 2022年",
      description: "企業サイトやECサイトの制作・運用",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* ヒーローセクション */}
          <section className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src={process.env.NEXT_PUBLIC_GITHUB_USERNAME ?
                  `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}.png?size=128` :
                  "/placeholder.svg?height=128&width=128"
                }
                alt="プロフィール画像"
                fill
                className="rounded-full object-cover border-4 border-primary/10"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">{process.env.NEXT_PUBLIC_AUTHOR_NAME || "名無し"}</h1>
            {process.env.NEXT_PUBLIC_AUTHOR_TITLE && (
              <p className="text-xl text-muted-foreground mb-6">{process.env.NEXT_PUBLIC_AUTHOR_TITLE} & ブロガー</p>
            )}
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              {process.env.NEXT_PUBLIC_AUTHOR_LOCATION && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{process.env.NEXT_PUBLIC_AUTHOR_LOCATION}</span>
                </div>
              )}
              {process.env.NEXT_PUBLIC_BLOG_START_YEAR && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>ブログ開始: {process.env.NEXT_PUBLIC_BLOG_START_YEAR}</span>
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4">
              {process.env.NEXT_PUBLIC_GITHUB_URL && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
              )}
              {process.env.NEXT_PUBLIC_TWITTER_URL && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Link>
                </Button>
              )}
              {process.env.NEXT_PUBLIC_AUTHOR_EMAIL && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Link>
                </Button>
              )}
            </div>
          </section>

          {/* 自己紹介セクション */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  自己紹介
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  こんにちは！{process.env.NEXT_PUBLIC_AUTHOR_TITLE ? `${process.env.NEXT_PUBLIC_AUTHOR_TITLE}の` : ""}{process.env.NEXT_PUBLIC_AUTHOR_NAME || "名無し"}です。
                  {process.env.NEXT_PUBLIC_AUTHOR_DESCRIPTION ?
                    process.env.NEXT_PUBLIC_AUTHOR_DESCRIPTION :
                    "Web開発に情熱を注いでおり、特にReactとNext.jsを使ったモダンなWebアプリケーション開発を得意としています。"
                  }
                </p>
                <p>
                  このブログでは、日々の開発で学んだ技術的な知見や、
                  新しいツールやフレームワークについての情報を共有しています。
                  また、プログラミング初心者の方にも分かりやすい記事を 心がけて執筆しています。
                </p>
                <p>
                  技術以外にも、効率的な開発環境の構築方法や、 チーム開発でのベストプラクティスなども
                  積極的に発信していきたいと思います。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* スキルセクション */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  技術スタック
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ブログについてセクション */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>このブログについて</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  このブログは<strong>Next.js</strong>と<strong>microCMS</strong>を
                  使用して構築されています。記事の管理はmicroCMSで行い、 フロントエンドはNext.jsのApp Routerを活用して
                  高速で SEO に優れたサイトを実現しています。
                </p>
                <h3>使用技術</h3>
                <ul>
                  <li>
                    <strong>Next.js 15</strong> - React フレームワーク
                  </li>
                  <li>
                    <strong>microCMS</strong> - ヘッドレス CMS
                  </li>
                  <li>
                    <strong>Tailwind CSS</strong> - CSS フレームワーク
                  </li>
                  <li>
                    <strong>shadcn/ui</strong> - UI コンポーネント
                  </li>
                  <li>
                    <strong>Vercel</strong> - ホスティング
                  </li>
                </ul>
                <p>
                  ソースコードは
                  <Link href="https://github.com" className="text-primary underline">
                    GitHub
                  </Link>
                  で 公開予定です。技術的な質問や改善提案がありましたら、 お気軽にお声がけください。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* お問い合わせセクション */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>お問い合わせ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  記事に関するご質問や、お仕事のご相談など、 お気軽にお問い合わせください。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {process.env.NEXT_PUBLIC_AUTHOR_EMAIL && (
                    <Button asChild>
                      <Link href={`mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        メールで連絡
                      </Link>
                    </Button>
                  )}
                  {process.env.NEXT_PUBLIC_TWITTER_URL && (
                    <Button variant="outline" asChild>
                      <Link href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" />
                        TwitterでDM
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
