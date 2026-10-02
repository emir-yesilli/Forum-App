'use client'

import { useState } from 'react'
import { Check, LogOut, Pencil, Settings, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { currentUser } from '@/lib/data'
import { cn } from '@/lib/utils'

const statRows = [
  { label: 'Yorumlar', key: 'reviews' },
  { label: 'Öneriyor', key: 'recommends' },
  { label: 'Önermiyor', key: 'notRecommends' },
  { label: 'Notlar', key: 'notes' },
  { label: 'Forum konuları', key: 'topics' },
] as const

const actionClass =
  'flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-[13.5px] text-foreground transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none'

export function ProfileMenu() {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(currentUser.nickname)

  return (
    <Popover onOpenChange={(open) => !open && setEditing(false)}>
      <PopoverTrigger
        aria-label="Hesabım"
        className="flex size-8 items-center justify-center rounded-full bg-foreground text-[12px] font-medium text-background uppercase transition-transform duration-150 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none data-[popup-open]:ring-2 data-[popup-open]:ring-ring/30 data-[popup-open]:ring-offset-2"
      >
        {currentUser.nickname.slice(0, 1)}
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-72 gap-0 p-0">
        <div className="px-4 pt-4 pb-3">
          <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Hesabım</p>
          {editing ? (
            <form
              className="mt-1.5 flex items-center gap-1.5"
              onSubmit={(e) => {
                e.preventDefault()
                setEditing(false)
              }}
            >
              <div className="flex h-9 flex-1 items-center rounded-md border border-input px-2.5 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring/15">
                <span className="text-muted-foreground">@</span>
                <label htmlFor="nickname" className="sr-only">
                  Yeni nickname
                </label>
                <input
                  id="nickname"
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.replace(/\s/g, '').toLowerCase())}
                  className="w-full bg-transparent text-[14px] outline-none"
                  maxLength={20}
                />
              </div>
              <button
                type="submit"
                aria-label="Kaydet"
                className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <Check className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Vazgeç"
                onClick={() => {
                  setDraft(currentUser.nickname)
                  setEditing(false)
                }}
                className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </form>
          ) : (
            <p className="mt-1 text-[17px] font-medium tracking-[-0.02em]">@{currentUser.nickname}</p>
          )}
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
            Diğer kullanıcılar seni yalnızca bu nickname ile görür.
          </p>
        </div>

        <dl className="border-y border-border px-4 py-2">
          {statRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between py-1.5 text-[13.5px]">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-mono text-[13px] tabular-nums">{currentUser.stats[row.key]}</dd>
            </div>
          ))}
        </dl>

        <div className="p-1.5">
          <button type="button" className={cn(actionClass)} onClick={() => setEditing(true)}>
            <Pencil className="size-4 text-muted-foreground" aria-hidden="true" />
            {"Nickname'i düzenle"}
          </button>
          <button type="button" className={actionClass}>
            <Settings className="size-4 text-muted-foreground" aria-hidden="true" />
            Ayarlar
          </button>
          <button type="button" className={actionClass}>
            <LogOut className="size-4 text-muted-foreground" aria-hidden="true" />
            Çıkış yap
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
