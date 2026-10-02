'use client'

import { useState } from 'react'
import { currentUser, type ReviewComment as ReviewCommentType } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ReviewComment } from './review-comment'
import { ReviewComposer } from './review-composer'

type ReviewFeedProps = {
  initialComments: ReviewCommentType[]
  subjectName: string
  showCourse?: boolean
  courseOptions?: string[]
}

type SortMode = 'support' | 'recent'

export function ReviewFeed({ initialComments, subjectName, showCourse, courseOptions }: ReviewFeedProps) {
  const [comments, setComments] = useState(initialComments)
  const [supported, setSupported] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<SortMode>('support')

  const toggleSupport = (id: string) => {
    setSupported((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const sorted =
    sort === 'support'
      ? [...comments].sort(
          (a, b) => b.support + (supported.has(b.id) ? 1 : 0) - (a.support + (supported.has(a.id) ? 1 : 0)),
        )
      : comments

  const recommendCount = comments.filter((c) => c.recommends).length

  return (
    <div>
      <ReviewComposer
        subjectName={subjectName}
        courseOptions={showCourse ? courseOptions : undefined}
        onSubmit={(draft) =>
          setComments((prev) => [
            {
              id: `own-${Date.now()}`,
              author: currentUser.nickname,
              time: 'şimdi',
              support: 0,
              ...draft,
            },
            ...prev,
          ])
        }
      />

      <div className="mt-10 flex items-center justify-between border-b border-border pb-3">
        <p className="text-[12.5px] text-muted-foreground">
          <span className="text-foreground">{comments.length}</span> yorum
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <span className="text-foreground">{recommendCount}</span> öneriyor
        </p>
        <div role="group" aria-label="Sıralama" className="flex items-center gap-0.5">
          {(
            [
              ['support', 'En destekli'],
              ['recent', 'En yeni'],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              aria-pressed={sort === mode}
              onClick={() => setSort(mode)}
              className={cn(
                'rounded-md px-2 py-1 text-[12.5px] transition-colors focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
                sort === mode ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="py-16 text-center text-[14px] text-muted-foreground">
          Henüz yorum yok. İlk deneyimi sen paylaş.
        </p>
      ) : (
        <div className="divide-y divide-border">
          {sorted.map((comment) => (
            <ReviewComment
              key={comment.id}
              comment={comment}
              supported={supported.has(comment.id)}
              onToggleSupport={() => toggleSupport(comment.id)}
              isOwn={comment.author === currentUser.nickname && comment.id.startsWith('own-')}
              showCourse={showCourse}
            />
          ))}
        </div>
      )}
    </div>
  )
}
