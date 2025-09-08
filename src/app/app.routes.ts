import { Routes } from '@angular/router';
import {PublicLayoutComponent} from "./core/layouts/public-layout/public-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        data: {
          preload: true,
          animation: 'Home',
          seo: {
            title: 'Home | TrollySix',
            description: 'Welcome to ultimate schedule for trolleybus route number 6.',
            keywords: 'trolleybus, route 6, schedule',
          },
        },
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'schedule',
        data: {
          preload: true,
          animation: 'Home',
          seo: {
            title: 'Schedule | TrollySix',
            description: 'Ultimate schedule for trolleybus route 6.',
            keywords: 'trolleybus, route 6, schedule',
          },
        },
        loadComponent: () =>
          import('./pages/schedule/schedule.component').then((m) => m.ScheduleComponent),
      },
      {
        path: 'about',
        data: {
          preload: true,
          animation: 'About',
          seo: {
            title: 'About | TrollySix',
            description: 'Ultimate schedule for trolleybus route number 6.',
            keywords: 'trolleybus, route 6, schedule',
          },
        },
        loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
    ],
  },
  {
    path: 'sign-in',
    data: {
      preload: false,
      animation: 'Sign In',
      seo: {
        title: 'Sign In | TrollySix',
        description: 'Ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
    loadComponent: () => import('./pages/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'admin',
    data: {
      preload: false,
      animation: 'Admin',
      seo: {
        title: 'Administration | TrollySix',
        description: 'Ultimate schedule for trolleybus route number 6.',
      },
    },
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: '**',
    redirectTo: 'schedule',
    pathMatch: 'full',
  },
];
