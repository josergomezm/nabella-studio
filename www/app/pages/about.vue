<script setup lang="ts">
import ruth1 from '~/assets/images/ruth1.png'
import ruth2 from '~/assets/images/ruth2.png'

const { t, tm } = useI18n()

const valuesItems = computed(() => tm('About.values.items') as Array<{ title: string; description: string; icon: string }>)

const { target: storyRef, isInView: storyVisible } = useInView()
const { target: valuesRef, isInView: valuesVisible } = useInView()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative bg-rose-gold-950 py-20 lg:py-24 text-center px-6 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-rose-gold-900/40 via-rose-gold-950 to-rose-gold-950" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-gold-800/15 blur-3xl" />
      <p class="relative z-10 text-rose-gold-300 tracking-[0.3em] text-xs font-semibold uppercase mb-3">
        {{ t('About.hero.headline') }}
      </p>
      <h1 class="relative z-10 font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest uppercase mb-4">
        {{ t('About.hero.title') }}
      </h1>
      <p class="relative z-10 text-rose-gold-200/70 max-w-2xl mx-auto leading-relaxed">
        {{ t('About.hero.description') }}
      </p>
    </section>

    <!-- Ruth's Story -->
    <section
      ref="storyRef"
      class="py-20 lg:py-28 bg-white dark:bg-stone-950"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <!-- Photos -->
          <div
            class="grid grid-cols-2 gap-4 lg:sticky lg:top-24 transition-all duration-1000"
            :class="storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          >
            <div class="rounded-2xl overflow-hidden shadow-lg shadow-rose-gold-200/30 dark:shadow-rose-gold-950/40">
              <img
                :src="ruth1"
                alt="Ruth Raldiris"
                class="w-full h-full object-cover aspect-3/4"
              />
            </div>
            <div class="rounded-2xl overflow-hidden shadow-lg shadow-rose-gold-200/30 dark:shadow-rose-gold-950/40 mt-8">
              <img
                :src="ruth2"
                alt="Ruth Raldiris at Nabella Studio"
                class="w-full h-full object-cover aspect-3/4"
              />
            </div>
          </div>

          <!-- Story text -->
          <div
            class="transition-all duration-1000 delay-200"
            :class="storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
          >
            <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-4">
              {{ t('About.story.headline') }}
            </p>
            <div class="space-y-5 text-stone-600 dark:text-stone-400 leading-relaxed text-[15px]">
              <p>{{ t('About.story.p1') }}</p>
              <p>{{ t('About.story.p2') }}</p>
              <p>{{ t('About.story.p3') }}</p>
              <p class="text-stone-900 dark:text-stone-200 font-medium">{{ t('About.story.p4') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section
      ref="valuesRef"
      class="py-20 lg:py-28 bg-rose-gold-50/30 dark:bg-stone-900/50"
    >
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-14">
          <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
            {{ t('About.values.headline') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-4">
            {{ t('About.values.title') }}
          </h2>
          <p class="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {{ t('About.values.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div
            v-for="(item, i) in valuesItems"
            :key="i"
            class="flex gap-4 p-6 rounded-xl bg-white dark:bg-stone-900 border border-rose-gold-100 dark:border-stone-800 transition-all duration-700"
            :class="valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="shrink-0 w-10 h-10 rounded-lg bg-rose-gold-100 dark:bg-rose-gold-900/30 flex items-center justify-center">
              <UIcon :name="item.icon" class="size-5 text-rose-gold-500" />
            </div>
            <div>
              <h3 class="font-display text-sm tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-1.5">
                {{ item.title }}
              </h3>
              <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Studio / Location -->
    <section class="py-20 lg:py-28 bg-white dark:bg-stone-950">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
          {{ t('About.studio.headline') }}
        </p>
        <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-6">
          {{ t('About.studio.title') }}
        </h2>
        <p class="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
          {{ t('About.studio.description') }}
        </p>
        <div class="rounded-2xl overflow-hidden border border-rose-gold-100 dark:border-stone-800 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.5!2d-85.7!3d38.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDEwJzEyLjAiTiA4NcKwNDInMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="300"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Nabella Studio location"
          />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 lg:py-20 bg-rose-gold-950">
      <div class="max-w-2xl mx-auto px-6 text-center">
        <h2 class="font-display text-white text-3xl sm:text-4xl tracking-widest uppercase mb-4">
          {{ t('About.cta.title') }}
        </h2>
        <p class="text-rose-gold-200/80 leading-relaxed mb-8">
          {{ t('About.cta.description') }}
        </p>
        <UButton
          :label="t('About.cta.bookCta')"
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
