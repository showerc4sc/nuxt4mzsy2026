# AGENTS.md

Workspace instructions for ZCode agents working in this repository.

## Project Overview

Corporate marketing website for **淼泽松源（上海）科技发展有限公司** ("淼泽松源"), a Shanghai-based new-energy technology company (methanol fuel cells, wind power, energy storage, equipment sales/rental). All UI text and code comments are written in **Chinese (zh-CN)** — match this convention when editing.

**Stack:** Nuxt 4 (`^4.2.1`, `app/` directory structure), Vue 3.5, Vue Router 4, Tailwind CSS 3 via `@nuxtjs/tailwindcss`, `@nuxt/icon` with the `@iconify-json/heroicons` icon set (use `<Icon name="heroicons:xxx" />`). SSR is enabled.

## Commands

From `package.json` (no lint / typecheck / test scripts are configured — do not claim to run them):

- `npm run dev` — start dev server on `http://localhost:3000`
- `npm run build` — production build
- `npm run generate` — static generation
- `npm run preview` — preview production build
- `npm install` — runs `nuxt prepare` via `postinstall`

## Directory Layout

```
app/
  app.vue                  # Root component; inline critical CSS to prevent FOUC (v-cloak)
  layouts/default.vue      # Header + PageTransition + Footer; smooth-scrolls to top on route change
  pages/                   # File-based routing
    index/index.vue, about.vue, news.vue, newsDetail/[id].vue,
    products.vue, products/[id].vue, productDetail/[id].vue,
    partners.vue, contact.vue
  components/              # Auto-imported. Grouped by feature: about/, index/, news/, partners/
                           # plus TheHeader, TheFooter, PageTitle, PageTransition
  composables/             # Auto-imported: useApi, useCompanyInfo, useAnimations, useMobileOptimization
  api/                     # NOT auto-imported — import explicitly via '~/api/...'
  utils/                   # request.js, api.js
  plugins/api.client.js    # Client-only plugin; provides $api
  data/company.json        # Static fallback company data
  assets/css/main.css      # Global styles + Tailwind directives
server/api/                # Empty — no Nitro routes; all data fetching is client→external API
public/                    # Static assets (images, video, robots.txt, favicon)
tailwind.config.js         # Custom color scales (primary, eco, tech, energy, success, warning, danger, neutral), shadows, animations
.codebuddy/figma/          # Figma design references
```

## Architecture & Layer Rules

**Two parallel request layers exist — do not mix them up:**

1. `app/utils/request.js` — default export `{ get, post, put, delete, request }`. Wraps `$fetch`, standardizes responses into `{ code, msg, data }` where `code === 0` means success, and injects the `appkey: "showerc19861008@"` header. **Used by the `app/api/*.js` modules** (`import request from '~/utils/request'`). API modules (`article.js`, `category.js`) are the canonical way to call endpoints.
2. `app/utils/api.js` + `app/plugins/api.client.js` — thinner `$fetch` wrapper exposed as `$api` (**client-only**). Used by the `useApi` composable (`useApiFetch`, `useApiFetchClient`, `useApiRequest`).

API base URL comes from `runtimeConfig.public.apiBase` (a UniCloud function URL), with a hardcoded fallback in `request.js`.

**When adding endpoints:** create a function in the relevant `app/api/*.js` module (e.g. `article.js`, `category.js`) and import it explicitly into pages/components. Endpoints follow the pattern `/client/cms/<resource>/pub/<action>`.

**SSR:** Most `useAsyncData` calls use `server: true`. `useApiFetchClient` is the client-only variant — use it when a call must not run on the server.

**Company info:** `useCompanyInfo()` caches company data globally via `useState('cached-company-info')` and fetches it once using article slug `'company-info'`. Company name defaults to `'淼泽松源'`. Reuse this composable rather than refetching.

## Conventions & Gotchas

- **No auto-import for `app/api/`** — always use explicit `import ... from '~/api/...'`. In Nuxt 4, `~` resolves to `app/`.
- **Console logging is intentionally kept in production** — `nuxt.config.ts` sets terser `drop_console: false`, and `request.js` logs every request/response. Do not strip these logs.
- **FOUC prevention** — `app.vue` injects inline critical CSS and uses `v-cloak` to hide content until styles load. Preserve this pattern when editing the root or layout.
- **Page transitions** — `pageTransition` / `layoutTransition` are enabled in `nuxt.config.ts`; the default layout wraps `<slot />` in `PageTransition.vue`. Smooth scroll-to-top on route change lives in `layouts/default.vue`.
- **External scripts** — Amap (高德地图) is loaded globally via `nuxt.config.ts` `app.head.script` for the contact page map.
- **Footer ICP备案** — `沪ICP备2026003102号-1` is shown in `TheFooter.vue`.
- **Source language** — most files are `.js` / `.vue` with plain `<script setup>` (no `lang="ts"`). `tsconfig.json` only references generated `.nuxt/tsconfig.*` files.
- **`dist` is a symlink** to `.output/public` (points at a `/d/code/vue3/...` path and is broken on this Windows checkout) — ignore it; use `npm run build` / `.output/` directly.
- **`.history/`** is a local editor history directory; it is untracked and should not be committed or edited.
- **Tailwind theme** — prefer the custom color scales (`eco-*`, `primary-*`, `tech-*`, `energy-*`) and gradient utility classes (`eco-gradient`, `tech-gradient`, etc. in `main.css`) over raw colors to stay on-brand.

## Files to Read Before Sensitive Edits

- `nuxt.config.ts` — runtime config, head scripts, cache rules, build/minify settings
- `app/utils/request.js` — request/response contract (`{ code, msg, data }`) and auth header
- `app/composables/useCompanyInfo.js` — global company-data cache shape
- `tailwind.config.js` + `app/assets/css/main.css` — design tokens and brand styling
