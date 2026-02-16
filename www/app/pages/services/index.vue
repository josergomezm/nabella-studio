<script setup lang="ts">
const { t } = useI18n()
const { categories, activeCategoryId, activeCategory, setActiveCategory } = useServices()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative bg-rose-gold-950 py-20 lg:py-24 text-center px-6 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-rose-gold-900/40 via-rose-gold-950 to-rose-gold-950" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-gold-800/15 blur-3xl" />
      <p class="relative z-10 text-rose-gold-300 tracking-[0.3em] text-xs font-semibold uppercase mb-3">
        {{ t('ServicesPage.hero.headline') }}
      </p>
      <h1 class="relative z-10 font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest uppercase mb-4">
        {{ t('ServicesPage.hero.title') }}
      </h1>
      <p class="relative z-10 text-rose-gold-200/70 max-w-2xl mx-auto leading-relaxed">
        {{ t('ServicesPage.hero.description') }}
      </p>
    </section>

    <!-- Services catalog -->
    <section class="py-16 lg:py-20 bg-white dark:bg-stone-950">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Category tabs -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="category-tab"
            :class="activeCategoryId === cat.id ? 'category-tab--active' : 'category-tab--inactive'"
            @click="setActiveCategory(cat.id)"
          >
            <UIcon :name="cat.icon" class="size-4 mr-1.5 inline-block align-text-bottom" />
            {{ cat.title }}
          </button>
        </div>

        <!-- Active category -->
        <Transition name="fade-slide" mode="out-in">
          <div :key="activeCategory.id">
            <p class="text-center text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {{ activeCategory.description }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <NuxtLink
                v-for="service in activeCategory.services"
                :key="service.id"
                :to="`/services/${service.id}`"
                class="service-card group rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden hover:border-rose-gold-300 dark:hover:border-rose-gold-700 hover:shadow-lg hover:shadow-rose-gold-100/50 dark:hover:shadow-rose-gold-950/30 transition-all duration-300"
              >
                <div v-if="service.image" class="aspect-4/3 overflow-hidden bg-rose-gold-50 dark:bg-stone-800">
                  <img
                    :src="service.image"
                    :alt="service.name"
                    class="service-card-img w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="p-5">
                  <h3 class="font-display text-sm tracking-wide text-stone-900 dark:text-stone-100 uppercase mb-2">
                    {{ service.name }}
                  </h3>
                  <p class="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                    {{ service.description }}
                  </p>
                  <div class="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                    <div class="flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500">
                      <UIcon name="i-lucide-clock" class="size-3.5" />
                      <span>{{ service.duration }}</span>
                      <template v-if="service.perArea">
                        <span class="text-stone-300 dark:text-stone-600">&middot;</span>
                        <span>{{ t('Services.perArea') }}</span>
                      </template>
                    </div>
                    <span class="text-rose-gold-500 font-semibold text-sm tabular-nums">
                      {{ service.price }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <div class="text-center mt-10">
              <UButton
                :label="t('Services.bookService')"
                to="/book"
                size="lg"
                icon="i-lucide-calendar"
              />
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Consultation CTA -->
    <section class="py-16 bg-rose-gold-50/50 dark:bg-stone-900/50">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <UIcon name="i-lucide-message-circle" class="size-10 text-rose-gold-400 mx-auto mb-4" />
        <h2 class="font-display text-2xl sm:text-3xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-3">
          {{ t('ServicesPage.consultation.title') }}
        </h2>
        <p class="text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
          {{ t('ServicesPage.consultation.description') }}
        </p>
        <UButton
          :label="t('ServicesPage.consultation.cta')"
          to="/book"
          size="xl"
          icon="i-lucide-calendar"
        />
      </div>
    </section>
  </div>
</template>
