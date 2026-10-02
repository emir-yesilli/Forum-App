import { redirect } from 'next/navigation'
import { clubs } from '@/lib/data'

export default function KuluplerPage() {
  const first = [...clubs].sort((a, b) => a.name.localeCompare(b.name, 'tr'))[0]
  redirect(`/kulupler/${first.slug}`)
}
