import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { countComments, type ForumTopic } from '@/lib/data'
import { VoteControl } from './vote-control'

export function ForumTopicRow({ topic }: { topic: ForumTopic }) {
  const commentCount = countComments(topic.comments)
  return (
    <article className="group relative -mx-3 flex gap-4 rounded-xl px-3 py-5 transition-colors duration-150 hover:bg-muted/50 md:gap-6">
      <div className="relative z-10">
        <VoteControl initialScore={topic.score} label={topic.title} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h2 className="text-[16.5px] leading-snug font-medium tracking-[-0.02em] text-pretty">
          <Link
            href={`/forum/${topic.id}`}
            className="rounded-sm transition-colors after:absolute after:inset-0 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            {topic.title}
          </Link>
        </h2>
        <p className="mt-1.5 line-clamp-1 text-[13.5px] text-muted-foreground">{topic.content}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted-foreground">
          <span className="text-foreground/80">@{topic.author}</span>
          <span aria-hidden="true">·</span>
          <span>{topic.time}</span>
          <span className="rounded-full border border-border px-2 py-px text-[11.5px] text-foreground/75">
            {topic.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            {commentCount} yorum
          </span>
        </div>
      </div>
    </article>
  )
}
