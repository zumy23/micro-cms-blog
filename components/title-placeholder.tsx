interface TitlePlaceholderProps {
  title: string
  variant?: "card" | "detail"
  className?: string
}

export function TitlePlaceholder({ title, variant = "card", className = "" }: TitlePlaceholderProps) {
  const gradients = [
    "from-blue-500/20 via-blue-400/10 to-blue-300/5",
    "from-purple-500/20 via-purple-400/10 to-purple-300/5",
    "from-green-500/20 via-green-400/10 to-green-300/5",
    "from-orange-500/20 via-orange-400/10 to-orange-300/5",
    "from-pink-500/20 via-pink-400/10 to-pink-300/5",
  ]

  // タイトルの文字数に基づいてグラデーションを選択
  const gradientIndex = title.length % gradients.length
  const selectedGradient = gradients[gradientIndex]

  const textSize = variant === "detail" ? "text-2xl md:text-3xl" : "text-lg"
  const padding = variant === "detail" ? "p-8" : "p-6"

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br ${selectedGradient} flex items-center justify-center ${padding} ${className}`}
    >
      <div className="text-center">
        <h3 className={`${textSize} font-bold line-clamp-3 text-foreground/80 leading-tight`}>{title}</h3>
        <div className="mt-4 w-12 h-1 bg-primary/30 rounded-full mx-auto"></div>
      </div>
    </div>
  )
}
