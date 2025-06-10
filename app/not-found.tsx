import Link from "next/link"
import { BlogHeader } from "@/components/blog-header"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container py-16 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-4xl font-bold mb-4">ページが見つかりません</h1>
          <p className="text-muted-foreground mb-8">お探しのページは存在しないか、移動した可能性があります。</p>
          <Button asChild>
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
