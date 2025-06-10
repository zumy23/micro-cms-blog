import { getBlogDetail, getBlogs } from "@/lib/microcms"
import { BlogHeader } from "@/components/blog-header"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AdBanner } from "@/components/ad-banner"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { TitlePlaceholder } from "@/components/title-placeholder"
import { MarkdownContent } from "@/components/markdown-content"

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  try {
    const { contents } = await getBlogs({ limit: 100 })
    return contents.map((post) => ({
      id: post.id,
    }))
  } catch (error) {
    console.error("Failed to generate static params:", error)
    return []
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  try {
    const post = await getBlogDetail(params.id)
    const isUsingMockData = !process.env.MICROCMS_API_KEY || !process.env.MICROCMS_SERVICE_DOMAIN

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="container py-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            記事一覧に戻る
          </Link>

          {isUsingMockData && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                現在モックデータを表示しています。microCMSを使用するには、環境変数を設定してください。
              </AlertDescription>
            </Alert>
          )}

          <article className="max-w-4xl mx-auto">
            {/* 記事上部の広告 */}
            <div className="mb-8">
              {/* <AdBanner adSlot="1111111111" adFormat="horizontal" className="w-full" /> */}
            </div>

            {post.eyecatch ? (
              <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
                <Image src={post.eyecatch.url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            ) : (
              <TitlePlaceholder title={post.title} variant="detail" className="mb-8" />
            )}

            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <time className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</time>
                {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
              </div>
              <h1 className="text-4xl font-bold leading-tight mb-4">{post.title}</h1>
            </header>

            <MarkdownContent content={post.content} />

            {/* 記事下部の広告 */}
            <div className="mt-12 mb-8">
              {/* <AdBanner adSlot="2222222222" adFormat="horizontal" className="w-full" /> */}
            </div>
          </article>
        </main>
      </div>
    )
  } catch (error) {
    console.error("Failed to load blog post:", error)
    notFound()
  }
}
