<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const { categories, allServices } = useServices()

const serviceId = computed(() => route.params.id as string)

const service = computed(() => allServices.value.find(s => s.id === serviceId.value))

const category = computed(() =>
  categories.value.find(c => c.services.some(s => s.id === serviceId.value)),
)

// Related services: other services from the same category
const relatedServices = computed(() => {
  if (!category.value) return []
  return category.value.services
    .filter(s => s.id !== serviceId.value)
    .slice(0, 3)
})

// 404 if service not found
if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

// SEO
useHead({
  title: () => service.value ? `${service.value.name} — Nabella Studio` : 'Nabella Studio',
})
</script>

<template>
  <div v-if="service" class="min-h-screen">
    <!-- Hero with service image -->
    <section class="relative bg-rose-gold-950 overflow-hidden">
      <div v-if="service.image" class="absolute inset-0">
        <img
          :src="service.image"
          :alt="service.name"
          class="w-full h-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-linear-to-b from-rose-gold-950/60 to-rose-gold-950" />
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-28">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-sm text-rose-gold-300/70 mb-8">
          <NuxtLink to="/services" class="hover:text-rose-gold-200 transition-colors">
            {{ t('ServiceDetail.backToServices') }}
          </NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3.5" />
          <span v-if="category" class="text-rose-gold-300/50">{{ category.title }}</span>
        </div>

        <h1 class="font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest uppercase mb-4">
          {{ service.name }}
        </h1>

        <p class="text-rose-gold-200/70 text-lg leading-relaxed max-w-2xl mb-8">
          {{ service.description }}
        </p>

        <!-- Price & duration pills -->
        <div class="flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
            <UIcon name="i-lucide-clock" class="size-4" />
            {{ service.duration }}
            <template v-if="service.perArea">
              <span class="text-rose-gold-300/60">&middot;</span>
              {{ t('ServiceDetail.perArea') }}
            </template>
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-gold-500/20 text-rose-gold-200 text-sm font-semibold">
            {{ service.price }}
          </span>
        </div>
      </div>
    </section>

    <!-- Detail content -->
    <section class="py-16 lg:py-20 bg-white dark:bg-stone-950">
      <div class="max-w-4xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main content -->
          <div class="lg:col-span-2 space-y-10">
            <!-- Long description -->
            <div>
              <p class="text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">
                {{ t(`ServiceDetail.items.${service.id}.longDescription`) }}
              </p>
            </div>

            <!-- Package note -->
            <div
              v-if="service.sessions"
              class="flex gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40"
            >
              <UIcon name="i-lucide-info" class="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-amber-900 dark:text-amber-200 mb-1">
                  {{ t('ServiceDetail.details.sessions', { n: service.sessions }) }}
                </p>
                <p class="text-xs text-amber-700 dark:text-amber-300/80 leading-relaxed">
                  {{ t('ServiceDetail.details.packageNote') }}
                </p>
              </div>
            </div>

            <!-- What to expect -->
            <div>
              <h2 class="font-display text-lg tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-4">
                {{ t('ServiceDetail.details.whatToExpect') }}
              </h2>
              <p class="text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">
                {{ t(`ServiceDetail.items.${service.id}.whatToExpect`) }}
              </p>
            </div>

            <!-- Ideal for -->
            <div>
              <h2 class="font-display text-lg tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-4">
                {{ t('ServiceDetail.details.idealFor') }}
              </h2>
              <p class="text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">
                {{ t(`ServiceDetail.items.${service.id}.idealFor`) }}
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <!-- Book card -->
              <div class="rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-rose-gold-50/30 dark:bg-stone-900/50 p-6">
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm">
                    <span class="text-stone-500">{{ t('ServiceDetail.price') }}</span>
                    <span class="text-rose-gold-600 dark:text-rose-gold-400 font-semibold text-lg">{{ service.price }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-stone-500">{{ t('ServiceDetail.duration') }}</span>
                    <span class="text-stone-900 dark:text-stone-100 font-medium">{{ service.duration }}</span>
                  </div>
                  <div v-if="service.perArea" class="text-xs text-stone-400 dark:text-stone-500 text-right">
                    {{ t('ServiceDetail.perArea') }}
                  </div>
                </div>
                <UButton
                  :label="t('ServiceDetail.bookThis')"
                  :to="`/book?service=${service.id}`"
                  size="lg"
                  icon="i-lucide-calendar"
                  block
                />
              </div>

              <!-- Service image -->
              <div v-if="service.image" class="rounded-xl overflow-hidden">
                <img
                  :src="service.image"
                  :alt="service.name"
                  class="w-full aspect-4/3 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related services -->
    <section v-if="relatedServices.length" class="py-16 bg-rose-gold-50/30 dark:bg-stone-900/50">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="font-display text-2xl tracking-wider uppercase text-stone-900 dark:text-stone-100 text-center mb-10">
          {{ t('ServiceDetail.related.title') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedServices"
            :key="related.id"
            :to="`/services/${related.id}`"
            class="group rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden hover:border-rose-gold-300 dark:hover:border-rose-gold-700 hover:shadow-lg transition-all duration-300"
          >
            <div v-if="related.image" class="aspect-4/3 overflow-hidden bg-rose-gold-50 dark:bg-stone-800">
              <img
                :src="related.image"
                :alt="related.name"
                class="service-card-img w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <h3 class="font-display text-sm tracking-wide text-stone-900 dark:text-stone-100 uppercase mb-2">
                {{ related.name }}
              </h3>
              <div class="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                <div class="flex items-center gap-2 text-xs text-stone-400">
                  <UIcon name="i-lucide-clock" class="size-3.5" />
                  <span>{{ related.duration }}</span>
                </div>
                <span class="text-rose-gold-500 font-semibold text-sm">{{ related.price }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-rose-gold-950">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="font-display text-white text-2xl sm:text-3xl tracking-widest uppercase mb-4">
          {{ t('Home.cta.title') }}
        </h2>
        <p class="text-rose-gold-200/80 leading-relaxed mb-8">
          {{ t('Home.cta.description') }}
        </p>
        <UButton
          :label="t('Home.cta.bookCta')"
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
