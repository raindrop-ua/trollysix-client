import { join } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

function readNonNegativeIntEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

const ssrCacheConfig = {
  schedule: {
    maxAge: readNonNegativeIntEnv('SSR_CACHE_SCHEDULE_MAX_AGE', 30),
    staleWhileRevalidate: readNonNegativeIntEnv('SSR_CACHE_SCHEDULE_SWR', 60),
  },
  default: {
    maxAge: readNonNegativeIntEnv('SSR_CACHE_DEFAULT_MAX_AGE', 300),
    staleWhileRevalidate: readNonNegativeIntEnv('SSR_CACHE_DEFAULT_SWR', 600),
  },
};

function getSsrCacheControl(pathname: string): string {
  if (pathname.startsWith('/schedule')) {
    return `public, max-age=${ssrCacheConfig.schedule.maxAge}, stale-while-revalidate=${ssrCacheConfig.schedule.staleWhileRevalidate}`;
  }

  return `public, max-age=${ssrCacheConfig.default.maxAge}, stale-while-revalidate=${ssrCacheConfig.default.staleWhileRevalidate}`;
}

function withSsrCacheHeaders(req: express.Request, response: Response): Response {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const headers = new Headers(response.headers);
  if (!headers.has('Cache-Control')) {
    headers.set('Cache-Control', getSsrCacheControl(req.path));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (!response) {
        next();
        return;
      }

      writeResponseToNodeResponse(withSsrCacheHeaders(req, response), res);
    })
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4500;
  const host = process.env['HOST'] ?? '0.0.0.0';
  app.listen(Number(port), host, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
