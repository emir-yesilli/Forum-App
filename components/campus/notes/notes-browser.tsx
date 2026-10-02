'use client'

import { useState } from 'react'
import { courses, notes } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SearchInput } from '../search-input'
import { NoteItem } from './note-item'

const noteCourses = Array.from(new Set(notes.map((n) => n.course))).sort((a, b) => a.localeCompare(b, 'tr'))

function courseName(code: string) {
  return courses.find((c) => c.code === code)?.name
}

type CourseFilterProps = {
  query: string
  selected: string | null
  onSelect: (code: string | null) => void
  layout: 'vertical' | 'horizontal'
}

function CourseFilter({ query, selected, onSelect, layout }: CourseFilterProps) {
  const q = query.trim().toLocaleLowerCase('tr')
  const visible = noteCourses.filter((code) =>
    `${code} ${courseName(code) ?? ''}`.toLocaleLowerCase('tr').includes(q),
  )
  const options: { code: string | null; label: string; count: number }[] = [
    ...(q ? [] : [{ code: null, label: 'Tüm Dersler', count: notes.length }]),
    ...visible.map((code) => ({
      code,
      label: code,
      count: notes.filter((n) => n.course === code).length,
    })),
  ]

  if (options.length === 0) {
    return <p className="px-2.5 py-4 text-[13px] text-muted-foreground">Eşleşen ders bulunamadı.</p>
  }

  return (
    <ul className={cn(layout === 'vertical' ? 'flex flex-col' : 'flex gap-1.5')}>
      {options.map((opt) => {
        const active = selected === opt.code
        return (
          <li key={opt.label} className="shrink-0">
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(opt.code)}
              className={cn(
                'flex items-center justify-between gap-3 text-[13.5px] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
                layout === 'vertical' ? 'w-full rounded-md px-2.5 py-[7px]' : 'h-8 rounded-full border px-3.5',
                opt.code && 'font-mono text-[12.5px]',
                active
                  ? layout === 'vertical'
                    ? 'bg-accent font-medium text-primary'
                    : 'border-primary bg-primary text-primary-foreground'
                  : layout === 'vertical'
                    ? 'text-foreground/85 hover:bg-muted hover:text-foreground'
                    : 'border-border text-foreground/80 hover:border-foreground/25',
              )}
            >
              {opt.label}
              {layout === 'vertical' && (
                <span className={cn('font-mono text-[11.5px] font-normal', active ? 'text-primary/70' : 'text-muted-foreground')}>
                  {opt.count}
                </span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function NotesBrowser() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = selected ? notes.filter((n) => n.course === selected) : notes

  return (
    <div className="md:grid md:grid-cols-[264px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
      <aside
        aria-label="Ders filtresi"
        className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] flex-col border-r border-border py-10 pr-6 md:flex"
      >
        <h2 className="px-2.5 text-[22px] font-semibold tracking-[-0.03em]">Notlar</h2>
        <SearchInput value={query} onChange={setQuery} placeholder="Ders ara..." label="Ders ara" className="mt-5" />
        <div className="mt-6 flex-1 overflow-y-auto pb-6">
          <CourseFilter query={query} selected={selected} onSelect={setSelected} layout="vertical" />
        </div>
      </aside>

      <section className="min-w-0 py-8 md:py-12" aria-labelledby="notes-heading">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[12.5px] text-muted-foreground">
              {selected ? courseName(selected) ?? 'Ders notları' : 'Öğrencilerin paylaştığı kaynaklar'}
            </p>
            <h1
              id="notes-heading"
              className="mt-1.5 text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] md:text-[40px]"
            >
              {selected ?? 'Tüm Dersler'}
            </h1>
          </div>
          <p className="shrink-0 pb-1 text-[12.5px] text-muted-foreground">
            <span className="text-foreground">{filtered.length}</span> dosya
          </p>
        </header>

        <div className="-mx-5 mb-6 overflow-x-auto px-5 md:hidden [scrollbar-width:none]">
          <CourseFilter query="" selected={selected} onSelect={setSelected} layout="horizontal" />
        </div>

        <div className="grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </section>
    </div>
  )
}
