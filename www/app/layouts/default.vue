<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: t('Layout.nav.services'), to: '/#services' },
  { label: t('Layout.nav.about'), to: '/#about' },
  { label: t('Layout.nav.contact'), to: '/#contact' },
])

const otherLocale = computed(() => {
  const available = locales.value as Array<{ code: string; name: string }>
  return available.find(l => l.code !== locale.value)
})
</script>

<template>
  <div>
    <UHeader title="Nabella Studio" to="/">
      <template #title>
        <span class="text-2xl text-rose-gold-400 dark:text-rose-gold-300 uppercase tracking-widest">Nabella Studio</span>
      </template>

      <UNavigationMenu :items="navItems" variant="link" />

      <template #right>
        <NuxtLink
          v-if="otherLocale"
          :to="switchLocalePath(otherLocale.code)"
          class="text-xs font-medium tracking-wide text-stone-500 hover:text-rose-gold-500 dark:text-stone-400 dark:hover:text-rose-gold-400 transition-colors uppercase"
        >
          {{ otherLocale.name }}
        </NuxtLink>
        <UButton
          :label="t('Layout.bookNow')"
          to="/book"
          size="sm"
        />
      </template>

      <template #body>
        <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
        <div class="flex items-center gap-3 mt-4">
          <NuxtLink
            v-if="otherLocale"
            :to="switchLocalePath(otherLocale.code)"
            class="text-xs font-medium tracking-wide text-stone-500 hover:text-rose-gold-500 dark:text-stone-400 dark:hover:text-rose-gold-400 transition-colors uppercase"
          >
            {{ otherLocale.name }}
          </NuxtLink>
        </div>
        <UButton
          :label="t('Layout.bookNow')"
          to="/book"
          class="mt-4"
          block
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
  </div>
</template>
