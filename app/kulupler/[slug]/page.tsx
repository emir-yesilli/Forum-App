import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ClubIntro } from '@/components/campus/club-intro'
import { ReviewFeed } from '@/components/campus/reviews/review-feed'
import { clubs, getClub, getClubComments } from '@/lib/data'

export function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return { title: getClub(slug)?.name ?? 'Kulüpler' }
}

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const club = getClub(slug)
  if (!club) notFound()

  return (
    <>
      <ClubIntro club={club} />
      <h2 className="mb-5 text-[15px] font-semibold tracking-[-0.015em]">Öğrenci yorumları</h2>
      <ReviewFeed key={slug} initialComments={getClubComments(slug)} subjectName={club.name} />
    </>
  )
}
