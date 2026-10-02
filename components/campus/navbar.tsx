'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ProfileMenu } from './profile-menu'

const links = [
  { href: '/hocalar', label: 'Hocalar' },
  { href: '/dersler', label: 'Dersler' },
  { href: '/kulupler', label: 'Kulüpler' },
  { href: '/notlar', label: 'Notlar' },
  { href: '/forum', label: 'Forum' },
]

function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <ul className={cn('flex items-center', className)}>
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative inline-flex h-9 items-center rounded-md px-3 text-[13.5px] tracking-[-0.005em] transition-colors duration-150',
                'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
                active
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-3 -bottom-[13px] h-px bg-primary transition-opacity duration-200',
                  active ? 'opacity-100' : 'opacity-0',
                )}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <nav aria-label="Ana gezinme" className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-14 items-center gap-8">
  <Link
  href="/"
  aria-label="Campus ana sayfa"
            className="flex items-center gap-1.5 rounded-md text-[17px] font-semibold tracking-[-0.03em] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            Campus
            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          </Link>
          <NavLinks className="hidden gap-1 md:flex" />
          <div className="ml-auto">
            <ProfileMenu />
          </div>
        </div>
        <div className="-mx-2 overflow-x-auto pb-2 md:hidden [scrollbar-width:none]">
          <NavLinks className="gap-0.5 [&_a>span]:hidden" />
        </div>
      </nav>
    </header>
  )
}
