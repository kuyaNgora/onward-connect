import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            // Also animate children with scroll-animate classes
            const children = entry.target.querySelectorAll(
              '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
            )
            children.forEach((child) => {
              child.classList.add('animate-visible')
            })
          }
        })
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe the element itself
    const animatable = element.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    )

    // Also observe the container if it has the class
    if (
      element.classList.contains('scroll-animate') ||
      element.classList.contains('scroll-animate-left') ||
      element.classList.contains('scroll-animate-right') ||
      element.classList.contains('scroll-animate-scale')
    ) {
      observer.observe(element)
    }

    animatable.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export default useScrollAnimation
