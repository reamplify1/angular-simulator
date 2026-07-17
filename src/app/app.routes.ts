import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';
import { adminGuard } from './features/auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-page/home-page.component').then((m) => m.HomePageComponent),
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
        canActivate: [authGuard, adminGuard],
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./features/posts/posts.component').then((m) => m.PostsComponent),
        canActivate: [authGuard, adminGuard],
      },
      {
        path: 'posts/create',
        loadComponent: () =>
          import('./features/posts/post-create/post-create.component').then(
            (m) => m.PostCreateComponent,
          ),
        canActivate: [authGuard, adminGuard],
      },
      {
        path: 'posts/:id',
        loadComponent: () =>
          import('./features/posts/post-detail/post-detail.component').then(
            (m) => m.PostDetailComponent,
          ),
        canActivate: [authGuard, adminGuard],
        resolve: {
          postData: postResolver,
        },
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
