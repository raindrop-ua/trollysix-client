# Contributing

Thanks for contributing to TrollySix.

## Prerequisites

- Node.js 22+
- pnpm 10+

## Setup

```bash
pnpm install
```

## Main Commands

- Start local dev app: `pnpm start`
- Build app (browser + server bundles): `pnpm build`
- Lint: `pnpm lint`
- Unit tests: `pnpm test --watch=false`
- Cypress e2e (headless): `pnpm e2e`
- Cypress interactive: `pnpm e2e:open`

## SSR Smoke Flow (local)

Terminal 1:

```bash
pnpm build
pnpm start:ssr:e2e
```

Terminal 2:

```bash
pnpm e2e
```

## Development Rules

- Keep changes scoped and minimal.
- Follow existing Angular standalone + TypeScript style.
- Preserve SSR compatibility when touching routing/bootstrap/browser-only APIs.
- Prefer updating existing files over introducing new abstractions.
- Do not edit generated output in `dist/` or cached content in `.angular/`.

## Testing Expectations

- For targeted feature changes, run at least affected tests + lint.
- For changes touching templates/routing/state/SSR, run broader checks:
  - `pnpm lint`
  - `pnpm test --watch=false`
  - `pnpm build`
- For SSR-sensitive flows, run smoke e2e locally.

## Commit Conventions

This project uses conventional commits (`commitlint`).

Examples:

- `feat(schedule): add api contract validation`
- `fix(ssr): guard browser-only side effects`
- `test(effects): cover timetable load failure`

## Pull Request Checklist

- [ ] Change is scoped to the requested behavior
- [ ] Lint passes
- [ ] Tests pass
- [ ] Build passes
- [ ] SSR/e2e smoke validated when relevant
- [ ] No generated artifacts committed (`dist/`, `.angular/`, `node_modules/`)
