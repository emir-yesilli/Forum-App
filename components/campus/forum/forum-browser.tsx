'use client'

import { useState } from 'react'
import { type ForumCategory, forumCategories, forumTopics } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SearchInput } from '../search-input'
import { ForumTopicRow } from './forum-topic-row'

type Filter = ForumCategory | 'Tümü'
type Sort = 'popular' | 'recent'

export function ForumBrowser() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Filter>('Tümü')
  const [sort, setSort] = useState<Sort>('recent')

  const q = query.trim().toLocaleLowerCase('tr')
  const filtered = forumTopics.filter(
    (t) =>
      (category === 'Tümü' || t.category === category) &&
      (!q || `${t.title} ${t.content}`.toLocaleLowerCase('tr').includes(q)),
  )
  const topics = sort === 'popular' ? [...filtered].sort((a, b) => b.score - a.score) : filtered

  return (
    <div className="mx-auto max-w-3xl py-8 md:py-14">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] md:text-[40px]">Forum</h1>
          <p className="mt-2 text-[14.5px] text-muted-foreground">Kampüs hayatı üzerine açık tartışmalar.</p>
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Konu ara..."
          label="Konu ara"
          className="md:w-64"
        />
      </header>

      <nav aria-label="Forum kategorileri" className="-mx-5 mt-8 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
        <ul className="flex gap-1 border-b border-border">
          {(['Tümü', ...forumCategories] as Filter[]).map((c) => {
            const active = c === category
            return (
              <li key={c} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={cn(
                    'relative h-10 px-2.5 text-[13.5px] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
                    active ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {c}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-2.5 -bottom-px h-[1.5px] bg-primary transition-opacity duration-200',
                      active ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-[12.5px] text-muted-foreground">
          <span className="text-foreground">{topics.length}</span> konu
        </p>
        <div role="group" aria-label="Sıralama" className="flex items-center gap-0.5">
          {(
            [
              ['recent', 'En yeni'],
              ['popular', 'En popüler'],
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

      {topics.length === 0 ? (
        <p className="py-20 text-center text-[14px] text-muted-foreground">Bu aramaya uygun konu bulunamadı.</p>
      ) : (
        <ul className="mt-2 divide-y divide-border">
          {topics.map((topic) => (
            <li key={topic.id}>
              <ForumTopicRow topic={topic} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
