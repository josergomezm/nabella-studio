import type { ServiceCategory, Service } from '~/models'

const serviceImageModules = import.meta.glob('~/assets/images/services/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveImage(filename: string): string | undefined {
  const match = Object.entries(serviceImageModules).find(([path]) => path.endsWith(`/${filename}`))
  return match?.[1]
}

// Static data that doesn't change with locale
interface ServiceData {
  id: string
  price: string
  duration: string
  image?: string
  perArea: boolean
  sessions?: number
  units?: string
}

interface CategoryData {
  id: string
  icon: string
  services: ServiceData[]
}

const categoryData: CategoryData[] = [
  {
    id: 'body-contouring',
    icon: 'i-lucide-sparkles',
    services: [
      { id: 'wts', price: '$100', duration: '45 min', image: resolveImage('wts.jpg'), perArea: true },
      { id: 'str', price: '$100', duration: '45 min', image: resolveImage('str.png'), perArea: true },
      { id: 'nifbc', price: '$150', duration: '45 min', image: resolveImage('nifbc.jpg'), perArea: true },
      { id: 'dct', price: '$200', duration: '30 min', image: resolveImage('dct.jpg'), perArea: true },
      { id: 'bsp', price: '$1,200', duration: '10 sessions', image: resolveImage('bsp.jpg'), perArea: false, sessions: 10 },
    ],
  },
  {
    id: 'post-op',
    icon: 'i-lucide-heart-handshake',
    services: [
      { id: 'poc1', price: '$150', duration: '60 min', image: resolveImage('poc1.jpg'), perArea: false },
      { id: 'pocp', price: '$1,000', duration: '10 sessions', image: resolveImage('pocp.jpg'), perArea: false, sessions: 10 },
      { id: 'poc2', price: '$1,000', duration: '10 sessions', image: resolveImage('poc2.jpg'), perArea: false, sessions: 10 },
      { id: 'aft', price: '$175', duration: '60 min', image: resolveImage('aft.jpg'), perArea: true },
    ],
  },
  {
    id: 'facial',
    icon: 'i-lucide-flower-2',
    services: [
      { id: 'flm', price: '$75', duration: '45 min', image: resolveImage('flm.jpg'), perArea: false },
      { id: 'nifc', price: '$175', duration: '45 min', image: resolveImage('nifc.jpg'), perArea: false },
      { id: 'le', price: '$350', duration: '135 min', image: resolveImage('le.jpg'), perArea: false },
    ],
  },
  {
    id: 'wellness',
    icon: 'i-lucide-gem',
    services: [
      { id: 'pr', price: '$100', duration: '45 min', image: resolveImage('pr.jpg'), perArea: false },
      { id: 'wlt', price: '$175', duration: '30 min', image: resolveImage('wlt.jpg'), perArea: false, units: '0.25 units' },
    ],
  },
]

export function useServices() {
  const { t } = useI18n()

  // Build localized categories by merging static data with i18n translations
  const categories = computed<ServiceCategory[]>(() =>
    categoryData.map(cat => ({
      id: cat.id,
      icon: cat.icon,
      title: t(`Services.categories.${cat.id}.title`),
      description: t(`Services.categories.${cat.id}.description`),
      services: cat.services.map((svc): Service => ({
        id: svc.id,
        name: t(`Services.items.${svc.id}.name`),
        description: t(`Services.items.${svc.id}.description`),
        price: svc.price,
        duration: svc.duration,
        image: svc.image,
        perArea: svc.perArea,
        sessions: svc.sessions,
        units: svc.units,
      })),
    })),
  )

  const activeCategoryId = useState<string>('services-active-category', () => categoryData[0]!.id)

  const activeCategory = computed<ServiceCategory>(() =>
    categories.value.find(c => c.id === activeCategoryId.value) ?? categories.value[0]!,
  )

  const allServices = computed(() =>
    categories.value.flatMap(c => c.services),
  )

  const serviceCount = computed(() => allServices.value.length)

  function setActiveCategory(id: string) {
    activeCategoryId.value = id
  }

  return {
    categories,
    activeCategoryId,
    activeCategory,
    allServices,
    serviceCount,
    setActiveCategory,
  }
}
