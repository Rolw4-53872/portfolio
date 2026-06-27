import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 2000, startOnMount = false) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(startOnMount)
  const raf = useRef<number | null>(null)

  const start = () => setHasStarted(true)

  useEffect(() => {
    if (!hasStarted) return
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [hasStarted, target, duration])

  return { count, start }
}
