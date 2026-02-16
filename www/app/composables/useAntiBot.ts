/**
 * Programmatic bot protection — no external services required.
 *
 * Three layers:
 * 1. Honeypot — invisible field that only bots fill
 * 2. Timing — rejects submissions faster than a human can type
 * 3. Interaction — verifies real pointer/keyboard activity occurred
 */
export function useAntiBot(minTimeMs = 3000) {
  const honeypot = ref('')
  const mountedAt = ref(0)
  const hasInteracted = ref(false)

  if (import.meta.client) {
    const markInteracted = () => { hasInteracted.value = true }

    onMounted(() => {
      mountedAt.value = Date.now()
      document.addEventListener('keydown', markInteracted, { once: true })
      document.addEventListener('pointerdown', markInteracted, { once: true })
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', markInteracted)
      document.removeEventListener('pointerdown', markInteracted)
    })
  }

  function verify(): { passed: boolean; reason?: string } {
    // SSR — always pass (real validation happens client-side)
    if (!import.meta.client) return { passed: true }

    if (honeypot.value !== '') {
      return { passed: false, reason: 'honeypot' }
    }
    if (Date.now() - mountedAt.value < minTimeMs) {
      return { passed: false, reason: 'too-fast' }
    }
    if (!hasInteracted.value) {
      return { passed: false, reason: 'no-interaction' }
    }
    return { passed: true }
  }

  return { honeypot, verify }
}
