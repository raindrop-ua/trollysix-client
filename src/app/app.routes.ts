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
        path: 'privacy',
        loadChildren: () => import('./features/privacy/feature/privacy.routes'),
      },
      {
        path: 'terms',
        loadChildren: () => import('./features/terms/feature/terms.routes'),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  // {
  //   path: 'admin',
  //   data: {
  //     preload: false,
  //     animation: 'Admin',
  //     seo: {
  //       title: 'Administration | TrollySix',
  //       description: 'Ultimate schedule for trolleybus route number 6.',
  //     },
  //   },
  //   loadComponent: () =>
  //     import('./features/admin/admin.component').then((m) => m.AdminComponent),
  // },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
