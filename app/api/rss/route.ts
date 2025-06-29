import { NextResponse } from 'next/server'
import { getBlogs } from '@/lib/microcms'

export const runtime = 'edge'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

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
    const currentYear = new Date().getFullYear()

    const rssItems = blogs.contents.map(blog => {
      const description = escapeXml(cleanContent(blog.content))
      const title = escapeXml(blog.title)
      const pubDate = new Date(blog.publishedAt).toUTCString()
      
      return `
    <item>
      <title>${title}</title>
      <description>${description}</description>
      <link>${siteUrl}/blog/${blog.id}</link>
      <guid>${siteUrl}/blog/${blog.id}</guid>
      <pubDate>${pubDate}</pubDate>
      ${blog.category ? `<category>${escapeXml(blog.category.name)}</category>` : ''}
    </item>`
    }).join('')

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(blogTitle)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${siteUrl}</link>
    <language>ja</language>
    <copyright>© ${currentYear} ${escapeXml(blogTitle)}. All rights reserved.</copyright>
    <generator>Next.js</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('RSS generation error:', error)
    return new NextResponse('RSS生成でエラーが発生しました', { status: 500 })
  }
}