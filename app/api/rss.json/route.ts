import { NextResponse } from 'next/server'
import { getBlogs } from '@/lib/microcms'

export const runtime = 'edge'

function cleanContent(content: string): string {
  return content
    .replace(/#{1,6}\s+/g, '') // Markdownのヘッダーを削除
    .replace(/```[\s\S]*?```/g, '') // コードブロックを削除
    .replace(/`[^`]*`/g, '') // インラインコードを削除
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // リンクをテキストのみに
    .replace(/\n\s*\n/g, ' ') // 改行を削除
    .trim()
    .substring(0, 200) + '...'
}

export async function GET() {
  try {
    const blogs = await getBlogs({ limit: 50 })
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
    const blogTitle = process.env.NEXT_PUBLIC_BLOG_TITLE || 'My Blog'
    const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'ブログの説明'
    const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || '名無し'

    const items = blogs.contents.map(blog => ({
      id: `${siteUrl}/blog/${blog.id}`,
      title: blog.title,
      content_text: cleanContent(blog.content),
      content_html: blog.content,
      url: `${siteUrl}/blog/${blog.id}`,
      date_published: blog.publishedAt,
      date_modified: blog.revisedAt,
      ...(blog.category && {
        tags: [blog.category.name]
      }),
      ...(blog.eyecatch && {
        image: blog.eyecatch.url
      })
    }))

    const jsonFeed = {
      version: "https://jsonfeed.org/version/1.1",
      title: blogTitle,
      description: siteDescription,
      home_page_url: siteUrl,
      feed_url: `${siteUrl}/api/rss.json`,
      language: "ja",
      author: {
        name: authorName
      },
      items: items
    }

    return new NextResponse(JSON.stringify(jsonFeed, null, 2), {
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('JSON feed generation error:', error)
    return new NextResponse('JSONフィード生成でエラーが発生しました', { status: 500 })
  }
}