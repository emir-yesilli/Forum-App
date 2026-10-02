'use client'

import { useState } from 'react'
import { countComments, currentUser, type ForumComment as ForumCommentType } from '@/lib/data'
import { ForumComment } from './forum-comment'
import { ForumReplyBox } from './forum-reply-box'

function insertReply(comments: ForumCommentType[], parentId: string, reply: ForumCommentType): ForumCommentType[] {
  return comments.map((c) =>
    c.id === parentId
      ? { ...c, replies: [...c.replies, reply] }
      : { ...c, replies: insertReply(c.replies, parentId, reply) },
  )
}

function createComment(text: string): ForumCommentType {
  return {
    id: `own-${Date.now()}`,
    author: currentUser.nickname,
    time: 'şimdi',
    text,
    score: 1,
    replies: [],
  }
}

export function ForumThread({ initialComments, topicAuthor }: { initialComments: ForumCommentType[]; topicAuthor: string }) {
  const [comments, setComments] = useState(initialComments)
  const total = countComments(comments)

  return (
    <section aria-labelledby="comments-heading" className="mt-12">
      <h2 id="comments-heading" className="text-[15px] font-semibold tracking-[-0.015em]">
        {total} yorum
      </h2>

      <ForumReplyBox
        placeholder="Tartışmaya katıl..."
        submitLabel="Yorum yap"
        onSubmit={(text) => setComments((prev) => [...prev, createComment(text)])}
        className="mt-4"
      />

      <ul className="mt-8 flex flex-col gap-7">
        {comments.map((comment) => (
          <ForumComment
            key={comment.id}
            comment={comment}
            depth={0}
            topicAuthor={topicAuthor}
            onReply={(parentId, text) => setComments((prev) => insertReply(prev, parentId, createComment(text)))}
          />
        ))}
      </ul>
    </section>
  )
}
