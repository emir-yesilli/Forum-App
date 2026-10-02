import { SecondarySidebar } from '@/components/campus/secondary-sidebar'
import { SectionShell } from '@/components/campus/section-shell'
import { professors } from '@/lib/data'

export default function HocalarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionShell
      sidebar={
        <SecondarySidebar
          title="Hocalar"
          basePath="/hocalar"
          items={professors.map((p) => ({ slug: p.slug, label: p.name }))}
          searchPlaceholder="Hoca ara..."
          searchLabel="Hoca ara"
          emptyText="Eşleşen hoca bulunamadı."
          mobileLabel="Hoca"
        />
      }
    >
      {children}
    </SectionShell>
  )
}
