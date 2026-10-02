'use client'

import type { ReviewComment as ReviewCommentType } from '@/lib/data'
import { RecommendationBadge } from './recommendation'
import { SupportButton } from './support-button'

type ReviewCommentProps = {
  comment: ReviewCommentType
  supported: boolean
  onToggleSupport: () => void
  isOwn?: boolean
  showCourse?: boolean
}

export function ReviewComment({ comment, supported, onToggleSupport, isOwn, showCourse }: ReviewCommentProps) {
  const count = comment.support + (supported ? 1 : 0)
  return (
    <article className="py-7 first:pt-2">
      <header className="flex items-baseline justify-between gap-4">
        <p className="text-[13.5px] font-medium tracking-[-0.01em]">
          @{comment.author}
          {isOwn && <span className="ml-2 text-[11.5px] font-normal text-primary">sen</span>}
        </p>
        <time className="shrink-0 text-[12.5px] text-muted-foreground">{comment.time}</time>
      </header>

      <p className="mt-2.5 max-w-[62ch] text-[15.5px] leading-[1.65] text-pretty text-foreground/90">
        {comment.text}
      </p>

      {showCourse && comment.course && (
        <p className="mt-3 text-[12.5px] text-muted-foreground">
          Aldığı ders: <span className="font-mono text-foreground/80">{comment.course}</span>
        </p>
      )}

      <footer className="mt-4 flex items-center justify-between">
        <RecommendationBadge recommends={comment.recommends} />
        <SupportButton count={count} supported={supported} onToggle={onToggleSupport} disabled={isOwn} />
      </footer>
    </article>
  )
}
