<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: t('Layout.nav.services'), to: '/services' },
  { label: t('Layout.nav.results'), to: '/results' },
  { label: t('Layout.nav.about'), to: '/about' },
  { label: t('Layout.nav.contact'), to: '/contact' },
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
          :to="switchLocalePath(otherLocale.code as 'en' | 'es')"
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
            :to="switchLocalePath(otherLocale.code as 'en' | 'es')"
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

    <!-- Global Footer -->
    <footer class="bg-rose-gold-950">
      <div class="mx-auto max-w-5xl px-6">
        <div class="h-px bg-linear-to-r from-transparent via-rose-gold-700/40 to-transparent" />
      </div>

      <div class="mx-auto max-w-5xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <!-- Hours -->
        <div>
          <h3 class="font-display text-rose-gold-300 text-sm tracking-[0.2em] uppercase mb-5">
            <UIcon name="i-lucide-clock" class="size-4 mr-2 inline-block align-text-bottom" />
            {{ t('Home.footer.hours') }}
          </h3>
          <dl class="space-y-2">
            <div v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']" :key="day" class="flex justify-between text-sm">
              <dt class="text-rose-gold-300/70">{{ t(`Home.footer.days.${day}`) }}</dt>
              <dd :class="t(`Home.footer.hours_data.${day}`) === 'Closed' || t(`Home.footer.hours_data.${day}`) === 'Cerrado' ? 'text-rose-gold-500/50' : 'text-rose-gold-100/90 font-medium'">
                {{ t(`Home.footer.hours_data.${day}`) }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- Location -->
        <div>
          <h3 class="font-display text-rose-gold-300 text-sm tracking-[0.2em] uppercase mb-5">
            <UIcon name="i-lucide-map-pin" class="size-4 mr-2 inline-block align-text-bottom" />
            {{ t('Home.footer.location') }}
          </h3>
          <address class="not-italic space-y-1 text-sm text-rose-gold-200/70 leading-relaxed">
            <p class="text-rose-gold-100/90 font-medium">Nabella Studio</p>
            <p>{{ t('Home.footer.address') }}</p>
            <p>{{ t('Home.footer.city') }}</p>
          </address>
          <UButton
            label="Get Directions"
            to="https://maps.google.com/?q=8412+Acme+Way+Louisville+KY+40219"
            target="_blank"
            variant="link"
            icon="i-lucide-navigation"
            size="sm"
            class="mt-4 text-rose-gold-400 hover:text-rose-gold-300 px-0"
          />
        </div>

        <!-- Connect -->
        <div>
          <h3 class="font-display text-rose-gold-300 text-sm tracking-[0.2em] uppercase mb-5">
            <UIcon name="i-lucide-heart" class="size-4 mr-2 inline-block align-text-bottom" />
            {{ t('Home.footer.connect') }}
          </h3>
          <div class="flex gap-3">
            <UButton
              icon="i-lucide-instagram"
              color="neutral"
              variant="ghost"
              to="https://www.instagram.com/nabella_studio_/"
              target="_blank"
              aria-label="Instagram"
              :ui="{ base: 'text-rose-gold-300 hover:text-white hover:bg-rose-gold-800/50' }"
            />
          </div>
          <div class="mt-6">
            <UButton
              label="Book an Appointment"
              to="/book"
              size="sm"
              icon="i-lucide-calendar"
              :ui="{ base: 'text-rose-gold-300 hover:text-white hover:bg-rose-gold-800/50' }"
              variant="ghost"
              class="px-0"
            />
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-5xl px-6">
        <div class="h-px bg-linear-to-r from-transparent via-rose-gold-800/30 to-transparent" />
      </div>
      <div class="text-center py-6 px-6">
        <p class="text-xs text-rose-gold-400/50 tracking-wide">
          &copy; {{ new Date().getFullYear() }} {{ t('Home.footer.rights') }}
        </p>
      </div>
    </footer>
  </div>
</template>
