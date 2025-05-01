import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { Posts } from '../models/post.model';
import { inject, Signal } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export interface PostsState {
  posts: Posts;
  isLoading: boolean;
  activePostId: number | null;
  activePropertyIndex: number;
}

export interface PostsStoreInstance {
  posts: Signal<Posts>;
  isLoading: Signal<boolean>;
  activePostId: Signal<number | null>;
  activePropertyIndex: Signal<number>;
  setActivePost(id: number): void;
  nextProperty(): void;
  resetActivePost(): void;
  loadPosts(): void;
}

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState<PostsState>({
    posts: [],
    isLoading: false,
    activePostId: null,
    activePropertyIndex: 0,
  }),
  withProps(() => ({
    postsService: inject(PostsService),
    snackbar: inject(MatSnackBar),
  })),
  withMethods(({ postsService, snackbar, ...store }) => ({
    setActivePost: (id: number) => patchState(store, (state) => ({
      ...state,
      activePostId: id,
      activePropertyIndex: 0,
    })),
    nextProperty: () => patchState(store, (state) => ({
      ...state,
      activePropertyIndex: (state.activePropertyIndex + 1) % 4,
    })),
    resetActivePost: () => patchState(store, (state => ({ ...state, activePostId: null, activePropertyIndex: 0 }))),
    loadPosts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return postsService.fetchPosts().pipe(
            tapResponse({
              next: (posts) => patchState(store, { posts: posts ?? [] }),
              error: (error: HttpErrorResponse) => snackbar.open('Error loading posts: ' + error?.message, undefined, { duration: 5000 }),
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
