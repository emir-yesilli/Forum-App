import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ForumThread } from '@/components/campus/forum/forum-thread'
import { VoteControl } from '@/components/campus/forum/vote-control'
import { forumTopics, getForumTopic } from '@/lib/data'

export function generateStaticParams() {
  return forumTopics.map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return { title: getForumTopic(id)?.title ?? 'Forum' }
}

export default async function ForumTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const topic = getForumTopic(id)
  if (!topic) notFound()

  return (
    <div className="mx-auto max-w-3xl py-8 md:py-14">
      <Link
        href="/forum"
        className="inline-flex items-center gap-1.5 rounded-md text-[13px] text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Forum
      </Link>

      <article className="mt-8 flex gap-4 md:gap-6">
        <VoteControl initialScore={topic.score} label={topic.title} />
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] text-primary">{topic.category}</p>
          <h1 className="mt-1.5 text-[26px] leading-[1.15] font-semibold tracking-[-0.03em] text-balance md:text-[34px]">
            {topic.title}
          </h1>
          <p className="mt-3 text-[13px] text-muted-foreground">
            <span className="text-foreground/85">@{topic.author}</span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            {topic.time}
          </p>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-[1.7] text-pretty text-foreground/90">{topic.content}</p>
        </div>
      </article>

      <div className="mt-12 border-t border-border" />
      <ForumThread key={topic.id} initialComments={topic.comments} topicAuthor={topic.author} />
    </div>
  )
}
