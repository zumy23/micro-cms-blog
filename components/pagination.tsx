"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const searchParams = useSearchParams()

  // URLパラメータを保持しながらページ番号を変更する関数
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    const queryString = params.toString()
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  // 表示するページ番号の範囲を計算
  const getPageNumbers = () => {
    const delta = 2 // 現在のページの前後に表示するページ数
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8" aria-label="ページネーション">
      {/* 前のページボタン */}
      {currentPage > 1 ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={createPageUrl(currentPage - 1)} aria-label="前のページ">
            <ChevronLeft className="h-4 w-4 mr-1" />
            前へ
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
          前へ
        </Button>
      )}

      {/* ページ番号ボタン */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span key={`dots-${index}`} className="px-2 py-1 text-muted-foreground">
                ...
              </span>
            )
          }

          const page = pageNumber as number
          const isCurrentPage = page === currentPage

          return (
            <Button
              key={page}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              asChild={!isCurrentPage}
              disabled={isCurrentPage}
              className="min-w-[40px]"
            >
              {isCurrentPage ? (
                <span aria-current="page">{page}</span>
              ) : (
                <Link href={createPageUrl(page)} aria-label={`ページ ${page}`}>
                  {page}
                </Link>
              )}
            </Button>
          )
        })}
      </div>

      {/* 次のページボタン */}
      {currentPage < totalPages ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={createPageUrl(currentPage + 1)} aria-label="次のページ">
            次へ
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          次へ
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </nav>
  )
}
