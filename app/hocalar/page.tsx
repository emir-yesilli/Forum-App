import { redirect } from 'next/navigation'
import { professors } from '@/lib/data'

export default function HocalarPage() {
  const first = [...professors].sort((a, b) => a.name.localeCompare(b.name, 'tr'))[0]
  redirect(`/hocalar/${first.slug}`)
}
