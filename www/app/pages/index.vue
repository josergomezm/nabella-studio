<script setup lang="ts">
import heroVideo from '~/assets/videos/hero_bg.mp4'
import logoSvg from '~/assets/images/logo.svg'
import ruth1 from '~/assets/images/ruth1.png'
import ruth2 from '~/assets/images/ruth2.png'

const { t, tm } = useI18n()
const { categories } = useServices()

const highlights = [
  { icon: 'i-lucide-sparkles', label: t('Home.highlights.results') },
  { icon: 'i-lucide-heart', label: t('Home.highlights.personalized') },
  { icon: 'i-lucide-shield-check', label: t('Home.highlights.expert') },
]

// Pick 4 featured services to showcase on home
const featuredIds = ['wts', 'poc1', 'flm', 'bsp']
const featuredServices = computed(() => {
  const all = categories.value.flatMap(c => c.services)
  return featuredIds.map(id => all.find(s => s.id === id)).filter(Boolean)
})

const testimonials = computed(() => tm('Home.testimonials.items') as Array<{ quote: string; name: string; service: string }>)

// Pick 6 services with images for the IG-style gallery
const instagramImages = computed(() => {
  const all = categories.value.flatMap(c => c.services).filter(s => s.image)
  return all.slice(0, 6)
})

const trustStats = computed(() => [
  { value: t('Home.trust.clients'), label: t('Home.trust.clientsLabel') },
  { value: t('Home.trust.experience'), label: t('Home.trust.experienceLabel') },
  { value: t('Home.trust.treatments'), label: t('Home.trust.treatmentsLabel') },
  { value: t('Home.trust.rating'), label: t('Home.trust.ratingLabel'), icon: 'i-lucide-star' },
])

const { target: trustRef, isInView: trustVisible } = useInView()
const { target: aboutRef, isInView: aboutVisible } = useInView()
const { target: featuredRef, isInView: featuredVisible } = useInView()
const { target: testimonialsRef, isInView: testimonialsVisible } = useInView()
</script>

<template>
  <div>
    <!-- ═══ Hero ═══ -->
    <section class="hero-video-section">
      <video autoplay muted loop playsinline class="hero-video">
        <source :src="heroVideo" type="video/mp4" />
      </video>
      <div class="hero-overlay" />

      <div class="relative z-10 text-center px-6 py-24 lg:py-32 max-w-3xl mx-auto">
        <img
          :src="logoSvg"
          alt="Nabella Studio"
          class="h-16 sm:h-20 mx-auto mb-8 drop-shadow-lg brightness-0 invert opacity-90"
        />

        <p class="text-rose-gold-200 tracking-[0.3em] text-xs font-sans font-semibold uppercase mb-4">
          {{ t('Home.hero.headline') }}
        </p>

        <h1 class="font-display text-white text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mb-6 drop-shadow-md">
          {{ t('Home.hero.title') }}
        </h1>

        <p class="text-rose-gold-100/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          {{ t('Home.hero.description') }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 mb-10">
          <UButton
            :label="t('Home.hero.bookCta')"
            to="/book"
            size="xl"
            icon="i-lucide-calendar"
          />
          <UButton
            :label="t('Home.hero.exploreCta')"
            to="/services"
            variant="outline"
            size="xl"
            :ui="{ base: 'text-white border-white/30 hover:bg-white/10' }"
          />
          <UButton
            icon="i-lucide-instagram"
            to="https://www.instagram.com/nabella_studio_/"
            target="_blank"
            variant="outline"
            size="xl"
            aria-label="Instagram"
            :ui="{ base: 'text-white border-white/30 hover:bg-white/10' }"
          />
        </div>

        <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <div
            v-for="item in highlights"
            :key="item.label"
            class="flex items-center gap-2 text-rose-gold-200/80"
          >
            <UIcon :name="item.icon" class="size-4" />
            <span class="text-sm font-medium tracking-wide">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Trust Bar ═══ -->
    <section
      ref="trustRef"
      class="relative bg-rose-gold-950 py-16 overflow-hidden"
    >
      <div class="absolute inset-0 bg-linear-to-r from-rose-gold-950 via-rose-gold-900/50 to-rose-gold-950" />
      <div class="relative z-10 max-w-5xl mx-auto px-6">
        <p class="text-center text-rose-gold-300 tracking-[0.2em] text-xs font-semibold uppercase mb-10">
          {{ t('Home.trust.headline') }}
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(stat, i) in trustStats"
            :key="stat.label"
            class="text-center transition-all duration-700"
            :class="trustVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: `${i * 150}ms` }"
          >
            <div class="flex items-center justify-center gap-1.5 mb-2">
              <UIcon v-if="stat.icon" :name="stat.icon" class="size-5 text-rose-gold-400" />
              <span class="text-3xl sm:text-4xl font-display text-white tracking-wide">{{ stat.value }}</span>
            </div>
            <p class="text-sm text-rose-gold-300/70 tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ About Ruth (Preview) ═══ -->
    <section
      ref="aboutRef"
      class="py-20 lg:py-28 bg-white dark:bg-stone-950"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Photos -->
          <div
            class="grid grid-cols-2 gap-4 transition-all duration-1000"
            :class="aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          >
            <div class="rounded-2xl overflow-hidden shadow-lg shadow-rose-gold-200/30 dark:shadow-rose-gold-950/40">
              <img
                :src="ruth1"
                alt="Ruth Raldiris"
                class="w-full h-full object-cover aspect-3/4"
                loading="lazy"
              />
            </div>
            <div class="rounded-2xl overflow-hidden shadow-lg shadow-rose-gold-200/30 dark:shadow-rose-gold-950/40 mt-8">
              <img
                :src="ruth2"
                alt="Ruth Raldiris at Nabella Studio"
                class="w-full h-full object-cover aspect-3/4"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Bio -->
          <div
            class="transition-all duration-1000 delay-200"
            :class="aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
          >
            <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-4">
              {{ t('Home.about.headline') }}
            </p>
            <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-2">
              {{ t('Home.about.title') }}
            </h2>
            <p class="text-rose-gold-500 text-sm tracking-wide mb-6">
              {{ t('Home.about.subtitle') }}
            </p>
            <div class="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>{{ t('Home.about.p1') }}</p>
              <p>{{ t('Home.about.p2') }}</p>
            </div>
            <UButton
              :label="t('Home.about.learnMore')"
              to="/about"
              variant="outline"
              size="lg"
              icon="i-lucide-arrow-right"
              trailing
              class="mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Featured Services ═══ -->
    <section
      ref="featuredRef"
      class="py-20 lg:py-28 bg-rose-gold-50/30 dark:bg-stone-900/50"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
            {{ t('Home.featured.headline') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-4">
            {{ t('Home.featured.title') }}
          </h2>
          <p class="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {{ t('Home.featured.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="(service, i) in featuredServices"
            :key="service!.id"
            :to="`/services/${service!.id}`"
            class="group rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden hover:border-rose-gold-300 dark:hover:border-rose-gold-700 hover:shadow-lg hover:shadow-rose-gold-100/50 dark:hover:shadow-rose-gold-950/30 transition-all duration-500"
            :class="featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div v-if="service!.image" class="aspect-4/3 overflow-hidden bg-rose-gold-50 dark:bg-stone-800">
              <img
                :src="service!.image"
                :alt="service!.name"
                class="service-card-img w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="p-5">
              <h3 class="font-display text-sm tracking-wide text-stone-900 dark:text-stone-100 uppercase mb-2">
                {{ service!.name }}
              </h3>
              <p class="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
                {{ service!.description }}
              </p>
              <div class="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                <div class="flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500">
                  <UIcon name="i-lucide-clock" class="size-3.5" />
                  <span>{{ service!.duration }}</span>
                </div>
                <span class="text-rose-gold-500 font-semibold text-sm tabular-nums">
                  {{ service!.price }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <UButton
            :label="t('Home.featured.viewAll')"
            to="/services"
            variant="outline"
            size="lg"
            icon="i-lucide-arrow-right"
            trailing
          />
        </div>
      </div>
    </section>

    <!-- ═══ Testimonials ═══ -->
    <section
      ref="testimonialsRef"
      class="py-20 lg:py-28 bg-white dark:bg-stone-950"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
            {{ t('Home.testimonials.headline') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-4">
            {{ t('Home.testimonials.title') }}
          </h2>
          <p class="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {{ t('Home.testimonials.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(item, i) in testimonials"
            :key="i"
            class="relative p-6 sm:p-8 rounded-2xl border border-rose-gold-100 dark:border-stone-800 bg-rose-gold-50/30 dark:bg-stone-900/50 transition-all duration-700"
            :class="testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${i * 120}ms` }"
          >
            <!-- Quote mark -->
            <div class="absolute top-4 right-6 text-rose-gold-200 dark:text-rose-gold-800/50 text-5xl font-serif leading-none select-none" aria-hidden="true">
              &ldquo;
            </div>

            <div class="flex gap-1 mb-4">
              <UIcon v-for="n in 5" :key="n" name="heroicons:star-20-solid" class="size-4 text-rose-gold-400" />
            </div>

            <p class="text-stone-700 dark:text-stone-300 leading-relaxed mb-6 italic">
              &ldquo;{{ item.quote }}&rdquo;
            </p>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-rose-gold-200 dark:bg-rose-gold-800 flex items-center justify-center">
                <span class="text-sm font-semibold text-rose-gold-700 dark:text-rose-gold-200">
                  {{ item.name.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="text-sm font-medium text-stone-900 dark:text-stone-100">{{ item.name }}</p>
                <p class="text-xs text-rose-gold-500">{{ item.service }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Instagram Gallery ═══ -->
    <section class="py-20 lg:py-28 bg-rose-gold-50/30 dark:bg-stone-900/50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <p class="text-rose-gold-500 tracking-[0.2em] text-xs font-semibold uppercase mb-3">
            {{ t('Home.instagram.headline') }}
          </p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-4">
            {{ t('Home.instagram.title') }}
          </h2>
          <p class="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {{ t('Home.instagram.description') }}
          </p>
        </div>

        <!-- Image grid linking to Instagram -->
        <a
          href="https://www.instagram.com/nabella_studio_/"
          target="_blank"
          rel="noopener noreferrer"
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 group"
          aria-label="Visit Nabella Studio on Instagram"
        >
          <div
            v-for="service in instagramImages"
            :key="service.id"
            class="aspect-square overflow-hidden rounded-lg bg-rose-gold-100 dark:bg-stone-800"
          >
            <img
              :src="service.image!"
              :alt="service.name"
              class="w-full h-full object-cover transition-all duration-500 group-hover:brightness-90"
              loading="lazy"
            />
          </div>
        </a>

        <div class="text-center mt-8">
          <UButton
            :label="t('Home.instagram.followCta')"
            to="https://www.instagram.com/nabella_studio_/"
            target="_blank"
            variant="outline"
            size="lg"
            icon="i-lucide-instagram"
          />
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="relative py-20 lg:py-28 bg-rose-gold-950 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-rose-gold-950 via-rose-gold-900/30 to-rose-gold-950" />
      <div class="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h2 class="font-display text-white text-3xl sm:text-4xl tracking-widest uppercase mb-4">
          {{ t('Home.cta.title') }}
        </h2>
        <p class="text-rose-gold-200/80 leading-relaxed mb-10">
          {{ t('Home.cta.description') }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton
            :label="t('Home.cta.bookCta')"
            to="/book"
            size="xl"
            icon="i-lucide-calendar"
            color="neutral"
            variant="solid"
          />
          <UButton
            icon="i-lucide-instagram"
            to="https://www.instagram.com/nabella_studio_/"
            target="_blank"
            variant="outline"
            size="xl"
            aria-label="Instagram"
            :ui="{ base: 'text-rose-gold-300 border-rose-gold-700/40 hover:bg-rose-gold-800/30' }"
          />
        </div>
      </div>
    </section>

    <!-- ═══ Footer is in layout ═══ -->
  </div>
</template>
