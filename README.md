# Vectormon

A fully 3D, browser-based **2v2 monster battle game**. Mobile-first (portrait), desktop-secondary. Built to be small in scope and massive in polish, and to deploy statically to Vercel with a single push.

> All monster, trainer, and world names are original placeholders. Vectormon is not affiliated with any existing franchise and contains no third-party copyrighted names or assets.

## Tech stack

- React + TypeScript + Vite
- Three.js + React Three Fiber + Drei
- Zustand (state)
- Howler.js (audio)
- React Spring (animation)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

No backend, no server setup, no Docker required.

## Deploy to Vercel

1. Push to the Git remote.
2. Import the repository in Vercel.
3. Click **Deploy**. (Framework is auto-detected as Vite; see `vercel.json`.)

## Project structure

```text
src/
  assets/      # bundled static assets imported by code
  audio/       # Howler setup, track manifest, sound hooks
  monsters/    # 12 monster data + model components
  trainers/    # 12 trainer data + model components
  arenas/      # 4 arena scenes
  battle/      # battle engine: damage, types, status, turns
  components/  # shared 3D + React building blocks
  hooks/       # reusable React hooks
  store/       # Zustand global state
  ui/          # 2D overlay UI (HUD, buttons, menus)
  pages/       # top-level screens
  utils/       # pure helpers (math, RNG, shuffle bag)
  types/       # shared TypeScript types
```

## Status

First edition (v1.0) in progress. Art and audio use procedural/primitive placeholders where real assets are unavailable, so the game is playable end-to-end.
