<script setup lang="ts">
const { t, tm } = useI18n()

const faqItems = computed(() => tm('Contact.faq.items') as Array<{ question: string; answer: string }>)
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative bg-rose-gold-950 py-20 lg:py-24 text-center px-6 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-rose-gold-900/40 via-rose-gold-950 to-rose-gold-950" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-gold-800/15 blur-3xl" />
      <p class="relative z-10 text-rose-gold-300 tracking-[0.3em] text-xs font-semibold uppercase mb-3">
        {{ t('Contact.hero.headline') }}
      </p>
      <h1 class="relative z-10 font-display text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest uppercase mb-4">
        {{ t('Contact.hero.title') }}
      </h1>
      <p class="relative z-10 text-rose-gold-200/70 max-w-2xl mx-auto leading-relaxed">
        {{ t('Contact.hero.description') }}
      </p>
    </section>

    <!-- Contact Info -->
    <section class="py-16 lg:py-20 bg-white dark:bg-stone-950">
      <div class="max-w-3xl mx-auto px-6">
        <!-- Instagram CTA — primary communication channel -->
        <div class="rounded-2xl border border-rose-gold-200 dark:border-stone-800 bg-rose-gold-50/50 dark:bg-stone-900/50 p-8 sm:p-10 text-center mb-10">
          <div class="w-14 h-14 rounded-full bg-rose-gold-100 dark:bg-rose-gold-900/30 flex items-center justify-center mx-auto mb-5">
            <UIcon name="i-lucide-instagram" class="size-7 text-rose-gold-600 dark:text-rose-gold-400" />
          </div>
          <h2 class="font-display text-xl sm:text-2xl tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-3">
            {{ t('Contact.info.dmTitle') }}
          </h2>
          <p class="text-stone-500 dark:text-stone-400 leading-relaxed max-w-lg mx-auto mb-6">
            {{ t('Contact.info.dmDescription') }}
          </p>
          <UButton
            label="@nabella_studio_"
            to="https://www.instagram.com/nabella_studio_/"
            target="_blank"
            size="lg"
            icon="i-lucide-instagram"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Hours -->
          <div class="rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-rose-gold-50/30 dark:bg-stone-900/50 p-6">
            <h3 class="font-display text-sm tracking-[0.2em] uppercase text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-clock" class="size-4 text-rose-gold-500" />
              {{ t('Contact.info.hoursTitle') }}
            </h3>
            <dl class="space-y-2">
              <div v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']" :key="day" class="flex justify-between text-sm">
                <dt class="text-stone-500 dark:text-stone-400">{{ t(`Home.footer.days.${day}`) }}</dt>
                <dd :class="t(`Home.footer.hours_data.${day}`) === 'Closed' || t(`Home.footer.hours_data.${day}`) === 'Cerrado' ? 'text-stone-400' : 'text-stone-900 dark:text-stone-100 font-medium'">
                  {{ t(`Home.footer.hours_data.${day}`) }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Location -->
          <div class="rounded-xl border border-rose-gold-100 dark:border-stone-800 bg-rose-gold-50/30 dark:bg-stone-900/50 p-6">
            <h3 class="font-display text-sm tracking-[0.2em] uppercase text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="size-4 text-rose-gold-500" />
              {{ t('Contact.info.locationTitle') }}
            </h3>
            <address class="not-italic text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              <p class="font-medium text-stone-900 dark:text-stone-100">Nabella Studio</p>
              <p>{{ t('Contact.info.address') }}</p>
              <p>{{ t('Contact.info.city') }}</p>
            </address>
            <UButton
              :label="t('Contact.info.getDirections')"
              to="https://maps.google.com/?q=8412+Acme+Way+Louisville+KY+40219"
              target="_blank"
              variant="outline"
              size="sm"
              icon="i-lucide-navigation"
            />
          </div>
        </div>

        <!-- Map -->
        <div class="rounded-xl overflow-hidden border border-rose-gold-100 dark:border-stone-800 mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.5!2d-85.7!3d38.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDEwJzEyLjAiTiA4NcKwNDInMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="280"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Nabella Studio location"
          />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section
      class="py-20 lg:py-28 bg-rose-gold-50/30 dark:bg-stone-900/50"
    >
      <div class="max-w-3xl mx-auto px-6">
        <h2 class="font-display text-2xl sm:text-3xl tracking-wider uppercase text-stone-900 dark:text-stone-100 text-center mb-12">
          {{ t('Contact.faq.title') }}
        </h2>

        <UAccordion
          :items="faqItems.map((item, i) => ({
            label: item.question,
            content: item.answer,
            value: String(i),
          }))"
          type="single"
          collapsible
        />
      </div>
    </section>
  </div>
</template>
