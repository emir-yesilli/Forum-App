import type { Metadata } from 'next'
import { HomeHero } from '@/components/campus/home/home-hero'
import { BentoGrid } from '@/components/campus/home/bento-grid'
import { RecentActivity } from '@/components/campus/home/recent-activity'
import { ClosingCta } from '@/components/campus/home/closing-cta'

export const metadata: Metadata = {
  title: { absolute: 'Campus — Your campus, connected.' },
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <BentoGrid />
      <RecentActivity />
      <ClosingCta />
    </>
  )
}
