import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../core/layouts/auth-layout/auth-layout.component';

export default [
  {
    path: '',
    component: AuthLayoutComponent,
    data: {
      preload: true,
      animation: 'Authorization',
      seo: {
        title: 'Authorization | TrollySix',
        description:
          'Welcome to ultimate schedule for trolleybus route number 6.',
        keywords: 'trolleybus, route 6, schedule',
      },
    },
    children: [
      {
        path: 'sign-in',
        data: {
          preload: false,
          animation: 'SignIn',
          seo: {
            title: 'Sign In | TrollySix',
            description: 'Ultimate schedule for trolleybus route number 6.',
            keywords: 'trolleybus, route 6, schedule',
          },
        },
        loadComponent: () =>
          import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
      {
        path: 'sign-up',
        data: {
          preload: false,
          animation: 'SignUp',
          seo: {
            title: 'Sign Up | TrollySix',
            description: 'Ultimate schedule for trolleybus route number 6.',
            keywords: 'trolleybus, route 6, schedule',
          },
        },
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      {
        path: '**',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full',
      },
    ],
  },
] satisfies Routes;
