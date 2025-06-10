import { BlogHeader } from "@/components/blog-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: `プライバシーポリシー - ${process.env.NEXT_PUBLIC_BLOG_TITLE || "My Blog"}`,
  description: `${process.env.NEXT_PUBLIC_BLOG_TITLE || "My Blog"}のプライバシーポリシーについて説明しています。`,
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container py-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">プライバシーポリシー</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>個人情報の取り扱いについて</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  当ブログ（以下「当サイト」）では、お客様の個人情報を適切に保護することを重要な責務と考えています。
                  以下に、当サイトにおける個人情報の取り扱いについて説明いたします。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>収集する情報</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <h3>アクセス情報</h3>
                <p>当サイトでは、サイトの改善やユーザー体験の向上のため、以下の情報を収集する場合があります：</p>
                <ul>
                  <li>IPアドレス</li>
                  <li>ブラウザの種類とバージョン</li>
                  <li>アクセス日時</li>
                  <li>閲覧ページ</li>
                  <li>リファラー情報</li>
                </ul>

                <h3>お問い合わせ情報</h3>
                <p>お問い合わせフォームを通じて以下の情報をご提供いただく場合があります：</p>
                <ul>
                  <li>お名前</li>
                  <li>メールアドレス</li>
                  <li>お問い合わせ内容</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>情報の利用目的</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>収集した情報は以下の目的で利用いたします：</p>
                <ul>
                  <li>サイトの運営・改善</li>
                  <li>お問い合わせへの対応</li>
                  <li>統計データの作成（個人を特定できない形式）</li>
                  <li>不正利用の防止</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>第三者への提供</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  当サイトでは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie（クッキー）について</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  当サイトでは、ユーザー体験の向上のためCookieを使用する場合があります。
                  Cookieの使用を希望されない場合は、ブラウザの設定で無効にすることができます。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>お問い合わせ</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  プライバシーポリシーに関するご質問やご意見がございましたら、
                  <a href="mailto:contact@example.com" className="text-primary underline">
                    contact@example.com
                  </a>
                  までお気軽にお問い合わせください。
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>最終更新日: 2024年1月1日</p>
          </div>
        </div>
      </main>
    </div>
  )
}
