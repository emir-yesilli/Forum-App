'use client'

import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RecommendationBadge({ recommends }: { recommends: boolean }) {
  const Icon = recommends ? ThumbsUp : ThumbsDown
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-[12.5px] font-medium',
        recommends ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
      {recommends ? 'Öneriyor' : 'Önermiyor'}
    </span>
  )
}

type RecommendationButtonsProps = {
  value: boolean | null
  onChange: (value: boolean) => void
}

export function RecommendationButtons({ value, onChange }: RecommendationButtonsProps) {
  const options = [
    { value: true, label: 'Öneriyorum', Icon: ThumbsUp },
    { value: false, label: 'Önermiyorum', Icon: ThumbsDown },
  ]
  return (
    <div role="radiogroup" aria-label="Görüşün" className="inline-flex rounded-full bg-muted p-0.5">
      {options.map(({ value: optionValue, label, Icon }) => {
        const selected = value === optionValue
        return (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(optionValue)}
            className={cn(
              'inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12.5px] transition-all duration-150',
              'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
              selected
                ? 'bg-background font-medium text-primary shadow-[0_1px_2px_oklch(0_0_0/0.08),0_0_0_1px_oklch(0_0_0/0.04)]'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
