export interface BlogPost {
  id: string
  title: string
  content: string
  publishedAt: string
  revisedAt: string
  eyecatch?: {
    url: string
    height: number
    width: number
  }
  category?: {
    id: string
    name: string
  }
}

export interface BlogResponse {
  contents: BlogPost[]
  totalCount: number
  offset: number
  limit: number
}

export interface Category {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export interface CategoryResponse {
  contents: Category[]
  totalCount: number
  offset: number
  limit: number
}

const API_KEY = process.env.MICROCMS_API_KEY
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN

// モックデータ（開発時用）
const mockBlogData: BlogResponse = {
  contents: [
    {
      id: "sample-1",
      title: "microCMSブログの始め方",
      content:
        "# microCMSブログの始め方\n\nmicroCMSを使ったブログサイトの作成方法について説明します。\n\n## 準備するもの\n\n- microCMSアカウント\n- Next.jsの基本知識\n- 環境変数の設定方法\n\n## 手順\n\n1. microCMSでサービスを作成\n2. APIを設定\n3. コンテンツを作成\n4. Next.jsと連携\n\n```js\n// APIクライアントの例\nconst client = createClient({\n  serviceDomain: 'your-domain',\n  apiKey: 'your-api-key'\n})\n```\n\n詳しくは[公式ドキュメント](https://microcms.io/docs)をご覧ください。",
      publishedAt: "2024-01-15T09:00:00.000Z",
      revisedAt: "2024-01-15T09:00:00.000Z",
      eyecatch: {
        url: "/placeholder.svg?height=400&width=800",
        height: 400,
        width: 800,
      },
      category: {
        id: "tech",
        name: "技術",
      },
    },
    {
      id: "sample-2",
      title: "Next.js 15の新機能",
      content:
        "# Next.js 15の新機能\n\nNext.js 15で追加された新機能について詳しく解説します。\n\n## パフォーマンスの向上\n\nNext.js 15では、ビルド時間とランタイムパフォーマンスが大幅に改善されました。\n\n- **ビルド最適化**: 依存関係の分析が改善\n- **Turbopack**: 開発サーバーの起動時間が短縮\n\n## 新しいルーティング機能\n\n```jsx\n// 並列ルート\nexport default function Layout({ children, @dashboard, @analytics }) {\n  return (\n    <>\n      {children}\n      {dashboard}\n      {analytics}\n    </>\n  )\n}\n```\n\n## まとめ\n\nNext.js 15は開発体験を大きく向上させる重要なアップデートです。",
      publishedAt: "2024-01-10T09:00:00.000Z",
      revisedAt: "2024-01-10T09:00:00.000Z",
      eyecatch: {
        url: "/placeholder.svg?height=400&width=800",
        height: 400,
        width: 800,
      },
      category: {
        id: "tech",
        name: "技術",
      },
    },
    {
      id: "sample-3",
      title: "Tailwind CSSでモダンなデザイン",
      content:
        '# Tailwind CSSでモダンなデザイン\n\nTailwind CSSを使って効率的にスタイリングする方法を紹介します。\n\n## ユーティリティファーストのメリット\n\n- クラス名を考える時間の削減\n- 一貫したデザインシステム\n- カスタマイズの柔軟性\n\n## よく使うユーティリティ\n\n```html\n<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">\n  <h2 class="text-xl font-bold text-gray-900 dark:text-white">カード見出し</h2>\n  <button class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">\n    詳細\n  </button>\n</div>\n```\n\n## レスポンシブデザイン\n\nTailwind CSSでは、簡単にレスポンシブデザインを実装できます。\n\n- `sm:` - 640px以上\n- `md:` - 768px以上\n- `lg:` - 1024px以上\n- `xl:` - 1280px以上\n\n例: `class="text-sm md:text-base lg:text-lg"`',
      publishedAt: "2024-01-05T09:00:00.000Z",
      revisedAt: "2024-01-05T09:00:00.000Z",
      eyecatch: {
        url: "/placeholder.svg?height=400&width=800",
        height: 400,
        width: 800,
      },
      category: {
        id: "design",
        name: "デザイン",
      },
    },
    {
      id: "sample-4",
      title: "効率的なワークフロー",
      content:
        "# 効率的なワークフロー\n\n日々の作業を効率化するためのツールやテクニックを紹介します。\n\n## ポモドーロテクニック\n\n25分の集中作業と5分の休憩を繰り返す時間管理法です。\n\n1. タスクを選ぶ\n2. 25分間集中して作業する\n3. 短い休憩（5分）を取る\n4. 4サイクル後に長い休憩（15-30分）を取る\n\n## タスク管理ツール\n\n- **Todoist**: シンプルで使いやすいタスク管理\n- **Notion**: 柔軟なワークスペース\n- **Trello**: カンバン方式のタスク管理\n\n## 自動化のすすめ\n\n繰り返し行うタスクは自動化しましょう。\n\n```bash\n# シンプルなバックアップスクリプト例\n#!/bin/bash\nrsync -av --delete /source/folder/ /backup/folder/\n```\n\n## まとめ\n\n効率的なワークフローを構築することで、生産性が大幅に向上します。",
      publishedAt: "2024-01-03T09:00:00.000Z",
      revisedAt: "2024-01-03T09:00:00.000Z",
      category: {
        id: "life",
        name: "ライフスタイル",
      },
    },
    {
      id: "sample-5",
      title: "React Hooksの活用法",
      content:
        "# React Hooksの活用法\n\nReact Hooksを効果的に使用する方法について解説します。\n\n## useState\n\n状態管理の基本となるHookです。\n\n```jsx\nconst [count, setCount] = useState(0)\n```",
      publishedAt: "2024-01-02T09:00:00.000Z",
      revisedAt: "2024-01-02T09:00:00.000Z",
      category: { id: "tech", name: "技術" },
    },
    {
      id: "sample-6",
      title: "TypeScriptの型安全性",
      content: "# TypeScriptの型安全性\n\nTypeScriptを使った型安全なコード作成について説明します。",
      publishedAt: "2024-01-01T09:00:00.000Z",
      revisedAt: "2024-01-01T09:00:00.000Z",
      category: { id: "tech", name: "技術" },
    },
  ],
  totalCount: 15,
  offset: 0,
  limit: 12,
}

const mockCategoryData: CategoryResponse = {
  contents: [
    {
      id: "tech",
      name: "技術",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z",
      revisedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "design",
      name: "デザイン",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z",
      revisedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "life",
      name: "ライフスタイル",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      publishedAt: "2024-01-01T00:00:00.000Z",
      revisedAt: "2024-01-01T00:00:00.000Z",
    },
  ],
  totalCount: 3,
  offset: 0,
  limit: 10,
}

export async function getBlogs(queries?: {
  offset?: number
  limit?: number
  orders?: string
}): Promise<BlogResponse> {
  // 環境変数が設定されていない場合はモックデータを返す
  if (!API_KEY || !SERVICE_DOMAIN) {
    console.warn("microCMS環境変数が設定されていません。モックデータを使用します。")
    return mockBlogData
  }

  try {
    const searchParams = new URLSearchParams()

    if (queries?.offset) searchParams.set("offset", queries.offset.toString())
    if (queries?.limit) searchParams.set("limit", queries.limit.toString())
    if (queries?.orders) searchParams.set("orders", queries.orders)

    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs?${searchParams.toString()}`
    console.log("Fetching from:", url)

    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("microCMS API Error:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      })

      // APIエラーの場合もモックデータを返す
      return mockBlogData
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch from microCMS:", error)
    // エラーの場合はモックデータを返す
    return mockBlogData
  }
}

export async function getBlogDetail(contentId: string): Promise<BlogPost> {
  // 環境変数が設定されていない場合はモックデータから検索
  if (!API_KEY || !SERVICE_DOMAIN) {
    console.warn("microCMS環境変数が設定されていません。モックデータを使用します。")
    const mockPost = mockBlogData.contents.find((post) => post.id === contentId)
    if (!mockPost) {
      throw new Error("記事が見つかりません")
    }
    return mockPost
  }

  try {
    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${contentId}`
    console.log("Fetching detail from:", url)

    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("microCMS API Error:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      })

      // APIエラーの場合はモックデータから検索
      const mockPost = mockBlogData.contents.find((post) => post.id === contentId)
      if (!mockPost) {
        throw new Error("記事が見つかりません")
      }
      return mockPost
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch blog detail from microCMS:", error)
    // エラーの場合はモックデータから検索
    const mockPost = mockBlogData.contents.find((post) => post.id === contentId)
    if (!mockPost) {
      throw new Error("記事が見つかりません")
    }
    return mockPost
  }
}

export async function getCategories(): Promise<CategoryResponse> {
  // 環境変数が設定されていない場合はモックデータを返す
  if (!API_KEY || !SERVICE_DOMAIN) {
    console.warn("microCMS環境変数が設定されていません。モックデータを使用します。")
    return mockCategoryData
  }

  try {
    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/categories`
    console.log("Fetching categories from:", url)

    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("microCMS API Error:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      })

      // APIエラーの場合もモックデータを返す
      return mockCategoryData
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch categories from microCMS:", error)
    // エラーの場合はモックデータを返す
    return mockCategoryData
  }
}

// カテゴリ別記事一覧を取得する関数
export async function getBlogsByCategory(
  categoryId: string,
  queries?: {
    offset?: number
    limit?: number
    orders?: string
  },
): Promise<BlogResponse> {
  // 環境変数が設定されていない場合はモックデータを返す
  if (!API_KEY || !SERVICE_DOMAIN) {
    console.warn("microCMS環境変数が設定されていません。モックデータを使用します。")
    const filteredPosts = mockBlogData.contents.filter((post) => post.category?.id === categoryId)
    return {
      ...mockBlogData,
      contents: filteredPosts,
      totalCount: filteredPosts.length,
    }
  }

  try {
    const searchParams = new URLSearchParams()
    searchParams.set("filters", `category[equals]${categoryId}`)

    if (queries?.offset) searchParams.set("offset", queries.offset.toString())
    if (queries?.limit) searchParams.set("limit", queries.limit.toString())
    if (queries?.orders) searchParams.set("orders", queries.orders)

    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs?${searchParams.toString()}`
    console.log("Fetching blogs by category from:", url)

    const res = await fetch(url, {
      headers: {
        "X-MICROCMS-API-KEY": API_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("microCMS API Error:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      })

      // APIエラーの場合もモックデータを返す
      const filteredPosts = mockBlogData.contents.filter((post) => post.category?.id === categoryId)
      return {
        ...mockBlogData,
        contents: filteredPosts,
        totalCount: filteredPosts.length,
      }
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch blogs by category from microCMS:", error)
    // エラーの場合はモックデータを返す
    const filteredPosts = mockBlogData.contents.filter((post) => post.category?.id === categoryId)
    return {
      ...mockBlogData,
      contents: filteredPosts,
      totalCount: filteredPosts.length,
    }
  }
}
