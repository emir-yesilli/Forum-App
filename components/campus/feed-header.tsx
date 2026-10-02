import type { ReactNode } from 'react'

export function FeedHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-8 max-w-2xl">
      <p className="text-[12.5px] text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-1.5 text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] text-balance md:text-[40px]">
        {title}
      </h1>
      {children}
    </header>
  )
}
