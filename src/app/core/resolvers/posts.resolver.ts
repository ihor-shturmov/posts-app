import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PostsFacade } from '../facades/posts.facade';

export const postsResolver: ResolveFn<void> = (route, state) => {
  inject(PostsFacade).fetchPosts();
};
