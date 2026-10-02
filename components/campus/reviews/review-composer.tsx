'use client'

import { useId, useState } from 'react'
import { currentUser } from '@/lib/data'
import { cn } from '@/lib/utils'
import { RecommendationButtons } from './recommendation'

type Draft = { text: string; recommends: boolean; course?: string }

type ReviewComposerProps = {
  subjectName: string
  courseOptions?: string[]
  onSubmit: (draft: Draft) => void
}

export function ReviewComposer({ subjectName, courseOptions, onSubmit }: ReviewComposerProps) {
  const id = useId()
  const [text, setText] = useState('')
  const [recommends, setRecommends] = useState<boolean | null>(null)
  const [course, setCourse] = useState('')
  const [focused, setFocused] = useState(false)

  const needsCourse = Boolean(courseOptions)
  const canSubmit = text.trim().length >= 10 && recommends !== null && (!needsCourse || course)
  const expanded = focused || text.length > 0

  const submit = () => {
    if (!canSubmit || recommends === null) return
    onSubmit({ text: text.trim(), recommends, course: course || undefined })
    setText('')
    setRecommends(null)
    setCourse('')
    setFocused(false)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className={cn(
        'rounded-xl border bg-background transition-[border-color,box-shadow] duration-200',
        expanded ? 'border-foreground/15 shadow-[0_1px_12px_-4px_oklch(0_0_0/0.08)]' : 'border-border',
      )}
    >
      <label htmlFor={id} className="sr-only">
        {subjectName} hakkında yorum yaz
      </label>
      <textarea
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocused(true)}
        rows={expanded ? 3 : 1}
        placeholder={`${subjectName} hakkındaki deneyimini paylaş...`}
        className="block w-full resize-none bg-transparent px-4 pt-3.5 pb-3 text-[14.5px] leading-relaxed placeholder:text-muted-foreground/80 focus:outline-none"
      />
      {expanded && (
        <div className="flex flex-col gap-3 border-t border-border px-3 py-3 animate-in fade-in-0 duration-150 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <RecommendationButtons value={recommends} onChange={setRecommends} />
            {courseOptions && (
              <>
                <label htmlFor={`${id}-course`} className="sr-only">
                  Aldığın ders
                </label>
                <select
                  id={`${id}-course`}
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="h-8 rounded-full border border-border bg-background px-3 font-mono text-[12px] text-foreground/80 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  <option value="">Aldığın ders</option>
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-[12px] text-muted-foreground">@{currentUser.nickname} olarak</span>
            <button
              type="submit"
              disabled={!canSubmit}
              className="h-8 rounded-full bg-primary px-4 text-[12.5px] font-medium text-primary-foreground transition-opacity hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-35"
            >
              Paylaş
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
