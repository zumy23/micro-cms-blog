import Link from "next/link"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function BlogHeader() {
  const blogTitle = process.env.NEXT_PUBLIC_BLOG_TITLE || ""
  return (
    <header className="flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl">{blogTitle}</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            ホーム
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
