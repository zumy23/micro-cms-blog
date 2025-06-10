import { BlogHeader } from "@/components/blog-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "利用規約 - My Blog",
  description: "My Blogの利用規約について説明しています。",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">利用規約</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>第1条（適用）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  本利用規約（以下「本規約」）は、当ブログ（以下「当サイト」）の利用に関する条件を定めるものです。
                  当サイトをご利用いただく際は、本規約に同意いただいたものとみなします。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第2条（利用目的）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>当サイトは、以下の目的で運営されています：</p>
                <ul>
                  <li>技術情報の共有</li>
                  <li>デザインに関する知識の提供</li>
                  <li>ライフスタイルに関する情報発信</li>
                  <li>読者との交流促進</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第3条（禁止事項）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>当サイトの利用にあたり、以下の行為を禁止します：</p>
                <ul>
                  <li>法令に違反する行為</li>
                  <li>当サイトの運営を妨害する行為</li>
                  <li>他の利用者や第三者に迷惑をかける行為</li>
                  <li>著作権を侵害する行為</li>
                  <li>商用目的での無断利用</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第4条（著作権）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  当サイトに掲載されているコンテンツ（文章、画像、動画等）の著作権は、
                  当サイト運営者または正当な権利者に帰属します。 無断での複製、転載、配布は禁止されています。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第5条（免責事項）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  当サイトの情報は、正確性や完全性を保証するものではありません。
                  当サイトの利用により生じた損害について、運営者は一切の責任を負いません。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第6条（規約の変更）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  本規約は、必要に応じて変更される場合があります。
                  変更後の規約は、当サイトに掲載された時点で効力を生じるものとします。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第7条（お問い合わせ）</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  本規約に関するご質問やご意見がございましたら、
                  <a href="mailto:contact@example.com" className="text-primary underline">
                    contact@example.com
                  </a>
                  までお気軽にお問い合わせください。
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>制定日: 2024年1月1日</p>
            <p>最終更新日: 2024年1月1日</p>
          </div>
        </div>
      </main>
    </div>
  )
}
