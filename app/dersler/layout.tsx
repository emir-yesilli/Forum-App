import { SecondarySidebar } from '@/components/campus/secondary-sidebar'
import { SectionShell } from '@/components/campus/section-shell'
import { courses } from '@/lib/data'

export default function DerslerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionShell
      sidebar={
        <SecondarySidebar
          title="Dersler"
          basePath="/dersler"
          items={courses.map((c) => ({ slug: c.slug, label: c.code, secondary: c.name }))}
          searchPlaceholder="Ders ara..."
          searchLabel="Ders ara"
          emptyText="Eşleşen ders bulunamadı."
          mobileLabel="Ders"
        />
      }
    >
      {children}
    </SectionShell>
  )
}
