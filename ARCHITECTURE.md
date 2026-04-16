# Architecture

## Stack

- Angular 21 (standalone APIs)
- Angular SSR + hydration
- NgRx Store/Effects (feature-scoped state)
- Tailwind CSS
- Vitest + Angular TestBed
- Cypress (SSR smoke)

## Project Layout

- `src/app/core`:
  global providers, platform services, interceptors, layout, cross-app config
- `src/app/shared`:
  reusable UI blocks, directives, pipes, helpers
- `src/app/features/*`:
  feature modules by domain (`home`, `schedule`, `about`, `settings`, `static`)
- `src/environments`:
  runtime base URLs and client-side constants

Feature folders follow a pragmatic split:

- `feature/`: route entry and container components
- `data-access/`: API services, contracts, store state/actions/effects/selectors
- `services/`: feature business services
- `ui/`: presentational components

## Routing

Top-level routing is defined in `src/app/app.routes.ts` with lazy-loaded feature route configs.

Fallback route redirects all unknown URLs to `/404`.

## State and Data Flow

Global store is registered in `src/app/core/config/app-state.providers.ts`.

The `schedule` feature registers its state/effects in route-level providers:

- `src/app/features/schedule/data-access/store/schedule.reducer.ts`
- `src/app/features/schedule/data-access/store/schedule.effects.ts`

High-level flow:

1. `SchedulePageActions.enter` is dispatched from the feature container.
2. Effects load initial reference data (`stops`, `dayTypes`, `directions`).
3. Reducer resolves selected stop/day/direction (URL params take priority when valid).
4. Timetable loading is triggered from selection changes.
5. Selectors build a view model consumed by UI components.

## SSR and TransferState

- SSR is enabled with Angular server build output (`dist/.../server/server.mjs`).
- `ScheduleApiService` uses `TransferState` to reuse server-fetched payloads on hydration.
- Runtime API contract parsers validate API responses and protect the app from shape drift.
- Browser-only side effects are gated by platform checks (`isPlatformBrowser`).

## API Contract Layer

Schedule API responses are parsed/validated in:

- `src/app/features/schedule/data-access/models/schedule-api.contract.ts`

This keeps runtime checks close to the domain model and avoids silent type mismatch regressions.

## Testing Strategy

- Unit tests for services/effects/reducers/selectors and API contracts (`pnpm test`)
- Smoke SSR e2e with Cypress (`pnpm e2e`) against built server
- CI pipeline runs:
  - lint
  - tests
  - build
  - SSR smoke e2e

## Operational Notes

- Package manager: `pnpm`
- Local dev: `pnpm start`
- Production-like SSR run: `pnpm build && pnpm start:ssr`
- SSR e2e run: `pnpm build && pnpm start:ssr:e2e` (in another terminal) then `pnpm e2e`
