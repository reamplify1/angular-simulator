import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersComponent } from './users/users.component';
import { HomePageComponent } from './home-page/home-page.component';

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
    path: 'posts',
    loadComponent: () => import('./features/posts/posts.component').then(m => m.PostsComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];
