import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/feature/home.routes'),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./features/schedule/feature/schedule.routes'),
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/feature/about.routes'),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/feature/settings.routes'),
      },
      {
        path: '404',
        loadChildren: () =>
          import('./features/static/not-found/feature/not-found.routes'),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./features/static/privacy-policy/feature/privacy-policy.routes'),
      },
      {
        path: 'terms-of-use',
        loadChildren: () =>
          import('./features/static/terms-of-use/feature/terms-of-use.routes'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full',
  },
];
