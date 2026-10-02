import { SecondarySidebar } from '@/components/campus/secondary-sidebar'
import { SectionShell } from '@/components/campus/section-shell'
import { clubs } from '@/lib/data'

export default function KuluplerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionShell
      sidebar={
        <SecondarySidebar
          title="Kulüpler"
          basePath="/kulupler"
          items={clubs.map((c) => ({ slug: c.slug, label: c.name }))}
          searchPlaceholder="Kulüp ara..."
          searchLabel="Kulüp ara"
          emptyText="Eşleşen kulüp bulunamadı."
          mobileLabel="Kulüp"
        />
      }
    >
      {children}
    </SectionShell>
  )
}
