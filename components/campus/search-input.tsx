'use client'

import { Search, X } from 'lucide-react'
import { useId } from 'react'
import { cn } from '@/lib/utils'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  className?: string
}

export function SearchInput({ value, onChange, placeholder, label, className }: SearchInputProps) {
  const id = useId()
  return (
    <div
      className={cn(
        'group flex h-9 items-center gap-2 rounded-lg bg-muted px-3 transition-shadow duration-150',
        'focus-within:bg-background focus-within:ring-1 focus-within:ring-primary/35 focus-within:shadow-[0_0_0_4px_oklch(0.32_0.085_264/0.06)]',
        className,
      )}
    >
      <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full min-w-0 bg-transparent text-[13.5px] placeholder:text-muted-foreground/80 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Aramayı temizle"
          className="rounded text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
