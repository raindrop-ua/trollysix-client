# TrollySix 

![CI](https://github.com/raindrop-ua/trollysix-client/actions/workflows/ci.yml/badge.svg)
![Commits](https://img.shields.io/badge/commits-conventional-brightgreen)
![License](https://img.shields.io/badge/license-proprietary-red)
![Angular](https://img.shields.io/badge/angular-22-brightgreen)
![Build](https://img.shields.io/github/actions/workflow/status/raindrop-ua/trollysix-client/ci.yml?branch=main)

![Preview](docs/splash@2x.png)

Timetable for trolleybus route in the city of Dnipro.
The route connects the charming residential area of Pridniprovsky, locally referred to simply as Pridniprovsk, with the city center.

## Live

[🔗 Try it on trolly6.com](https://trolly6.com)

## Backend

[🔗 trollysix-server](https://github.com/raindrop-ua/trollysix-server)

## Run frontend locally

```bash
git clone https://github.com/raindrop-ua/trollysix-client.git
cd trollysix-client
pnpm install
pnpm start
```

## SSR Cypress smoke tests

```bash
pnpm build
pnpm start:ssr:e2e
pnpm e2e
```

## Engineering Docs

- [Architecture](./ARCHITECTURE.md)
- [Contributing](./CONTRIBUTING.md)

---

Made with ❤️ by [Anton Sizov](https://antonsizov.com)
