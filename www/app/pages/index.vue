<script setup lang="ts">
import heroVideo from '~/assets/videos/hero_bg.mp4'
import logoSvg from '~/assets/images/logo.svg'
import ruth1 from '~/assets/images/ruth1.png'
import ruth2 from '~/assets/images/ruth2.png'

const { t } = useI18n()
const { categories, activeCategoryId, activeCategory, setActiveCategory } = useServices()

const highlights = [
  { icon: 'i-lucide-sparkles', label: t('Home.highlights.results') },
  { icon: 'i-lucide-heart', label: t('Home.highlights.personalized') },
  { icon: 'i-lucide-shield-check', label: t('Home.highlights.expert') },
]

const { target: divider1, isInView: divider1Visible } = useInView()
const { target: divider2, isInView: divider2Visible } = useInView()
const { target: divider3, isInView: divider3Visible } = useInView()
</script>

<template>
  <div>
    <!-- ═══ Hero with Video Background ═══ -->
    <section class="hero-video-section">
      <video
        autoplay
        muted
        loop
        playsinline
        class="hero-video"
      >
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
            to="#services"
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

    <!-- ═══ Divider 1 ═══ -->
    <div ref="divider1" class="section-divider" :class="{ 'in-view': divider1Visible }">
      <div class="section-divider__glow">
        <span class="section-divider__orb section-divider__orb--glow" />
        <span class="section-divider__orb section-divider__orb--center" />
        <span class="section-divider__orb section-divider__orb--left" />
        <span class="section-divider__orb section-divider__orb--right" />
        <span class="section-divider__orb section-divider__orb--far-left" />
        <span class="section-divider__orb section-divider__orb--far-right" />
      </div>
    </div>

    <!-- ═══ Services ═══ -->
    <UPageSection
      id="services"
      :headline="t('Services.headline')"
      :title="t('Services.title')"
      :description="t('Services.description')"
    >
      <!-- Category tabs -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
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

      <!-- Active category content -->
      <Transition name="fade-slide" mode="out-in">
        <div :key="activeCategory.id">
          <!-- Category description -->
          <p class="text-center text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {{ activeCategory.description }}
          </p>

          <!-- Services grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="service in activeCategory.services"
              :key="service.id"
              class="service-card group rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden hover:border-rose-gold-300 dark:hover:border-rose-gold-700 hover:shadow-lg hover:shadow-rose-gold-100/50 dark:hover:shadow-rose-gold-950/30 transition-all duration-300"
            >
              <!-- Service image -->
              <div v-if="service.image" class="aspect-[4/3] overflow-hidden bg-rose-gold-50 dark:bg-stone-800">
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
            </div>
          </div>

          <!-- Book CTA for this category -->
          <div class="text-center mt-10">
            <UButton
              :label="t('Services.bookService')"
              to="/book"
              size="lg"
              icon="i-lucide-calendar"
              variant="outline"
            />
          </div>
        </div>
      </Transition>
    </UPageSection>

    <!-- ═══ Divider 2 ═══ -->
    <div ref="divider2" class="section-divider" :class="{ 'in-view': divider2Visible }">
      <div class="section-divider__glow">
        <span class="section-divider__orb section-divider__orb--glow" />
        <span class="section-divider__orb section-divider__orb--center" />
        <span class="section-divider__orb section-divider__orb--left" />
        <span class="section-divider__orb section-divider__orb--right" />
        <span class="section-divider__orb section-divider__orb--far-left" />
        <span class="section-divider__orb section-divider__orb--far-right" />
      </div>
    </div>

    <!-- ═══ About ═══ -->
    <UPageSection
      id="about"
      :headline="t('Home.about.headline')"
      :title="t('Home.about.title')"
      :description="t('Home.about.subtitle')"
      :ui="{
        root: 'bg-white dark:bg-stone-950',
      }"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Photos -->
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-2xl overflow-hidden shadow-lg shadow-rose-gold-200/30 dark:shadow-rose-gold-950/40">
            <img
              :src="ruth1"
              alt="Ruth Raldiris"
              class="w-full h-full object-cover aspect-[3/4]"
              loading="lazy"
            />
          </div>
          <div class="rounded-2xl overflow-hidden shadow-lg shadow-rose-gold-200/30 dark:shadow-rose-gold-950/40 mt-8">
            <img
              :src="ruth2"
              alt="Ruth Raldiris at Nabella Studio"
              class="w-full h-full object-cover aspect-[3/4]"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Bio text -->
        <div class="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>{{ t('Home.about.p1') }}</p>
          <p>{{ t('Home.about.p2') }}</p>
          <p class="text-sm text-stone-500 dark:text-stone-500 italic">
            {{ t('Home.about.p3') }}
          </p>
        </div>
      </div>
    </UPageSection>

    <!-- ═══ Divider 3 ═══ -->
    <div ref="divider3" class="section-divider" :class="{ 'in-view': divider3Visible }">
      <div class="section-divider__glow">
        <span class="section-divider__orb section-divider__orb--glow" />
        <span class="section-divider__orb section-divider__orb--center" />
        <span class="section-divider__orb section-divider__orb--left" />
        <span class="section-divider__orb section-divider__orb--right" />
        <span class="section-divider__orb section-divider__orb--far-left" />
        <span class="section-divider__orb section-divider__orb--far-right" />
      </div>
    </div>

    <!-- ═══ CTA + Footer ═══ -->
    <footer id="contact" class="bg-rose-gold-950">
      <!-- CTA -->
      <div class="text-center px-6 pt-20 pb-16">
        <h2 class="font-display text-white text-3xl sm:text-4xl tracking-widest uppercase mb-4">
          {{ t('Home.cta.title') }}
        </h2>
        <p class="text-rose-gold-200/80 max-w-xl mx-auto leading-relaxed mb-8">
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

      <!-- Soft separator -->
      <div class="mx-auto max-w-5xl px-6">
        <div class="h-px bg-gradient-to-r from-transparent via-rose-gold-700/40 to-transparent" />
      </div>

      <!-- Footer columns -->
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
              <dd :class="t(`Home.footer.hours_data.${day}`) === 'Closed' ? 'text-rose-gold-500/50' : 'text-rose-gold-100/90 font-medium'">
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

      <!-- Bottom bar -->
      <div class="mx-auto max-w-5xl px-6">
        <div class="h-px bg-gradient-to-r from-transparent via-rose-gold-800/30 to-transparent" />
      </div>
      <div class="text-center py-6 px-6">
        <p class="text-xs text-rose-gold-400/50 tracking-wide">
          &copy; {{ new Date().getFullYear() }} {{ t('Home.footer.rights') }}
        </p>
      </div>
    </footer>
  </div>
</template>
