<script setup lang="ts">
const { t, tm } = useI18n()
const { categories } = useServices()

// Build gallery items from service images
const galleryItems = computed(() => {
  const categoryMap: Record<string, string> = {
    'body-contouring': 'contouring',
    'post-op': 'postOp',
    'facial': 'facial',
    'wellness': 'contouring',
  }
  return categories.value.flatMap(cat =>
    cat.services
      .filter(s => s.image)
      .map(s => ({
        id: s.id,
        name: s.name,
        image: s.image!,
        category: categoryMap[cat.id] || 'contouring',
        price: s.price,
        duration: s.duration,
      })),
  )
})

const activeFilter = ref('all')
const filters = ['all', 'contouring', 'postOp', 'facial'] as const

const filteredGallery = computed(() => {
  if (activeFilter.value === 'all') return galleryItems.value
  return galleryItems.value.filter(item => item.category === activeFilter.value)
})

const processSteps = computed(() => tm('Results.process.steps') as Array<{ title: string; description: string; icon: string }>)

const { target: galleryRef, isInView: galleryVisible } = useInView()
const { target: processRef, isInView: processVisible } = useInView()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative bg-rose-gold-950 py-20 lg:py-24 text-center px-6 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-rose-gold-900/40 via-rose-gold-950 to-rose-gold-950" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-gold-800/15 blur-3xl" />
      <p class="relative z-10 text-rose-gold-300 tracking-[0.3em] text-xs font-semibold uppercase mb-3">
        {{ t('Results.hero.headline') }}
      </p>
      <h1 class="relative z-10 font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest uppercase mb-4">
        {{ t('Results.hero.title') }}
      </h1>
      <p class="relative z-10 text-rose-gold-200/70 max-w-2xl mx-auto leading-relaxed">
        {{ t('Results.hero.description') }}
      </p>
    </section>

    <!-- Gallery -->
    <section
      ref="galleryRef"
      class="py-16 lg:py-20 bg-white dark:bg-stone-950"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
            {{ t('Results.gallery.headline') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-4">
            {{ t('Results.gallery.title') }}
          </h2>
          <p class="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {{ t('Results.gallery.description') }}
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <button
            v-for="filter in filters"
            :key="filter"
            class="category-tab"
            :class="activeFilter === filter ? 'category-tab--active' : 'category-tab--inactive'"
            @click="activeFilter = filter"
          >
            {{ t(`Results.gallery.categories.${filter}`) }}
          </button>
        </div>

        <!-- Image grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <NuxtLink
            v-for="(item, i) in filteredGallery"
            :key="item.id"
            :to="`/services/${item.id}`"
            class="group relative aspect-square rounded-xl overflow-hidden bg-rose-gold-50 dark:bg-stone-800 transition-all duration-500"
            :class="galleryVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-rose-gold-950/0 group-hover:bg-rose-gold-950/60 transition-all duration-300 flex items-end p-4">
              <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p class="text-white text-sm font-display tracking-wide uppercase">{{ item.name }}</p>
                <p class="text-rose-gold-200/80 text-xs mt-1">{{ item.price }} · {{ item.duration }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <p class="text-center text-xs text-stone-400 dark:text-stone-500 mt-8 italic">
          {{ t('Results.disclaimer') }}
        </p>
      </div>
    </section>

    <!-- How it works / Process -->
    <section
      ref="processRef"
      class="py-20 lg:py-28 bg-rose-gold-50/30 dark:bg-stone-900/50"
    >
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-14">
          <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
            {{ t('Results.process.headline') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100">
            {{ t('Results.process.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, i) in processSteps"
            :key="i"
            class="text-center transition-all duration-700"
            :class="processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${i * 120}ms` }"
          >
            <div class="w-14 h-14 rounded-full bg-rose-gold-100 dark:bg-rose-gold-900/30 flex items-center justify-center mx-auto mb-4">
              <UIcon :name="step.icon" class="size-6 text-rose-gold-500" />
            </div>
            <div class="flex items-center justify-center gap-2 mb-2">
              <span class="text-xs text-rose-gold-400 font-semibold">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="font-display text-sm tracking-wide uppercase text-stone-900 dark:text-stone-100">
                {{ step.title }}
              </h3>
            </div>
            <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 lg:py-20 bg-rose-gold-950">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="font-display text-white text-3xl sm:text-4xl tracking-widest uppercase mb-4">
          {{ t('Results.cta.title') }}
        </h2>
        <p class="text-rose-gold-200/80 leading-relaxed mb-8">
          {{ t('Results.cta.description') }}
        </p>
        <UButton
          :label="t('Results.cta.bookCta')"
          to="/book"
          size="xl"
          icon="i-lucide-calendar"
          color="neutral"
          variant="solid"
        />
      </div>
    </section>
  </div>
</template>
