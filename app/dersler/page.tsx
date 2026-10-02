import { redirect } from 'next/navigation'
import { courses } from '@/lib/data'

export default function DerslerPage() {
  const first = [...courses].sort((a, b) => a.code.localeCompare(b.code, 'tr'))[0]
  redirect(`/dersler/${first.slug}`)
}
