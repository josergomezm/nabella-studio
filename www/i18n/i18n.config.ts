// Component translations
import Example from './locales/components/Example'
import Layout from './locales/components/Layout'

// Page translations
import Home from './locales/pages/Home'
import Book from './locales/pages/Book'

// Data translations
import Services from './locales/data/Services'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: {
        // Components
        Example: Example.en,
        Layout: Layout.en,

        // Pages
        Home: Home.en,
        Book: Book.en,

        // Data
        Services: Services.en,
      },
      es: {
        // Components
        Example: Example.es,
        Layout: Layout.es,

        // Pages
        Home: Home.es,
        Book: Book.es,

        // Data
        Services: Services.es,
      },
    },
  }
})
