import type { Club } from '@/lib/data'

export function ClubIntro({ club }: { club: Club }) {
  return (
    <header className="mb-12 max-w-2xl border-b border-border pb-10">
      <p className="text-[12.5px] text-muted-foreground">Öğrenci kulübü</p>
      <h1 className="mt-1.5 text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] text-balance md:text-[40px]">
        {club.name}
      </h1>
      <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-pretty text-foreground/75">{club.description}</p>
      <dl className="mt-6 flex items-center gap-8 text-[13px]">
        <div className="flex items-baseline gap-1.5">
          <dt className="sr-only">Üye sayısı</dt>
          <dd className="font-mono tabular-nums text-foreground">{club.members}</dd>
          <span className="text-muted-foreground">üye</span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <dt className="text-muted-foreground">Kuruluş</dt>
          <dd className="font-mono tabular-nums">{club.founded}</dd>
        </div>
      </dl>
    </header>
  )
}
