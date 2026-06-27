# Rola Alsulami — Portfolio (Starter)

This repository is a starter scaffold for a premium portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It includes JSON-based data files and a minimal admin-write API to manage content without editing source code.

## Quick start

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

API endpoints (read):

- `GET /api/data/profile`
- `GET /api/data/projects`
- `GET /api/data/internship`
- `GET /api/data/skills`
- `GET /api/data/experience`
- `GET /api/data/contact`

To update content from the admin UI (or programmatically), send a `POST` with a JSON body to the same endpoints (server must have write permissions).

## Next steps

- Implement full Admin Dashboard pages (drag & drop, uploads)
- Add authentication for admin API
- Add image upload support and storage
- Polish UI with Shadcn components and Lucide icons

