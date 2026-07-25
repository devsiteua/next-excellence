# English Excellence — Landing Page

Marketing landing page for **English Excellence**, an online English language school.
The site presents the school's offering, course plans and teaching staff, and converts
visitors into leads through an application form.

**Live:** https://devsiteua.github.io/next-excellence/

## Overview

A single-page static site: HTML, CSS and vanilla JavaScript, bundled with Vite.
The layout is built mobile-first and adapts from small screens up to desktop. Raster
images ship in WebP with JPG/PNG fallbacks and in 1x/2x variants for retina displays;
icons come from a single SVG sprite. The production output is a plain static bundle
that can be hosted anywhere.

Page sections: header with navigation and mobile menu, hero, about us, lessons and
pricing plans, promotional block, teachers, application form, student reviews, footer.

## Tech stack

| Area | Technology |
| --- | --- |
| Markup | HTML5 |
| Styles | CSS3, custom properties, flexbox & grid |
| Scripts | Vanilla JavaScript |
| Build | Vite 5 |
| HTML composition | `vite-plugin-html-inject` |
| CSS post-processing | PostCSS + `postcss-sort-media-queries` (mobile-first sort) |
| Fonts | Manrope via Google Fonts, modern-normalize via CDN |
| Code style | Prettier, EditorConfig |
| CI/CD | GitHub Actions → GitHub Pages |

## Project structure

```
.
├── .github/workflows/
│   └── deploy.yml          # CI: build and deploy to GitHub Pages
├── src/
│   ├── css/                # One stylesheet per section + reset, variables, base,
│   │                       # common; all imported through styles.css
│   ├── img/                # Images grouped by section (1x/2x, WebP) + SVG sprite
│   ├── partials/
│   │   ├── sections/       # Markup for the page sections
│   │   └── ...             # Header, footer, mobile menu, socials
│   ├── public/             # Static assets served as-is (favicon)
│   ├── index.html          # Page shell that composes the partials
│   └── main.js             # Page script
├── .prettierrc.json
├── package.json
└── vite.config.js
```

Each section lives in its own partial and has its own stylesheet; `index.html` stays a
thin composition layer, and `styles.css` is the single entry point for styles. Design
tokens (colors, font, transitions) are defined as CSS custom properties in
`variables.css`. Media queries are written mobile-first next to the rules they modify
and are grouped automatically at build time.

## Getting started

Requirements: Node.js LTS (18+) and npm.

```bash
git clone https://github.com/devsiteua/next-excellence.git
cd next-excellence
npm install
npm run dev
```

The dev server runs at http://localhost:5173 and reloads on every saved change.

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production bundle in `dist/` |

## Deployment

A push to `main` triggers the GitHub Actions workflow (`deploy.yml`), which installs
dependencies, builds the project and publishes `dist/` to the `gh-pages` branch, from
which GitHub Pages serves the site.

The build uses `--base=/next-excellence/` to match the GitHub Pages sub-path — update
this flag in `package.json` when moving the site to a custom domain or a root path.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile.
Internet Explorer is not supported.
