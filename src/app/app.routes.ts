import { Routes } from '@angular/router';
import { postsResolver } from './core/resolvers/posts.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  {
    path: 'posts',
    resolve: {
      posts: postsResolver
    },
    loadComponent: () =>
      import('./components/post-grid/post-grid.component').then((c) => c.PostGridComponent),
  }
];
