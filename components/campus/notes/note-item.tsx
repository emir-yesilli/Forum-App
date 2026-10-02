import { ArrowDownToLine } from 'lucide-react'
import type { Note } from '@/lib/data'

function FileGlyph({ type }: { type: Note['fileType'] }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-11 w-9 items-end justify-center rounded-[3px] border border-foreground/15 bg-background pb-1.5 transition-colors duration-200 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)] group-hover:border-primary/40"
    >
      <span className="absolute top-0 right-0 size-2.5 rounded-bl-[2px] border-b border-l border-foreground/15 bg-muted" />
      <span className="font-mono text-[8.5px] font-medium tracking-wide text-muted-foreground group-hover:text-primary">
        {type}
      </span>
    </div>
  )
}

export function NoteItem({ note }: { note: Note }) {
  return (
    <article className="group relative flex min-h-[220px] flex-col border-r border-b border-border p-6 transition-colors duration-200 hover:bg-muted/50">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[12px] font-medium tracking-wide text-primary">{note.course}</span>
        <FileGlyph type={note.fileType} />
      </div>

      <h3 className="mt-6 text-[17px] leading-snug font-medium tracking-[-0.02em] text-balance">{note.title}</h3>
      <p className="mt-2 text-[12.5px] text-muted-foreground">
        @{note.author} <span aria-hidden="true">·</span> {note.time}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <p className="font-mono text-[11.5px] text-muted-foreground">
          {note.fileType} <span aria-hidden="true">·</span> {note.size}
          {note.pages && (
            <>
              {' '}
              <span aria-hidden="true">·</span> {note.pages} sayfa
            </>
          )}
        </p>
        <button
          type="button"
          aria-label={`${note.title} dosyasını indir`}
          className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-150 hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          <ArrowDownToLine className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
