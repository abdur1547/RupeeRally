import { Routes } from '@angular/router';
import { BlankLayout } from './layouts/blank/blank.component';
import { DefaultLayout } from './layouts/default/full.component';

const defaultLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.PagesRoutes),
  },
  {
    path: 'ui-components',
    loadChildren: () =>
      import('./pages/ui-components/ui-components.routes').then(
        (m) => m.UiComponentsRoutes
      ),
  },
  {
    path: 'extra',
    loadChildren: () =>
      import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
  },
];

const blankLayoutRoutes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.routes').then(
        (m) => m.AuthenticationRoutes
      ),
  },
];

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [...defaultLayoutRoutes],
  },
  {
    path: '',
    component: BlankLayout,
    children: [...blankLayoutRoutes],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
