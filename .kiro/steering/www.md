---
inclusion: fileMatch
fileMatchPattern: 'www/**'
---

# www — Nuxt Project Conventions

## Stack

- Nuxt 4
- Nuxt UI v4 (includes Tailwind CSS v4, color mode, fonts)
- Zod for schema validation (models defined in `app/models.ts`)
- `@nuxtjs/i18n` for localization (Vue I18n v11)

## Project Structure

```
www/
├── app/
│   ├── assets/css/main.css    # Tailwind entry point
│   ├── app.vue                # Root component
│   ├── models.ts              # Zod schemas and inferred types
│   ├── pages/                 # File-based routing
│   └── components/            # Vue components
├── i18n/
│   ├── i18n.config.ts         # Vue I18n runtime config (auto-loaded)
│   └── locales/
│       ├── pages/             # One file per page
│       └── components/        # One file per component
├── server/                    # Nitro server routes
└── nuxt.config.ts
```

## Localization Rules

Locale files shadow the pages and components directory structure:

- `app/pages/Home.vue` → `i18n/locales/pages/Home.ts`
- `app/components/NavBar.vue` → `i18n/locales/components/NavBar.ts`

Each locale file exports a default object keyed by language code. The translations live inside the language key, not at the root:

```ts
// i18n/locales/pages/Home.ts
export default {
  en: {
    hero: {
      title: 'Welcome',
      description: 'Some description',
    },
  },
}
```

When adding a new language to an existing file, add a sibling key:

```ts
export default {
  en: {
    hero: { title: 'Welcome' },
  },
  es: {
    hero: { title: 'Bienvenido' },
  },
}
```

In `i18n/i18n.config.ts`, each locale file is imported and explicitly mapped per language using dot access (`Home.en`, `Home.es`). Translations are accessed using the component/page name as namespace:

```vue
<template>
  <h1>{{ $t('Home.hero.title') }}</h1>
</template>
```

When creating a new page or component:
1. Create the corresponding locale file under `i18n/locales/pages/` or `i18n/locales/components/`
2. Export a default object with a key per supported language (`en`, `es`, etc.)
3. Import the file in `i18n/i18n.config.ts` and add `Name.en` (and `Name.es`, etc.) to each language's messages block
4. When adding a new language, also register it in `nuxt.config.ts` under `i18n.locales`

## Models

All shared Zod schemas and their inferred TypeScript types live in `app/models.ts`. Use `z.infer<typeof Schema>` to derive types from schemas.
