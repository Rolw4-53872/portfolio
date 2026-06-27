# Rola Alsulami — Data Science Portfolio

A premium, bilingual (Arabic/English) Data Science portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features dark/light mode, RTL/LTR support, smooth animations, and a fully static architecture — no backend, no database.

---

## Features

- **Bilingual** — Full Arabic (RTL) and English (LTR) support with seamless switching
- **Dark / Light Mode** — Persisted across sessions via localStorage
- **Premium Design** — Glassmorphism, gradient cards, floating orbs, animated counters
- **Fully Static** — All content lives in TypeScript data files; no backend, no database, no CMS
- **Responsive** — Mobile-first design tested across phones, tablets, and desktops
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation
- **SEO Ready** — Rich metadata, Open Graph, clean URLs
- **Deployment Ready** — Works on Vercel, Netlify, and GitHub Pages out of the box

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts) |
| Deployment | Vercel / Netlify / GitHub Pages |

---

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, metadata, dark mode
│   └── page.tsx            # Home page (imports data + renders sections)
├── components/             # Shared React components
│   ├── Header.tsx          # Navigation, theme toggle, language switcher
│   ├── PortfolioHome.tsx   # All portfolio sections
│   └── Providers.tsx       # React Context for lang/theme
├── src/
│   ├── data/               # ← Edit your content here
│   │   ├── profile.ts      # Name, bio, social links, CV path
│   │   ├── projects.ts     # Academic projects with challenges & results
│   │   ├── internshipProjects.ts  # Internship work (confidential)
│   │   ├── skills.ts       # Skills grouped by category
│   │   ├── experience.ts   # Work experience
│   │   ├── education.ts    # Education & coursework
│   │   ├── volunteer.ts    # Volunteer experience
│   │   ├── languages.ts    # Language proficiency levels
│   │   └── contact.ts      # Contact information
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces for all data
│   ├── hooks/
│   │   └── useCountUp.ts   # Animated number counter hook
│   └── utils/
│       └── cn.ts           # Class name utility
├── styles/
│   └── globals.css         # Global styles, dark mode, orb animations
├── public/
│   └── assets/
│       └── files/
│           └── cv.pdf      # ← Upload your CV here
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rolw4-53872/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Editing Your Content

All portfolio content is in `src/data/`. Each file is a typed TypeScript module — just update the values:

```bash
src/data/profile.ts         # Your name, bio, email, GitHub, LinkedIn, CV path
src/data/projects.ts        # Academic projects
src/data/internshipProjects.ts  # Internship projects
src/data/skills.ts          # Technical skills
src/data/experience.ts      # Work experience
src/data/education.ts       # Education history
src/data/volunteer.ts       # Volunteer work
src/data/languages.ts       # Languages & proficiency
src/data/contact.ts         # Contact details
```

No UI changes needed — just save the file and the portfolio updates automatically.

---

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Click **Deploy** — no extra configuration needed

### Netlify

```bash
npm run build
# Upload the `.next` folder or connect your GitHub repo on netlify.com
```

### GitHub Pages (Static Export)

Add to `next.config.js`:
```js
output: 'export'
```

Then run:
```bash
npm run build
# Deploy the `out/` folder
```

---

## Available Scripts

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Adding Your CV

Place your CV PDF at:
```
public/assets/files/cv.pdf
```

The download button in the header links to this path automatically.

---

## Contact

**Rola Alsulami**
- Email: rolwalsulami@gmail.com
- GitHub: [rolw4-53872](https://github.com/rolw4-53872)
- LinkedIn: [rola-alsulami](https://linkedin.com/in/rola-alsulami)
- Location: Makkah, Saudi Arabia

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
