"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter style={isDark ? vscDarkPlus : vs} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          img({ src, alt }: any) {
            if (!src) return null
            const imageSrc = typeof src === 'string' ? src : "/placeholder.svg"
            return (
              <div className="relative w-full aspect-video my-8">
                <Image src={imageSrc} alt={alt || ""} fill className="object-cover rounded-lg" />
              </div>
            )
          },
        a({ href, children }: any) {
          if (!href) return null
          const isInternal = href.startsWith("/")

          if (isInternal) {
            return (
              <Link href={href} className="text-primary hover:underline">
                {children}
              </Link>
            )
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {children}
            </a>
          )
        },
        h2({ children }: any) {
          const id = children?.toString().toLowerCase().replace(/\s+/g, "-")
          return (
            <h2 id={id} className="scroll-mt-20">
              {children}
            </h2>
          )
        },
        h3({ children }: any) {
          const id = children?.toString().toLowerCase().replace(/\s+/g, "-")
          return (
            <h3 id={id} className="scroll-mt-20">
              {children}
            </h3>
          )
        },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
