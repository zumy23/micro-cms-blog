import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "lucide-react"
import type { Category } from "@/lib/microcms"

interface CategoryListProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryList({ categories, activeCategory }: CategoryListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Tag className="h-5 w-5" />
          カテゴリ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="no-underline">
            <Badge
              variant={!activeCategory ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors"
            >
              すべて
            </Badge>
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="no-underline">
              <Badge
                variant={activeCategory === category.id ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
