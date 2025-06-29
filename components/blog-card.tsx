import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TitlePlaceholder } from "./title-placeholder"
import type { BlogPost } from "@/lib/microcms"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // MarkdownとHTMLからプレーンテキストを抽出する関数
  const extractPlainText = (content: string) => {
    // HTMLタグを削除
    let plainText = content.replace(/<[^>]*>/g, "")
    
    // Markdownの記法を削除
    return plainText
      .replace(/#+\s+/g, "") // 見出し
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // リンク
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // 画像
      .replace(/`{1,3}[^`]*`{1,3}/g, "") // インラインコードとコードブロック
      .replace(/\*\*([^*]+)\*\*/g, "$1") // 太字
      .replace(/\*([^*]+)\*/g, "$1") // 斜体
      .replace(/~~([^~]+)~~/g, "$1") // 取り消し線
      .replace(/>\s+/g, "") // 引用
      .replace(/\n/g, " ") // 改行を空白に
      .replace(/\s+/g, " ") // 連続する空白を一つに
      .trim()
  }

  // 記事の概要を生成（最初の100文字）
  const excerpt = extractPlainText(post.content).substring(0, 100) + "..."

  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        {post.eyecatch ? (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <Image src={post.eyecatch.url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        ) : (
          <TitlePlaceholder title={post.title} variant="card" className="rounded-t-lg" />
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <time className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</time>
            {post.category && <Badge variant="secondary">{post.category.name}</Badge>}
          </div>
          <h3 className="font-semibold line-clamp-2 leading-tight">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground line-clamp-3">{excerpt}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
