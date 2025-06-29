import { NextResponse } from 'next/server'
import { Feed } from 'feed'
import { getBlogs } from '@/lib/microcms'

export const runtime = 'edge'

export async function GET() {
  try {
    const blogs = await getBlogs({ limit: 50 }) // RSS用に50件取得
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
    const blogTitle = process.env.NEXT_PUBLIC_BLOG_TITLE || 'My Blog'
    const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'ブログの説明'
    const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || '名無し'
    const authorEmail = process.env.NEXT_PUBLIC_AUTHOR_EMAIL || ''

    const feed = new Feed({
      title: blogTitle,
      description: siteDescription,
      id: siteUrl,
      link: siteUrl,
      language: 'ja',
      image: `${siteUrl}/placeholder-logo.png`,
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `© ${new Date().getFullYear()} ${blogTitle}. All rights reserved.`,
      generator: 'Next.js',
      feedLinks: {
        rss2: `${siteUrl}/api/rss`,
        json: `${siteUrl}/api/rss.json`,
        atom: `${siteUrl}/api/rss.atom`,
      },
      author: {
        name: authorName,
        email: authorEmail,
        link: siteUrl,
      },
    })

    // ブログ記事をRSSフィードに追加
    blogs.contents.forEach(blog => {
      // contentから最初の200文字を説明として使用
      const description = blog.content
        .replace(/#{1,6}\s+/g, '') // Markdownのヘッダーを削除
        .replace(/```[\s\S]*?```/g, '') // コードブロックを削除
        .replace(/`[^`]*`/g, '') // インラインコードを削除
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // リンクをテキストのみに
        .replace(/\n\s*\n/g, ' ') // 改行を削除
        .trim()
        .substring(0, 200) + '...'

      feed.addItem({
        title: blog.title,
        id: `${siteUrl}/blog/${blog.id}`,
        link: `${siteUrl}/blog/${blog.id}`,
        description: description,
        content: blog.content,
        date: new Date(blog.publishedAt),
        category: blog.category ? [{
          name: blog.category.name,
          term: blog.category.id,
        }] : [],
        image: blog.eyecatch?.url || `${siteUrl}/placeholder.jpg`,
      })
    })

    return new NextResponse(feed.rss2(), {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // 1時間キャッシュ
      },
    })
  } catch (error) {
    console.error('RSS generation error:', error)
    return new NextResponse('RSS生成でエラーが発生しました', { status: 500 })
  }
}