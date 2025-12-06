# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all TypeScript React code: `main.tsx` bootstraps the app, `App.tsx` defines the page layout and Konami/DVD behavior, `AppCard.tsx` renders link cards, `index.css` carries shared styles, `types/` stores shared definitions, and `klaro.d.ts`/`vite-env.d.ts` house ambient typings.
- `public/` contains static assets and favicons referenced by components (e.g., `profile.webp`, `favicon_*`).
- Tooling lives at the root: `vite.config.ts` for bundling, `tsconfig.json` for TypeScript settings, and `biome.json` for lint/format rules.

## Build, Test, and Development Commands
Use `pnpm` to stay aligned with the existing lockfile.

```sh
pnpm dev       # Vite dev server with HMR
pnpm build     # Type-check via tsc, then Vite production bundle
pnpm preview   # Serve the built bundle locally
pnpm lint      # Biome static analysis (format + lint checks)
pnpm format    # Apply Biome formatting
```

## Coding Style & Naming Conventions
- Language stack: React 19 + TypeScript + Vite. Favor functional components and hooks.
- Indentation follows the current codebase (tabs with trailing commas where Biome applies them).
- Components and files use `PascalCase` (`AppCard.tsx`), functions/hooks/constants use `camelCase` (`useKonami`, `setShowDvdPlayer`), and shared types belong in `types/`.
- Styling is primarily Tailwind utility classes; keep inline styles minimal and scoped. Reuse DaisyUI classes where available.

## Testing Guidelines
- No automated test suite is present yet. When adding tests, prefer Vitest + React Testing Library (works smoothly with Vite) and place specs alongside components or in `src/__tests__/`.
- Keep tests focused on rendered output and behavior of `AppCard` and Konami/DVD toggling; avoid brittle snapshots of Tailwind class lists.

## Commit & Pull Request Guidelines
- Recent history favors short conventional prefixes (`feat:`, `fix:`, `chore:`). Write imperative, concise subjects (≈50 chars) and keep scope narrow.
- For PRs: include a brief summary of intent, mention affected routes/components, add before/after screenshots for UI changes, and list manual checks (e.g., `pnpm lint`, `pnpm build`). Link related issues when relevant.
