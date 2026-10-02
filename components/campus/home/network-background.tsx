'use client'

import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
  baseX: number
  baseY: number
  phase: number
  speed: number
  radius: number
  label?: string
}

const ANCHORS = [
  { label: 'Hocalar', x: 0.12, y: 0.28 },
  { label: 'Dersler', x: 0.86, y: 0.22 },
  { label: 'Kulüpler', x: 0.9, y: 0.74 },
  { label: 'Notlar', x: 0.1, y: 0.78 },
  { label: 'Forum', x: 0.5, y: 0.94 },
]

const SATELLITE_COUNT = 34
const LINK_DISTANCE = 150
const DRIFT = 10
const POINTER_RADIUS = 160
const POINTER_PULL = 14

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function createPoints(width: number, height: number): Point[] {
  const random = seededRandom(42)
  const anchors: Point[] = ANCHORS.map((a) => ({
    x: a.x * width,
    y: a.y * height,
    baseX: a.x * width,
    baseY: a.y * height,
    phase: random() * Math.PI * 2,
    speed: 0.00018 + random() * 0.0001,
    radius: 2.2,
    label: a.label,
  }))

  const satellites: Point[] = Array.from({ length: SATELLITE_COUNT }, () => {
    const anchor = anchors[Math.floor(random() * anchors.length)]
    const angle = random() * Math.PI * 2
    const distance = 40 + random() * 170
    const x = Math.min(Math.max(anchor.baseX + Math.cos(angle) * distance, 0), width)
    const y = Math.min(Math.max(anchor.baseY + Math.sin(angle) * distance * 0.7, 0), height)
    return {
      x,
      y,
      baseX: x,
      baseY: y,
      phase: random() * Math.PI * 2,
      speed: 0.00022 + random() * 0.00018,
      radius: 0.9 + random() * 0.8,
    }
  })

  return [...anchors, ...satellites]
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const accent = getComputedStyle(canvas).color
    const labelColor = getComputedStyle(canvas).getPropertyValue('--muted-foreground').trim()
    const fontFamily = getComputedStyle(document.body).fontFamily

    let width = 0
    let height = 0
    let points: Point[] = []
    let frame = 0
    let visible = true
    const pointer = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      points = createPoints(width, height)
      draw(performance.now())
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const animate = !reducedMotion.matches

      for (const p of points) {
        let targetX = p.baseX
        let targetY = p.baseY
        if (animate) {
          targetX += Math.sin(time * p.speed + p.phase) * DRIFT
          targetY += Math.cos(time * p.speed * 0.8 + p.phase) * DRIFT * 0.7
          if (pointer.active) {
            const dx = pointer.x - targetX
            const dy = pointer.y - targetY
            const dist = Math.hypot(dx, dy)
            if (dist < POINTER_RADIUS && dist > 0) {
              const force = (1 - dist / POINTER_RADIUS) * POINTER_PULL
              targetX += (dx / dist) * force
              targetY += (dy / dist) * force
            }
          }
          p.x += (targetX - p.x) * 0.06
          p.y += (targetY - p.y) * 0.06
        } else {
          p.x = targetX
          p.y = targetY
        }
      }

      context.strokeStyle = accent
      context.lineWidth = 0.6
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]
          const b = points[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > LINK_DISTANCE) continue
          context.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.16
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      context.fillStyle = accent
      for (const p of points) {
        context.globalAlpha = p.label ? 0.42 : 0.24
        context.beginPath()
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        context.fill()
      }

      context.font = `500 11px ${fontFamily}`
      context.fillStyle = labelColor || accent
      context.globalAlpha = 0.5
      context.textBaseline = 'middle'
      for (const p of points) {
        if (!p.label) continue
        context.fillText(p.label, p.x + 8, p.y)
      }
      context.globalAlpha = 1
    }

    const loop = (time: number) => {
      draw(time)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(loop)
      else draw(performance.now())
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    intersectionObserver.observe(canvas)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    reducedMotion.addEventListener('change', start)
    resize()
    start()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      reducedMotion.removeEventListener('change', start)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full text-primary [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,black_45%,transparent_100%)]"
    />
  )
}
