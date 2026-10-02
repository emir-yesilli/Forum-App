'use client'

import { useId, useState } from 'react'
import { currentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

type ForumReplyBoxProps = {
  placeholder: string
  onSubmit: (text: string) => void
  onCancel?: () => void
  autoFocus?: boolean
  className?: string
  submitLabel?: string
}

export function ForumReplyBox({
  placeholder,
  onSubmit,
  onCancel,
  autoFocus,
  className,
  submitLabel = 'Yanıtla',
}: ForumReplyBoxProps) {
  const id = useId()
  const [text, setText] = useState('')
  const canSubmit = text.trim().length > 0

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!canSubmit) return
        onSubmit(text.trim())
        setText('')
      }}
      className={cn(
        'rounded-xl border border-border bg-background transition-[border-color,box-shadow] duration-200 focus-within:border-foreground/15 focus-within:shadow-[0_1px_12px_-4px_oklch(0_0_0/0.08)]',
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <textarea
        id={id}
        autoFocus={autoFocus}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel?.()
        }}
        rows={2}
        placeholder={placeholder}
        className="block w-full resize-none bg-transparent px-3.5 pt-3 pb-2 text-[14px] leading-relaxed placeholder:text-muted-foreground/80 focus:outline-none"
      />
      <div className="flex items-center justify-between gap-3 px-2.5 pb-2.5">
        <span className="pl-1 text-[12px] text-muted-foreground">@{currentUser.nickname} olarak</span>
        <div className="flex items-center gap-1.5">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-7 rounded-full px-3 text-[12.5px] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              Vazgeç
            </button>
          )}
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-7 rounded-full bg-primary px-3.5 text-[12.5px] font-medium text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-35"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
