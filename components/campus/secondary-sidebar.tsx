'use client'

import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AlphabeticalList, type ListItem } from './alphabetical-list'
import { SearchInput } from './search-input'

type SecondarySidebarProps = {
  title: string
  items: ListItem[]
  basePath: string
  searchPlaceholder: string
  searchLabel: string
  emptyText: string
  mobileLabel: string
}

function filterItems(items: ListItem[], query: string) {
  const q = query.trim().toLocaleLowerCase('tr')
  if (!q) return items
  return items.filter((item) =>
    `${item.label} ${item.secondary ?? ''}`.toLocaleLowerCase('tr').includes(q),
  )
}

export function SecondarySidebar({
  title,
  items,
  basePath,
  searchPlaceholder,
  searchLabel,
  emptyText,
  mobileLabel,
}: SecondarySidebarProps) {
  const pathname = usePathname()
  const activeSlug = pathname.split('/')[2]
  const active = items.find((i) => i.slug === activeSlug)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const filtered = filterItems(items, query)

  return (
    <>
      {/* Mobile: compact collapsible selector */}
      <div className="sticky top-[101px] z-30 -mx-5 border-b border-border bg-background/90 px-5 py-2.5 backdrop-blur-md md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${basePath}-mobile-list`}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-full items-center justify-between rounded-lg bg-muted px-3 text-left text-[14px] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="text-[12px] text-muted-foreground">{mobileLabel}</span>
            <span className="truncate font-medium">{active?.label ?? 'Seç'}</span>
          </span>
          <ChevronDown
            className={cn('size-4 text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        <div
          id={`${basePath}-mobile-list`}
          hidden={!open}
          className="mt-2.5 animate-in fade-in-0 slide-in-from-top-1 duration-150"
        >
          <SearchInput value={query} onChange={setQuery} placeholder={searchPlaceholder} label={searchLabel} />
          <div className="mt-3 max-h-[55dvh] overflow-y-auto overscroll-contain pb-2">
            <AlphabeticalList
              items={filtered}
              basePath={basePath}
              activeSlug={activeSlug}
              onNavigate={() => setOpen(false)}
              emptyText={emptyText}
            />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <aside
        aria-label={title}
        className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] flex-col border-r border-border py-10 pr-6 md:flex"
      >
        <h2 className="px-2.5 text-[22px] font-semibold tracking-[-0.03em]">{title}</h2>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={searchPlaceholder}
          label={searchLabel}
          className="mt-5"
        />
        <div className="-mr-3 mt-6 flex-1 overflow-y-auto overscroll-contain pr-3 pb-6 [scrollbar-width:thin]">
          <AlphabeticalList items={filtered} basePath={basePath} activeSlug={activeSlug} emptyText={emptyText} />
        </div>
      </aside>
    </>
  )
}
