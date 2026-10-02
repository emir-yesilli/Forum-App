'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Vote = -1 | 0 | 1

type VoteControlProps = {
  initialScore: number
  size?: 'sm' | 'md'
  orientation?: 'vertical' | 'horizontal'
  label: string
}

export function VoteControl({ initialScore, size = 'md', orientation = 'vertical', label }: VoteControlProps) {
  const [vote, setVote] = useState<Vote>(0)
  const score = initialScore + vote
  const cast = (value: 1 | -1) => setVote((current) => (current === value ? 0 : value))

  const buttonClass = cn(
    'flex items-center justify-center rounded-md transition-all duration-150 active:scale-90',
    'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
    size === 'md' ? 'size-7' : 'size-6',
  )
  const iconClass = size === 'md' ? 'size-[18px]' : 'size-4'

  return (
    <div
      role="group"
      aria-label={`${label} için oylama`}
      className={cn('flex shrink-0 items-center', orientation === 'vertical' ? 'flex-col gap-0.5' : 'flex-row gap-1')}
    >
      <button
        type="button"
        aria-pressed={vote === 1}
        aria-label={vote === 1 ? 'Olumlu oyu geri al' : 'Olumlu oy ver'}
        onClick={() => cast(1)}
        className={cn(
          buttonClass,
          vote === 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        <ChevronUp className={iconClass} strokeWidth={2.25} aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        aria-label={`Puan ${score}`}
        className={cn(
          'min-w-[2ch] text-center font-mono tabular-nums',
          size === 'md' ? 'text-[13px]' : 'text-[12px]',
          vote === 1 && 'font-medium text-primary',
          vote === -1 && 'font-medium text-foreground',
          vote === 0 && 'text-foreground/80',
        )}
      >
        {score}
      </span>
      <button
        type="button"
        aria-pressed={vote === -1}
        aria-label={vote === -1 ? 'Olumsuz oyu geri al' : 'Olumsuz oy ver'}
        onClick={() => cast(-1)}
        className={cn(
          buttonClass,
          vote === -1 ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        <ChevronDown className={iconClass} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  )
}
