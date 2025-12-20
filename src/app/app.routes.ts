import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { AppRouteEnum } from './core/enums/app-route.enum';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: AppRouteEnum.Home,
        loadChildren: () => import('./features/home/feature/home.routes'),
      },
      {
        path: AppRouteEnum.Schedule,
        loadChildren: () =>
          import('./features/schedule/feature/schedule.routes'),
      },
      {
        path: AppRouteEnum.About,
        loadChildren: () => import('./features/about/feature/about.routes'),
      },
      {
        path: AppRouteEnum.Settings,
        loadChildren: () =>
          import('./features/settings/feature/settings.routes'),
      },
      {
        path: AppRouteEnum.PrivacyPolicy,
        loadChildren: () =>
          import('./features/static/privacy-policy/feature/privacy-policy.routes'),
      },
      {
        path: AppRouteEnum.TermsOfUse,
        loadChildren: () =>
          import('./features/static/terms-of-use/feature/terms-of-use.routes'),
      },
      {
        path: AppRouteEnum.NotFound,
        loadChildren: () =>
          import('./features/static/not-found/feature/not-found.routes'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRouteEnum.NotFound,
    pathMatch: 'full',
  },
];
