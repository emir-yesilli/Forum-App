import Link from 'next/link'

const activities = [
  { user: 'pixelmaster', action: 'MATH101 hakkında bir yorum yaptı', time: '3 dakika önce', href: '/dersler' },
  { user: 'nightowl', action: 'CS201 için bir not paylaştı', time: '1 saat önce', href: '/notlar' },
  { user: 'codewizard', action: "Forum'da bir tartışmaya katıldı", time: '2 saat önce', href: '/forum' },
]

export function RecentActivity() {
  return (
    <section aria-labelledby="activity-title" className="border-t border-border py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <h2 id="activity-title" className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Son aktiviteler
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">Kampüste şu an olanlar.</p>
        </div>
        <ul className="flex flex-col">
          {activities.map((item) => (
            <li key={item.user} className="border-b border-border/70 first:border-t">
              <Link
                href={item.href}
                className="group flex flex-col gap-1 py-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="text-[14px] font-medium text-foreground sm:w-32 sm:shrink-0">@{item.user}</span>
                <span className="flex-1 text-[14px] text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                  {item.action}
                </span>
                <span className="font-mono text-[11.5px] text-muted-foreground/80">{item.time}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
