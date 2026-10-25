# Othello
Simple and clean Othello(Reversi) app built with React, Vite, TypeScript, and Jotai.

You can play here ▶️ https://othello.ebinas.dev/

<img width="1042" alt="playground" src="https://user-images.githubusercontent.com/54468945/235341390-7753d8a1-3ae6-4a41-9043-6af09d964478.png">

## 🚀 Getting Started

install dependencies

```
npm ci
```

run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Requirements
* Node.js 22.x locally and in the deployment environment
* npm 11.19.1 or later within npm 11 is recommended for local dependency updates
* Safari 16.4+, Chrome 111+, or Firefox 128+ (Tailwind CSS 4)

Dependency installation scripts are disabled by `.npmrc`. Newly resolved packages
must be at least seven days old to reduce exposure to compromised new releases.
Use the recommended npm version locally so the release-age setting is enforced.
Deployments can use the platform-provided npm version. Use `npm ci` to install the
versions recorded in `package-lock.json`.

## Build and deployment

- `npm run lint`: check source syntax and React Hooks rules.
- `npm run build`: type-check and build the static site into `dist/`.
- `npm run preview`: preview the production build locally.

Vercel uses the Vite framework, `npm run build`, and the `dist/` output directory
as configured in `vercel.json`. Keep the existing project and domain, and check a
Preview Deployment before releasing.

Site metadata is in `index.html`; the favicon, social image, robots, and sitemap
are served from `public/`. Gameplay runs in the browser. Offline reloading via a
Service Worker is not included.

## 📁 Assets
Vectors and icons by <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a>

## 📔 Blog
https://zenn.dev/ebiiina/scraps/6da46f891a9a7f
