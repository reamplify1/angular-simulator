import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];
