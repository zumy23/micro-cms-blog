import { getBlogsByCategory, getCategories } from "@/lib/microcms"
import { BlogCard } from "@/components/blog-card"
import { BlogHeader } from "@/components/blog-header"
import { CategoryList } from "@/components/category-list"
import { ProfileCard } from "@/components/profile-card"
import { AdBanner } from "@/components/ad-banner"
import { Pagination } from "@/components/pagination"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"

export const runtime = 'edge'

interface CategoryPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

const POSTS_PER_PAGE = 6

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const categoryId = resolvedParams.id
  const currentPage = Number(resolvedSearchParams.page) || 1
  const offset = (currentPage - 1) * POSTS_PER_PAGE

  try {
    const [{ contents: posts, totalCount }, { contents: categories }] = await Promise.all([
      getBlogsByCategory(categoryId, {
        limit: POSTS_PER_PAGE,
        offset: offset,
        orders: "-publishedAt",
      }),
      getCategories(),
    ])

    // カテゴリが存在するか確認
    const currentCategory = categories.find((category) => category.id === categoryId)
    if (!currentCategory) {
      notFound()
    }

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)
    const isUsingMockData = !process.env.MICROCMS_API_KEY || !process.env.MICROCMS_SERVICE_DOMAIN

    // 無効なページ番号の場合は404にリダイレクト
    if (currentPage > totalPages && totalPages > 0) {
      return (
        <div className="min-h-screen bg-background">
          <BlogHeader />
          <main className="container py-8 mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>指定されたページが見つかりません。</AlertDescription>
            </Alert>
          </main>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="container py-8 mx-auto">
          {isUsingMockData && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                現在モックデータを表示しています。microCMSを使用するには、環境変数 MICROCMS_SERVICE_DOMAIN と
                MICROCMS_API_KEY を設定してください。
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">カテゴリ: {currentCategory.name}</h1>
            <p className="text-muted-foreground">
              {currentCategory.name}に関する記事一覧
              {totalCount > 0 && (
                <span className="ml-2 text-sm">
                  （全{totalCount}件中 {offset + 1}-{Math.min(offset + POSTS_PER_PAGE, totalCount)}件を表示）
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 記事一覧を左側に配置 */}
            <div className="lg:col-span-3 order-1">
              {posts.length > 0 ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post, index) => (
                      <div key={post.id}>
                        <BlogCard post={post} />
                        {/* 3記事ごとに広告を表示 */}
                        {(index + 1) % 3 === 0 && index < posts.length - 1 && (
                          <div className="col-span-full mt-6 mb-6">
                            {/* <AdBanner adSlot="1234567890" adFormat="horizontal" className="max-w-full" /> */}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/category/${categoryId}`} />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">このカテゴリの記事はまだありません</p>
                </div>
              )}
            </div>

            {/* サイドバー（プロフィール + 広告 + カテゴリ一覧）を右側に配置 */}
            <div className="lg:col-span-1 order-2">
              <div className="sticky top-6 space-y-6">
                <ProfileCard />

                {/* サイドバー広告 */}
                {/* <AdBanner adSlot="0987654321" adFormat="vertical" className="min-h-[250px]" /> */}

                <CategoryList categories={categories} activeCategory={categoryId} />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  } catch (error) {
    console.error("Failed to load category page:", error)
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="container py-8 mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              カテゴリデータの取得に失敗しました。しばらく時間をおいてから再度お試しください。
            </AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }
}
