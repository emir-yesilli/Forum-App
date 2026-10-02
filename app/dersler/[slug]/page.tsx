import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FeedHeader } from '@/components/campus/feed-header'
import { ReviewFeed } from '@/components/campus/reviews/review-feed'
import { courses, getCourse, getCourseComments } from '@/lib/data'

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = getCourse(slug)
  return { title: course ? `${course.code} — ${course.name}` : 'Dersler' }
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()

  return (
    <>
      <FeedHeader eyebrow={course.code} title={course.name} />
      <ReviewFeed key={slug} initialComments={getCourseComments(slug)} subjectName={course.code} />
    </>
  )
}
