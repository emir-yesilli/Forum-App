import type { ReactNode } from 'react'

export function SectionShell({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="md:grid md:grid-cols-[264px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
      {sidebar}
      <div className="min-w-0 py-8 md:py-12">{children}</div>
    </div>
  )
}
