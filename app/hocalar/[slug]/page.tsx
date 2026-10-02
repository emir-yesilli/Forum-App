import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FeedHeader } from '@/components/campus/feed-header'
import { ReviewFeed } from '@/components/campus/reviews/review-feed'
import { courses, getProfessor, getProfessorComments, professors } from '@/lib/data'

export function generateStaticParams() {
  return professors.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return { title: getProfessor(slug)?.name ?? 'Hocalar' }
}

export default async function ProfessorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const professor = getProfessor(slug)
  if (!professor) notFound()

  return (
    <>
      <FeedHeader eyebrow="Öğrenci yorumları" title={professor.name} />
      <ReviewFeed
        key={slug}
        initialComments={getProfessorComments(slug)}
        subjectName={professor.name}
        showCourse
        courseOptions={courses.map((c) => c.code)}
      />
    </>
  )
}
