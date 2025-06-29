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
    const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME || '名無し'
    const currentDate = new Date().toISOString()

    const atomEntries = blogs.contents.map(blog => {
      const summary = escapeXml(cleanContent(blog.content))
      const title = escapeXml(blog.title)
      const publishedDate = new Date(blog.publishedAt).toISOString()
      const updatedDate = new Date(blog.revisedAt).toISOString()
      
      return `
  <entry>
    <title>${title}</title>
    <link href="${siteUrl}/blog/${blog.id}" />
    <id>${siteUrl}/blog/${blog.id}</id>
    <published>${publishedDate}</published>
    <updated>${updatedDate}</updated>
    <summary>${summary}</summary>
    <author>
      <name>${escapeXml(authorName)}</name>
    </author>
    ${blog.category ? `<category term="${escapeXml(blog.category.id)}" label="${escapeXml(blog.category.name)}" />` : ''}
  </entry>`
    }).join('')

    const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(blogTitle)}</title>
  <subtitle>${escapeXml(siteDescription)}</subtitle>
  <link href="${siteUrl}" />
  <link href="${siteUrl}/api/rss.atom" rel="self" />
  <id>${siteUrl}</id>
  <updated>${currentDate}</updated>
  <author>
    <name>${escapeXml(authorName)}</name>
  </author>
  <generator>Next.js</generator>
  ${atomEntries}
</feed>`

    return new NextResponse(atomXml, {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Atom feed generation error:', error)
    return new NextResponse('Atomフィード生成でエラーが発生しました', { status: 500 })
  }
}