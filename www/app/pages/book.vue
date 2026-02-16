<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import { CalendarDate, today, getLocalTimeZone, DateFormatter } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import { ContactDetailsSchema } from '~/models'

const { t } = useI18n()
const route = useRoute()
const { categories, allServices } = useServices()

// ── Stepper ──
const currentStep = ref(0)

const steps: StepperItem[] = [
  { title: t('Book.steps.service'), description: t('Book.steps.serviceDesc'), icon: 'i-lucide-sparkles', slot: 'service' },
  { title: t('Book.steps.date'), description: t('Book.steps.dateDesc'), icon: 'i-lucide-calendar', slot: 'date' },
  { title: t('Book.steps.details'), description: t('Book.steps.detailsDesc'), icon: 'i-lucide-user', slot: 'details' },
]

// ── Service selection ──
const selectedServiceId = ref((route.query.service as string) || '')
const searchQuery = ref('')

const selectedService = computed(() => allServices.value.find(s => s.id === selectedServiceId.value))

const filteredCategories = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return categories.value
  return categories.value
    .map(cat => ({
      ...cat,
      services: cat.services.filter(s =>
        s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
      ),
    }))
    .filter(cat => cat.services.length > 0)
})

function selectService(id: string) {
  selectedServiceId.value = id
}

// ── Date selection ──
const todayDate = today(getLocalTimeZone())
const selectedDate = ref<CalendarDate>()
const selectedTime = ref('')
const df = new DateFormatter('en-US', { dateStyle: 'full' })

// Studio hours from product context
const studioHours: Record<number, { open: number, close: number } | null> = {
  0: null,        // Sunday — closed
  1: { open: 10, close: 15 }, // Monday
  2: { open: 10, close: 17 }, // Tuesday
  3: { open: 10, close: 19 }, // Wednesday
  4: { open: 10, close: 17 }, // Thursday
  5: { open: 10, close: 17 }, // Friday
  6: null,        // Saturday — closed
}

function isDateDisabled(date: DateValue) {
  const jsDate = date.toDate(getLocalTimeZone())
  const day = jsDate.getDay()
  return studioHours[day] === null
}

// Mock booked slots — seeded by date so they're consistent per day
// TODO: Replace with cal.com API integration
function getMockBookedSlots(date: CalendarDate): Set<string> {
  const seed = date.day + date.month * 31
  const booked = new Set<string>()
  // Simulate 2-4 booked slots per day based on date seed
  const mockTimes = ['10:00 AM', '11:00 AM', '11:30 AM', '1:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '4:00 PM']
  for (let i = 0; i < mockTimes.length; i++) {
    if ((seed + i * 7) % 3 === 0) booked.add(mockTimes[i]!)
  }
  return booked
}

interface TimeSlot {
  time: string
  available: boolean
}

const timeSlots = computed<TimeSlot[]>(() => {
  if (!selectedDate.value || !selectedService.value) return []
  const jsDate = selectedDate.value.toDate(getLocalTimeZone())
  const day = jsDate.getDay()
  const hours = studioHours[day]
  if (!hours) return []

  const durationMatch = selectedService.value.duration.match(/(\d+)\s*min/)
  const slotMinutes = durationMatch ? parseInt(durationMatch[1]!) : 60

  const bookedSlots = getMockBookedSlots(selectedDate.value)

  const slots: TimeSlot[] = []
  let current = hours.open * 60
  const end = hours.close * 60 - slotMinutes

  while (current <= end) {
    const h = Math.floor(current / 60)
    const m = current % 60
    const period = h >= 12 ? 'PM' : 'AM'
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
    const label = `${displayH}:${m.toString().padStart(2, '0')} ${period}`
    slots.push({ time: label, available: !bookedSlots.has(label) })
    current += 30
  }
  return slots
})

function selectTime(time: string) {
  selectedTime.value = time
}

// ── Contact details ──
const contactForm = useTemplateRef<{ validate: () => Promise<boolean> }>('contactForm')
const contactState = reactive({
  name: '',
  email: '',
  phone: '',
  notes: '',
})
const submitError = ref('')

// ── Anti-bot ──
const { honeypot, verify: verifyHuman } = useAntiBot()

// ── Navigation ──
const canGoNext = computed(() => {
  if (currentStep.value === 0) return !!selectedServiceId.value
  if (currentStep.value === 1) return !!selectedDate.value && !!selectedTime.value
  if (currentStep.value === 2) return !!contactState.name && !!contactState.email && !!contactState.phone
  return false
})

async function goNext() {
  if (!canGoNext.value) return

  if (currentStep.value === 2) {
    // Validate form via UForm
    try {
      await contactForm.value?.validate()
    }
    catch {
      return // validation errors shown inline by UForm
    }

    // Anti-bot check
    const check = verifyHuman()
    if (!check.passed) {
      submitError.value = 'Something went wrong. Please try again.'
      return
    }

    confirmBooking()
    return
  }
  currentStep.value++
}

function goBack() {
  submitError.value = ''
  currentStep.value--
}

// ── Confirmation ──
const isConfirmed = ref(false)

function confirmBooking() {
  // Mock confirmation — in a real app this would call an API
  submitError.value = ''
  isConfirmed.value = true
}

function bookAnother() {
  selectedServiceId.value = ''
  selectedDate.value = undefined
  selectedTime.value = ''
  contactState.name = ''
  contactState.email = ''
  contactState.phone = ''
  contactState.notes = ''
  submitError.value = ''
  isConfirmed.value = false
  currentStep.value = 0
}

const formattedDate = computed(() => {
  if (!selectedDate.value) return ''
  return df.format(selectedDate.value.toDate(getLocalTimeZone()))
})
</script>

<template>
  <div class="min-h-screen bg-rose-gold-50/30 dark:bg-stone-950">
    <!-- Header -->
    <div class="text-center px-6 pt-16 pb-8">
      <p class="text-rose-gold-500 tracking-[0.3em] text-xs font-semibold uppercase mb-3">
        {{ t('Book.headline') }}
      </p>
      <h1 class="font-display text-3xl sm:text-4xl tracking-widest uppercase text-stone-900 dark:text-stone-100 mb-3">
        {{ t('Book.title') }}
      </h1>
      <p class="text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
        {{ t('Book.description') }}
      </p>
    </div>

    <!-- Confirmed state -->
    <div v-if="isConfirmed" class="max-w-lg mx-auto px-6 pb-20">
      <div class="bg-white dark:bg-stone-900 rounded-2xl border border-rose-gold-100 dark:border-stone-800 p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
          <UIcon name="i-lucide-check" class="size-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 class="font-display text-2xl tracking-wider uppercase text-stone-900 dark:text-stone-100 mb-2">
          {{ t('Book.confirm.title') }}
        </h2>
        <p class="text-stone-500 dark:text-stone-400 mb-8">{{ t('Book.confirm.subtitle') }}</p>

        <div class="text-left bg-rose-gold-50/50 dark:bg-stone-800/50 rounded-xl p-5 mb-6 space-y-3">
          <h3 class="font-display text-sm tracking-wide uppercase text-stone-700 dark:text-stone-300 mb-3">
            {{ t('Book.confirm.summary') }}
          </h3>
          <div class="flex justify-between text-sm">
            <span class="text-stone-500">{{ t('Book.confirm.service') }}</span>
            <span class="text-stone-900 dark:text-stone-100 font-medium">{{ selectedService?.name }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-stone-500">{{ t('Book.confirm.date') }}</span>
            <span class="text-stone-900 dark:text-stone-100 font-medium">{{ formattedDate }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-stone-500">{{ t('Book.confirm.time') }}</span>
            <span class="text-stone-900 dark:text-stone-100 font-medium">{{ selectedTime }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-stone-500">{{ t('Book.confirm.duration') }}</span>
            <span class="text-stone-900 dark:text-stone-100 font-medium">{{ selectedService?.duration }}</span>
          </div>
          <div class="h-px bg-stone-200 dark:bg-stone-700" />
          <div class="flex justify-between text-sm">
            <span class="text-stone-500">{{ t('Book.confirm.price') }}</span>
            <span class="text-rose-gold-600 dark:text-rose-gold-400 font-semibold">{{ selectedService?.price }}</span>
          </div>
        </div>

        <p class="text-xs text-stone-400 dark:text-stone-500 leading-relaxed mb-6">
          {{ t('Book.confirm.message') }}
        </p>

        <div class="flex gap-3">
          <UButton :label="t('Book.confirm.backHome')" to="/" variant="outline" class="flex-1" />
          <UButton :label="t('Book.confirm.bookAnother')" class="flex-1" @click="bookAnother" />
        </div>
      </div>
    </div>

    <!-- Booking flow -->
    <div v-else class="max-w-4xl mx-auto px-6 pb-20">
      <UStepper
        :items="steps"
        v-model="currentStep"
        disabled
        class="mb-10"
      >
        <!-- Step 1: Service Selection -->
        <template #service>
          <h2 class="font-display text-xl tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-6">
            {{ t('Book.serviceStep.title') }}
          </h2>

          <UInput
            v-model="searchQuery"
            :placeholder="t('Book.serviceStep.searchPlaceholder')"
            icon="i-lucide-search"
            size="lg"
            class="mb-6"
          />

          <div v-for="cat in filteredCategories" :key="cat.id" class="mb-6">
            <h3 class="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <UIcon :name="cat.icon" class="size-4" />
              {{ cat.title }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="service in cat.services"
                :key="service.id"
                class="text-left p-4 rounded-xl border transition-all duration-200"
                :class="selectedServiceId === service.id
                  ? 'border-rose-gold-400 bg-rose-gold-50 dark:bg-rose-gold-950/20 dark:border-rose-gold-600 shadow-sm'
                  : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-rose-gold-200 dark:hover:border-stone-700'"
                @click="selectService(service.id)"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <p class="font-medium text-sm text-stone-900 dark:text-stone-100">{{ service.name }}</p>
                      <span
                        v-if="service.sessions"
                        class="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-gold-100 dark:bg-rose-gold-900/30 text-rose-gold-700 dark:text-rose-gold-300"
                      >
                        <UIcon name="i-lucide-layers" class="size-3" />
                        {{ t('Book.serviceStep.packageBadge', { n: service.sessions }) }}
                      </span>
                    </div>
                    <p class="text-xs text-stone-400 dark:text-stone-500 line-clamp-2">{{ service.description }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-sm font-semibold text-rose-gold-600 dark:text-rose-gold-400 tabular-nums">{{ service.price }}</p>
                    <p class="text-xs text-stone-400">{{ service.duration }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Package info callout -->
          <div
            v-if="selectedService?.sessions"
            class="mt-6 flex gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40"
          >
            <UIcon name="i-lucide-info" class="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-amber-900 dark:text-amber-200 mb-1">
                {{ t('Book.package.title') }}
              </p>
              <p class="text-xs text-amber-700 dark:text-amber-300/80 leading-relaxed">
                {{ t('Book.package.description') }}
              </p>
              <p class="text-xs text-amber-600/70 dark:text-amber-400/60 mt-2 italic">
                {{ t('Book.package.note') }}
              </p>
            </div>
          </div>
        </template>

        <!-- Step 2: Date & Time -->
        <template #date>
          <h2 class="font-display text-xl tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-2">
            {{ t('Book.dateStep.title') }}
          </h2>
          <p v-if="selectedService" class="text-sm text-rose-gold-500 mb-6">
            {{ selectedService.name }}
            <span v-if="selectedService.sessions" class="text-stone-400 dark:text-stone-500"> — first session</span>
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Calendar -->
            <div class="flex justify-center">
              <UCalendar
                v-model="selectedDate"
                :min-value="todayDate"
                :is-date-disabled="isDateDisabled"
                size="lg"
                @update:model-value="selectedTime = ''"
              />
            </div>

            <!-- Time slots -->
            <div>
              <h3 class="font-display text-sm tracking-wide uppercase text-stone-700 dark:text-stone-300 mb-4">
                {{ t('Book.dateStep.timeTitle') }}
              </h3>

              <div v-if="!selectedDate" class="text-sm text-stone-400 dark:text-stone-500 italic">
                {{ t('Book.dateStep.noTimes') }}
              </div>

              <div v-else-if="timeSlots.length === 0" class="text-sm text-stone-400 dark:text-stone-500 italic">
                {{ t('Book.dateStep.closedDay') }}
              </div>

              <template v-else>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="slot in timeSlots"
                    :key="slot.time"
                    class="px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border"
                    :disabled="!slot.available"
                    :class="[
                      !slot.available
                        ? 'border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-stone-300 dark:text-stone-600 cursor-not-allowed line-through'
                        : selectedTime === slot.time
                          ? 'bg-rose-gold-500 text-white border-rose-gold-500 shadow-sm'
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-rose-gold-300 dark:hover:border-rose-gold-700',
                    ]"
                    @click="slot.available && selectTime(slot.time)"
                  >
                    {{ slot.time }}
                  </button>
                </div>
                <p class="text-[11px] text-stone-400 dark:text-stone-500 mt-3 italic">
                  {{ t('Book.dateStep.mockNote') }}
                </p>
              </template>
            </div>
          </div>
        </template>

        <!-- Step 3: Contact Details -->
        <template #details>
          <h2 class="font-display text-xl tracking-wide uppercase text-stone-900 dark:text-stone-100 mb-6">
            {{ t('Book.detailsStep.title') }}
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <UForm
              ref="contactForm"
              :schema="ContactDetailsSchema"
              :state="contactState"
              :validate-on="['blur', 'change']"
              class="lg:col-span-2 space-y-5"
            >
              <UFormField name="name" :label="t('Book.detailsStep.name')">
                <UInput
                  v-model="contactState.name"
                  :placeholder="t('Book.detailsStep.namePlaceholder')"
                  icon="i-lucide-user"
                  size="lg"
                />
              </UFormField>

              <UFormField name="email" :label="t('Book.detailsStep.email')">
                <UInput
                  v-model="contactState.email"
                  type="email"
                  :placeholder="t('Book.detailsStep.emailPlaceholder')"
                  icon="i-lucide-mail"
                  size="lg"
                />
              </UFormField>

              <UFormField name="phone" :label="t('Book.detailsStep.phone')">
                <UInput
                  v-model="contactState.phone"
                  type="tel"
                  :placeholder="t('Book.detailsStep.phonePlaceholder')"
                  icon="i-lucide-phone"
                  size="lg"
                />
              </UFormField>

              <UFormField name="notes" :label="t('Book.detailsStep.notes')">
                <UTextarea
                  v-model="contactState.notes"
                  :placeholder="t('Book.detailsStep.notesPlaceholder')"
                  :rows="3"
                />
              </UFormField>

              <!-- Honeypot — invisible to humans, bots auto-fill it -->
              <div class="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true" tabindex="-1">
                <label for="website">Website</label>
                <input id="website" v-model="honeypot" type="text" name="website" autocomplete="off" tabindex="-1" />
              </div>
            </UForm>

            <!-- Booking summary card -->
            <div class="bg-rose-gold-50/50 dark:bg-stone-800/50 rounded-xl p-5 h-fit space-y-3">
              <h3 class="font-display text-sm tracking-wide uppercase text-stone-700 dark:text-stone-300 mb-2">
                {{ t('Book.confirm.summary') }}
              </h3>
              <div class="text-sm space-y-2">
                <div class="flex justify-between">
                  <span class="text-stone-500">{{ t('Book.confirm.service') }}</span>
                  <span class="text-stone-900 dark:text-stone-100 font-medium text-right">{{ selectedService?.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-500">{{ t('Book.confirm.date') }}</span>
                  <span class="text-stone-900 dark:text-stone-100 font-medium">{{ formattedDate }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-500">{{ t('Book.confirm.time') }}</span>
                  <span class="text-stone-900 dark:text-stone-100 font-medium">{{ selectedTime }}</span>
                </div>
                <div class="h-px bg-stone-200 dark:bg-stone-700 my-2" />
                <div class="flex justify-between">
                  <span class="text-stone-500">{{ t('Book.confirm.price') }}</span>
                  <span class="text-rose-gold-600 dark:text-rose-gold-400 font-semibold">{{ selectedService?.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit error (anti-bot or server) -->
          <div v-if="submitError" class="mt-4 flex gap-2 items-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-300">
            <UIcon name="i-lucide-alert-circle" class="size-4 shrink-0" />
            {{ submitError }}
          </div>
        </template>
      </UStepper>

      <!-- Navigation buttons -->
      <div class="flex justify-between items-center mt-8">
        <UButton
          v-if="currentStep > 0"
          :label="t('Book.nav.back')"
          variant="ghost"
          icon="i-lucide-arrow-left"
          @click="goBack"
        />
        <div v-else />

        <UButton
          :label="currentStep === 2 ? t('Book.nav.confirm') : t('Book.nav.next')"
          :icon="currentStep === 2 ? 'i-lucide-check' : 'i-lucide-arrow-right'"
          trailing
          size="lg"
          :disabled="!canGoNext"
          @click="goNext"
        />
      </div>
    </div>
  </div>
</template>
