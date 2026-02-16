// Component translations
import Example from './locales/components/Example'
import Layout from './locales/components/Layout'

// Page translations
import Home from './locales/pages/Home'
import About from './locales/pages/About'
import Results from './locales/pages/Results'
import ServicesPage from './locales/pages/Services'
import ServiceDetail from './locales/pages/ServiceDetail'
import Contact from './locales/pages/Contact'
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
        About: About.en,
        Results: Results.en,
        ServicesPage: ServicesPage.en,
        ServiceDetail: ServiceDetail.en,
        Contact: Contact.en,
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
        About: About.es,
        Results: Results.es,
        ServicesPage: ServicesPage.es,
        ServiceDetail: ServiceDetail.es,
        Contact: Contact.es,
        Book: Book.es,

        // Data
        Services: Services.es,
      },
    },
  }
})
