import type { Metadata } from 'next'
import { NotesBrowser } from '@/components/campus/notes/notes-browser'

export const metadata: Metadata = { title: 'Notlar' }

export default function NotlarPage() {
  return <NotesBrowser />
}
