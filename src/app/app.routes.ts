import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { UsersComponent } from './users/users.component';
import { HomePageComponent } from './home-page/home-page.component';
import { postResolver } from './features/posts/post.resolver';
import { PostsComponent } from './features/posts/posts.component';

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
    loadComponent: () => import('./features/posts/posts.component').then(m => m.PostsComponent),
    children: [
      {
        path: 'create',
        loadComponent: () => import('./features/posts/post-create/post-create.component').then(m => m.PostCreateComponent)
      },
    ]
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
    resolve: {
      postData: postResolver,
    },
  },
  {
    path: '**',
    loadComponent: () => import('./not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];
