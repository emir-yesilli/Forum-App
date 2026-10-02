import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NetworkBackground } from './network-background'

const reveal =
  'animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none'

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mx-5 flex min-h-[min(640px,78svh)] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center md:-mx-8 md:px-8"
    >
      <NetworkBackground />

      <div className="relative flex max-w-2xl flex-col items-center">
        <p className={`${reveal} mb-6 text-[12.5px] font-medium tracking-[0.08em] text-muted-foreground uppercase`}>
          Kampüs topluluğu
        </p>
        <h1
          id="hero-title"
          className={`${reveal} text-balance text-5xl font-semibold tracking-[-0.045em] text-foreground delay-75 sm:text-6xl md:text-7xl md:leading-[1.02]`}
        >
          Your campus, connected.
        </h1>
        <p
          className={`${reveal} mt-6 max-w-lg text-pretty text-[16.5px] leading-relaxed text-muted-foreground delay-150`}
        >
          Discover professors, explore courses, share notes and connect with your campus community.
        </p>
        <div className={`${reveal} mt-10 flex items-center gap-2 delay-200`}>
          <Link
            href="#kesfet"
            className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground shadow-[0_1px_2px_oklch(0.32_0.085_264/0.2)] transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Keşfet
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
          <Link
            href="/forum"
            className="inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            {"Forum'a git"}
          </Link>
        </div>
      </div>
    </section>
  )
}
