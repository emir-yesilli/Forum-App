import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-title"
      className="flex flex-col items-center border-t border-border py-24 text-center md:py-32"
    >
      <h2
        id="closing-title"
        className="text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl"
      >
        {"Campus'a göz at."}
      </h2>
      <p className="mt-4 text-[15px] text-muted-foreground">Hocalar, dersler, kulüpler, notlar ve forum.</p>
      <Link
        href="#kesfet"
        className="group mt-8 inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-5 text-[14px] font-medium text-foreground transition-colors duration-200 hover:border-primary/30 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
      >
        Keşfet
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </Link>
    </section>
  )
}
