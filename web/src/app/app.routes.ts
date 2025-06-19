import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/routes';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent, NotFoundPageComponent } from './pages';
import { DefaultLayoutComponent, EmptyLayoutComponent } from './layouts';

const emptyLayoutRoutes: Routes = [
  ...authRoutes,
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

const defaultLayoutRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
];

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canMatch: [authGuard],
    canActivateChild: [authGuard],
    children: [...defaultLayoutRoutes],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [...emptyLayoutRoutes],
  },
];
