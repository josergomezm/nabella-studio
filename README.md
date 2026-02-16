# Nabella Studio

Beauty and wellness studio founded by Ruth Raldiris, focused on intentional, results-driven body care in a serene and personalized setting.

## Tech Stack

- [Nuxt 4](https://nuxt.com/) — Vue framework
- [Nuxt UI v4](https://ui.nuxt.com/) — Component library (includes Tailwind CSS v4)
- [Zod](https://zod.dev/) — Schema validation
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) — Internationalization (EN / ES)
- Firebase — Backend services

## Getting Started

```bash
cd www
npm install
npm run dev
```

## Project Structure

```
www/
├── app/
│   ├── pages/          # File-based routing
│   ├── components/     # Vue components
│   ├── models.ts       # Zod schemas & types
│   └── assets/css/     # Tailwind entry point
├── i18n/
│   └── locales/        # Translation files (pages/ & components/)
├── server/             # Nitro server routes
└── nuxt.config.ts
firebase/               # Firebase configuration
```

## License

All rights reserved © Nabella Studio
