'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export type ListItem = {
  slug: string
  label: string
  secondary?: string
}

type AlphabeticalListProps = {
  items: ListItem[]
  basePath: string
  activeSlug?: string
  onNavigate?: () => void
  emptyText: string
}

export function groupAlphabetically(items: ListItem[]) {
  const sorted = [...items].sort((a, b) => a.label.localeCompare(b.label, 'tr'))
  const groups = new Map<string, ListItem[]>()
  for (const item of sorted) {
    const letter = item.label.charAt(0).toLocaleUpperCase('tr')
    const group = groups.get(letter) ?? []
    group.push(item)
    groups.set(letter, group)
  }
  return Array.from(groups.entries())
}

export function AlphabeticalList({ items, basePath, activeSlug, onNavigate, emptyText }: AlphabeticalListProps) {
  const groups = groupAlphabetically(items)

  if (groups.length === 0) {
    return <p className="px-2.5 py-6 text-[13px] text-muted-foreground">{emptyText}</p>
  }

  return (
    <div className="flex flex-col gap-5">
      {groups.map(([letter, group]) => (
        <section key={letter} aria-labelledby={`group-${basePath}-${letter}`}>
          <h3
            id={`group-${basePath}-${letter}`}
            className="mb-1 px-2.5 font-mono text-[11px] font-medium text-muted-foreground/80"
          >
            {letter}
          </h3>
          <ul className="flex flex-col">
            {group.map((item) => {
              const active = item.slug === activeSlug
              return (
                <li key={item.slug}>
                  <Link
                    href={`${basePath}/${item.slug}`}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group flex items-baseline gap-2 rounded-md px-2.5 py-[7px] text-[13.5px] transition-colors duration-150',
                      'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
                      active
                        ? 'bg-accent font-medium text-primary'
                        : 'text-foreground/85 hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <span className="shrink-0">{item.label}</span>
                    {item.secondary && (
                      <span
                        className={cn(
                          'truncate text-[12.5px] font-normal',
                          active ? 'text-primary/70' : 'text-muted-foreground',
                        )}
                      >
                        {item.secondary}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
