export default defineAppConfig({
  ui: {
    colors: {
      primary: 'rose-gold',
      neutral: 'stone',
    },
    header: {
      slots: {
        root: 'bg-white/90 dark:bg-stone-950/90 backdrop-blur-lg border-b border-rose-gold-100 dark:border-rose-gold-900/30 shadow-sm',
        title: 'font-display text-2xl tracking-wider text-rose-gold-500',
      },
    },
    footer: {
      slots: {
        root: 'bg-rose-gold-950 border-none',
        left: 'text-rose-gold-300/80',
      },
    },
    button: {
      defaultVariants: {
        color: 'primary' as const,
      },
      slots: {
        base: 'tracking-wide',
      },
    },
    pageHero: {
      slots: {
        root: 'relative overflow-hidden',
        title: 'font-display tracking-widest',
        description: 'leading-relaxed',
      },
    },
    pageSection: {
      slots: {
        root: 'dark:bg-stone-950',
        title: 'font-display tracking-wider dark:text-stone-100',
        headline: 'text-rose-gold-500 tracking-[0.2em] font-medium',
        description: 'leading-relaxed dark:text-stone-400',
      },
    },
    pageFeature: {
      slots: {
        title: 'font-display tracking-wide',
        leadingIcon: 'text-rose-gold-400',
      },
    },
    pageCard: {
      slots: {
        root: 'dark:bg-stone-900 dark:border-stone-800',
        title: 'font-display tracking-wide dark:text-stone-100',
      },
    },
    pageCTA: {
      slots: {
        title: 'font-display tracking-widest',
        description: 'leading-relaxed',
      },
    },
    navigationMenu: {
      slots: {
        link: 'dark:text-stone-300 dark:hover:text-rose-gold-400',
      },
    },
  },
})
