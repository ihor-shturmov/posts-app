import { inject, Injectable, Signal } from '@angular/core';
import { PostsStore } from '../store/posts.store';
import { Posts } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsFacade {
  private readonly store = inject(PostsStore);

  readonly posts: Signal<Posts> = this.store.posts;
  readonly activePostId: Signal<number | null> = this.store.activePostId;
  readonly activePropertyIndex: Signal<number> = this.store.activePropertyIndex;

  fetchPosts(): void {
    this.store.loadPosts();
  }

  postClicked(id: number): void {
    this.store.setActivePost(id);
  }
}
