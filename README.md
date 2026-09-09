# Subin P K — Developer Portfolio

A dark, red-accented developer portfolio built with React 18, Vite, Tailwind CSS and Framer Motion. Features a full-screen photo hero, an animated terminal panel, an experience timeline, project cards, and a skills matrix — all pulled from Subin's CV.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production build is output to `dist/`.

## Before you deploy

- **Resume**: the "Download Resume" button links to `/resume.pdf`. Drop your resume PDF into the `public/` folder (create it if missing) so the link resolves.
- **Hero photo**: lives at `src/assets/hero.jpg`. Swap it for a different image any time — just keep the same filename or update the import in `src/App.jsx`.
- **Content**: all copy (experience, projects, skills, education, contact links) is in `src/App.jsx` as plain data arrays near the top of the file — easy to edit without touching the layout.

## Deploying

This is a standard Vite project, so it deploys cleanly to Vercel, Netlify, or any static host:

```bash
npm run build
```

then point your host at the `dist/` folder (Vercel/Netlify auto-detect Vite projects — no extra config needed).

## Stack

- React 18 + Vite
- Tailwind CSS v3
- Framer Motion (scroll reveals, nav pill transition, terminal typing effect)
- lucide-react (icons)
