import type { Metadata } from 'next'
import { ForumBrowser } from '@/components/campus/forum/forum-browser'

export const metadata: Metadata = { title: 'Forum' }

export default function ForumPage() {
  return <ForumBrowser />
}
