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
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
