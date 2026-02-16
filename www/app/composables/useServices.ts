import { ServiceCategorySchema, type ServiceCategory } from '~/models'

const serviceImageModules = import.meta.glob('~/assets/images/services/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveImage(filename: string): string | undefined {
  const match = Object.entries(serviceImageModules).find(([path]) => path.endsWith(`/${filename}`))
  return match?.[1]
}

const rawCategories: ServiceCategory[] = [
  {
    id: 'body-contouring',
    title: 'Body Contouring & Sculpting',
    icon: 'i-lucide-sparkles',
    description: 'Sculpt your silhouette with advanced non-invasive techniques that target localized fat, firm the skin, and reduce measurements — all without surgery or downtime.',
    services: [
      {
        id: 'wts',
        name: 'Wood Therapy Sculpting',
        price: '$100',
        duration: '45 min',
        description: 'A hands-on sculpting massage using specially designed wooden tools to shape the abdomen, back, thighs, or glutes — reducing measurements and contouring your silhouette naturally.',
        image: resolveImage('wts.jpg'),
        perArea: true,
      },
      {
        id: 'str',
        name: 'Skin Tightening Radiofrequency',
        price: '$100',
        duration: '45 min',
        description: 'Stimulates collagen production deep within the skin to firm, tighten, and combat sagging — restoring elasticity and a youthful appearance.',
        image: resolveImage('str.png'),
        perArea: true,
      },
      {
        id: 'nifbc',
        name: 'Non-Invasive Fat Burning Cavitation',
        price: '$150',
        duration: '45 min',
        description: 'Ultrasonic waves break down stubborn localized fat deposits without requiring incisions or recovery time — a safe, effective alternative to liposuction.',
        image: resolveImage('nifbc.jpg'),
        perArea: true,
      },
      {
        id: 'dct',
        name: 'Deluxe Contour Therapy',
        price: '$200',
        duration: '30 min',
        description: 'A premium multi-modality session that combines advanced techniques to eliminate localized fat without surgery — delivering visible contouring results.',
        image: resolveImage('dct.jpg'),
        perArea: true,
      },
      {
        id: 'bsp',
        name: 'Body Sculpting Package',
        price: '$1,200',
        duration: '10 sessions',
        description: 'A transformative program including 4 Fat Burning Cavitation sessions, 2 Radiofrequency sessions, and 4 Brazilian lymphatic massages for comprehensive body sculpting.',
        image: resolveImage('bsp.jpg'),
        perArea: false,
        sessions: 10,
      },
    ],
  },
  {
    id: 'post-op',
    title: 'Post-Operative Care',
    icon: 'i-lucide-heart-handshake',
    description: 'Gentle, expert recovery support for your post-surgical journey — from initial lymphatic drainage through advanced tissue restoration.',
    services: [
      {
        id: 'poc1',
        name: 'Post-Op Care — First Phase',
        price: '$150',
        duration: '60 min',
        description: 'Manual lymphatic drainage massage designed for initial post-surgical recovery, including drain and suture removal when indicated by your surgeon.',
        image: resolveImage('poc1.jpg'),
        perArea: false,
      },
      {
        id: 'pocp',
        name: 'Post-Op Care Package',
        price: '$1,000',
        duration: '10 sessions',
        description: 'A comprehensive 10-session recovery program of lymphatic drainage massage, supporting your body through the full healing process. Consultation required.',
        image: resolveImage('pocp.jpg'),
        perArea: false,
        sessions: 10,
      },
      {
        id: 'poc2',
        name: 'Post-Op Care — Second Phase',
        price: '$1,000',
        duration: '10 sessions',
        description: 'An advanced recovery program including 2 Wood Therapy sessions, 2 Radiofrequency sessions, 4 Brazilian lymphatic massages, and 2 Thermic/Red Light Therapy sessions.',
        image: resolveImage('poc2.jpg'),
        perArea: false,
        sessions: 10,
      },
      {
        id: 'aft',
        name: 'Anti-Fibrosis Therapy',
        price: '$175',
        duration: '60 min',
        description: 'Specialized treatment targeting fibrosis and adhesions to restore tissue texture, sensitivity, and mobility — essential for post-surgical recovery.',
        image: resolveImage('aft.jpg'),
        perArea: true,
      },
    ],
  },
  {
    id: 'facial',
    title: 'Facial Services',
    icon: 'i-lucide-flower-2',
    description: 'Rejuvenate and define with targeted facial care — from lymphatic drainage to non-invasive contouring and lip enhancement.',
    services: [
      {
        id: 'flm',
        name: 'Facial Lymphatic Massage',
        price: '$75',
        duration: '45 min',
        description: 'Promotes drainage, reduces puffiness, and enhances natural face contouring — leaving your skin looking refreshed and sculpted.',
        image: resolveImage('flm.jpg'),
        perArea: false,
      },
      {
        id: 'nifc',
        name: 'Non-Invasive Facial Contouring',
        price: '$175',
        duration: '45 min',
        description: 'Targets fat under the chin to define the jawline and create a firmer, more sculpted facial appearance — without surgery.',
        image: resolveImage('nifc.jpg'),
        perArea: false,
      },
      {
        id: 'le',
        name: 'Lips Enhancing',
        price: '$350',
        duration: '135 min',
        description: 'A dedicated session focused on hydration and improvement of lip shape — enhancing your natural beauty with precision care.',
        image: resolveImage('le.jpg'),
        perArea: false,
      },
    ],
  },
  {
    id: 'wellness',
    title: 'Wellness & Recovery',
    icon: 'i-lucide-gem',
    description: 'Specialized treatments for postpartum recovery and body weight management — supporting your body through every stage.',
    services: [
      {
        id: 'pr',
        name: 'Postpartum Recovery',
        price: '$100',
        duration: '45 min',
        description: 'Lymphatic massage designed to reduce swelling and reactivate circulation after pregnancy — a cosmetic wellness service to help you feel like yourself again.',
        image: resolveImage('pr.jpg'),
        perArea: false,
      },
      {
        id: 'wlt',
        name: 'Weight Loss Treatment',
        price: '$175',
        duration: '30 min',
        description: 'Supports body contouring and weight management goals with targeted treatment designed to complement your wellness journey.',
        image: resolveImage('wlt.jpg'),
        perArea: false,
        units: '0.25 units',
      },
    ],
  },
]

// Validate all categories at module load via Zod
const validatedCategories = rawCategories.map(c => ServiceCategorySchema.parse(c))

export function useServices() {
  const categories = useState<ServiceCategory[]>('services-categories', () => validatedCategories)
  const activeCategoryId = useState<string>('services-active-category', () => validatedCategories[0]!.id)

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
