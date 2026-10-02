'use client'

import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type SupportButtonProps = {
  count: number
  supported: boolean
  onToggle: () => void
  disabled?: boolean
}

export function SupportButton({ count, supported, onToggle, disabled }: SupportButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={supported}
      aria-label={supported ? `Desteği geri al, ${count} destek` : `Bu yorumu destekle, ${count} destek`}
      title={disabled ? 'Kendi yorumunu destekleyemezsin' : undefined}
      className={cn(
        'group inline-flex h-8 items-center gap-1 rounded-full border px-3 font-mono text-[12.5px] tabular-nums transition-all duration-150',
        'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none active:scale-95',
        'disabled:cursor-not-allowed disabled:opacity-50',
        supported
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border text-foreground/80 hover:border-foreground/25 hover:text-foreground',
      )}
    >
      <Plus
        className={cn('size-3.5 transition-transform duration-200', supported && 'rotate-90')}
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span>{count}</span>
    </button>
  )
}
