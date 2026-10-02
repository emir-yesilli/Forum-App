'use client'

import { Minus, Plus, Reply } from 'lucide-react'
import { useState } from 'react'
import { countComments, currentUser, type ForumComment as ForumCommentType } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ForumReplyBox } from './forum-reply-box'
import { VoteControl } from './vote-control'

type ForumCommentProps = {
  comment: ForumCommentType
  depth: number
  topicAuthor: string
  onReply: (parentId: string, text: string) => void
}

export function ForumComment({ comment, depth, topicAuthor, onReply }: ForumCommentProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [replying, setReplying] = useState(false)
  const hiddenCount = countComments(comment.replies)
  const isOp = comment.author === topicAuthor
  const isOwn = comment.author === currentUser.nickname && comment.id.startsWith('own-')

  return (
    <li className={cn(depth > 0 && 'pt-4')}>
      <article aria-label={`@${comment.author} yorumu`}>
        <header className="flex items-center gap-2 text-[12.5px]">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Yorumu genişlet' : 'Yorumu daralt'}
            className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            {collapsed ? <Plus className="size-3" aria-hidden="true" /> : <Minus className="size-3" aria-hidden="true" />}
          </button>
          <span className="font-medium text-foreground">@{comment.author}</span>
          {isOp && (
            <span className="rounded-full bg-accent px-1.5 py-px text-[10.5px] font-medium text-primary">yazar</span>
          )}
          {isOwn && <span className="text-[11.5px] text-primary">sen</span>}
          <span aria-hidden="true" className="text-muted-foreground">
            ·
          </span>
          <time className="text-muted-foreground">{comment.time}</time>
          {collapsed && hiddenCount > 0 && (
            <span className="text-muted-foreground">({hiddenCount} yanıt gizlendi)</span>
          )}
        </header>

        {!collapsed && (
          <div className="ml-[9px] border-l border-border pl-[19px] transition-colors hover:border-foreground/20">
            <p className="pt-1.5 text-[14.5px] leading-[1.65] text-pretty text-foreground/90">{comment.text}</p>
            <div className="mt-2 flex items-center gap-3">
              <VoteControl initialScore={comment.score} size="sm" orientation="horizontal" label={`@${comment.author} yorumu`} />
              <button
                type="button"
                onClick={() => setReplying((v) => !v)}
                aria-expanded={replying}
                className={cn(
                  'inline-flex h-6 items-center gap-1.5 rounded-md px-1.5 text-[12.5px] transition-colors focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
                  replying ? 'text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Reply className="size-3.5" aria-hidden="true" />
                Yanıtla
              </button>
            </div>

            {replying && (
              <ForumReplyBox
                autoFocus
                placeholder={`@${comment.author} kullanıcısına yanıt ver...`}
                onCancel={() => setReplying(false)}
                onSubmit={(text) => {
                  onReply(comment.id, text)
                  setReplying(false)
                }}
                className="mt-3"
              />
            )}

            {comment.replies.length > 0 && (
              <ul className="pb-1">
                {comment.replies.map((reply) => (
                  <ForumComment
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                    topicAuthor={topicAuthor}
                    onReply={onReply}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </article>
    </li>
  )
}
