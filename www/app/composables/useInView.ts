export function useInView(options?: IntersectionObserverInit) {
  const target = ref<HTMLElement | null>(null)
  const isInView = ref(false)

  if (import.meta.client) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        isInView.value = true
        observer.disconnect()
      }
    }, { threshold: 0.3, ...options })

    onMounted(() => {
      if (target.value) observer.observe(target.value)
    })

    onUnmounted(() => observer.disconnect())
  }

  return { target, isInView }
}
