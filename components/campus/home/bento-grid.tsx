import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

type BentoCardProps = {
  href: string
  title: string
  description: string
  className?: string
  children: React.ReactNode
}

function BentoCard({ href, title, description, className, children }: BentoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_oklch(0.17_0.006_265/0.03)] md:p-7',
        'transition-[transform,border-color,box-shadow] duration-300 ease-out',
        'hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_8px_24px_-12px_oklch(0.17_0.006_265/0.12)]',
        'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
        'motion-reduce:transition-colors motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <div className="flex-1">{children}</div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-foreground">{title}</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <ArrowRight
          aria-hidden="true"
          className="mb-1 size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-primary motion-reduce:group-hover:translate-x-0"
        />
      </div>
    </Link>
  )
}

const accentLine =
  'bg-primary/15 transition-colors duration-300 group-hover:bg-primary/30'

function ProfessorsVisual() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col justify-center gap-5">
      <div className="flex items-baseline gap-3">
        <span className="text-6xl font-semibold tracking-[-0.05em] text-foreground md:text-7xl">4.6</span>
        <span className="text-[13px] text-muted-foreground">ortalama öneri puanı</span>
      </div>
      <div className="flex max-w-sm flex-col gap-2.5">
        {[
          { label: 'Öneriyor', value: 82 },
          { label: 'Kararsız', value: 12 },
          { label: 'Önermiyor', value: 6 },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className="w-20 text-[12.5px] text-muted-foreground">{row.label}</span>
            <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-primary/40 transition-colors duration-300 group-hover:bg-primary/70"
                style={{ width: `${row.value}%` }}
              />
            </span>
            <span className="w-8 text-right font-mono text-[11.5px] text-muted-foreground tabular-nums">
              {row.value}%
            </span>
          </div>
        ))}
      </div>
      <p className="max-w-sm border-l border-border pl-3 text-[13.5px] leading-relaxed text-foreground/70 italic">
        {'“Anlatımı çok net, sınavları derste işlenenlerle birebir örtüşüyor.”'}
      </p>
    </div>
  )
}

function CoursesVisual() {
  const codes = ['MATH101', 'CS201', 'PHY101', 'CENG315', 'MATH201', 'STAT210']
  return (
    <ul aria-hidden="true" className="flex flex-wrap gap-1.5">
      {codes.map((code, index) => (
        <li
          key={code}
          className={cn(
            'rounded-md border px-2 py-1 font-mono text-[11.5px] tracking-tight transition-colors duration-300',
            index < 2
              ? 'border-primary/20 bg-accent text-primary group-hover:border-primary/35'
              : 'border-border text-muted-foreground',
          )}
        >
          {code}
        </li>
      ))}
    </ul>
  )
}

function ClubsVisual() {
  const initials = ['AI', 'AK', 'YK', 'MT', 'FK']
  return (
    <div aria-hidden="true" className="flex items-center">
      <div className="flex -space-x-2">
        {initials.map((value, index) => (
          <span
            key={value}
            className={cn(
              'flex size-9 items-center justify-center rounded-full border-2 border-card text-[11px] font-medium',
              index === 0
                ? 'bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {value}
          </span>
        ))}
      </div>
      <span className="ml-3 whitespace-nowrap text-[12.5px] text-muted-foreground">+11 topluluk</span>
    </div>
  )
}

function ForumVisual() {
  const threads = [
    { title: 'Final haftası çalışma grubu', votes: 128 },
    { title: 'Yaz stajı tavsiyeleri', votes: 94 },
    { title: 'Kütüphane 7/24 açılmalı mı?', votes: 71 },
    { title: 'Seçmeli ders önerileri', votes: 46 },
  ]
  return (
    <ul aria-hidden="true" className="flex flex-col">
      {threads.map((thread, index) => (
        <li
          key={thread.title}
          className="flex items-center gap-3 border-b border-border/70 py-3 first:pt-0 last:border-b-0"
        >
          <span
            className={cn(
              'w-8 font-mono text-[11.5px] tabular-nums',
              index === 0
                ? 'text-primary/70 transition-colors duration-300 group-hover:text-primary'
                : 'text-muted-foreground',
            )}
          >
            {thread.votes}
          </span>
          <span className="truncate text-[13.5px] text-foreground/80">{thread.title}</span>
        </li>
      ))}
    </ul>
  )
}

function NotesVisual() {
  const files = [
    { title: 'Calculus 1 — Vize Notları', meta: 'MATH101 · 38 sayfa' },
    { title: 'Algoritma Analizi Özeti', meta: 'CS201 · 22 sayfa' },
    { title: 'Elektromanyetik Formül Kağıdı', meta: 'PHY201 · 4 sayfa' },
  ]
  return (
    <ul aria-hidden="true" className="grid gap-2 sm:grid-cols-3">
      {files.map((file, index) => (
        <li
          key={file.title}
          className="flex items-center gap-3 rounded-xl border border-border/80 bg-background px-3 py-2.5"
        >
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-lg',
              index === 0
                ? 'bg-accent text-primary/70 transition-colors duration-300 group-hover:text-primary'
                : 'bg-muted text-muted-foreground',
            )}
          >
            <FileText className="size-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-foreground/85">{file.title}</span>
            <span className="block truncate font-mono text-[11px] text-muted-foreground">{file.meta}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export function BentoGrid() {
  return (
    <section id="kesfet" aria-labelledby="kesfet-title" className="scroll-mt-24 py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-2 md:mb-12">
        <h2 id="kesfet-title" className="text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">
          {"Campus'ta neler var?"}
        </h2>
        <p className="text-[15px] text-muted-foreground">Beş alan, tek topluluk.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:auto-rows-[minmax(220px,auto)] lg:grid-cols-4">
        <BentoCard
          href="/hocalar"
          title="Hocalar"
          description="Gerçek öğrenci deneyimlerini keşfet."
          className="md:col-span-2 lg:row-span-2"
        >
          <ProfessorsVisual />
        </BentoCard>
        <BentoCard
          href="/dersler"
          title="Dersler"
          description="MATH101, CS201 ve daha fazlası."
          className="md:col-span-1 lg:col-span-2"
        >
          <CoursesVisual />
        </BentoCard>
        <BentoCard href="/kulupler" title="Kulüpler" description="Kampüsteki toplulukları keşfet.">
          <ClubsVisual />
        </BentoCard>
        <BentoCard
          href="/forum"
          title="Forum"
          description="Kampüsün gündemini takip et."
          className="md:col-span-2 lg:col-span-1 lg:row-span-2"
        >
          <ForumVisual />
        </BentoCard>
        <BentoCard
          href="/notlar"
          title="Notlar"
          description="Öğrencilerin paylaştığı kaynaklar."
          className="md:col-span-2 lg:col-span-3"
        >
          <NotesVisual />
        </BentoCard>
      </div>
    </section>
  )
}
