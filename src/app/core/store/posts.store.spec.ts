import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PostsStore, PostsStoreInstance } from './posts.store';
import { PostsService } from '../services/posts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../models/post.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('PostsStore', () => {
  let store: PostsStoreInstance;
  let postsServiceMock: jasmine.SpyObj<PostsService>;
  let snackbarMock: jasmine.SpyObj<MatSnackBar>;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
  ];

  beforeEach(() => {
    postsServiceMock = jasmine.createSpyObj<PostsService>('PostsService', ['fetchPosts']);
    snackbarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: PostsService, useValue: postsServiceMock },
        { provide: MatSnackBar, useValue: snackbarMock },
        PostsStore,
      ],
    });

    store = TestBed.inject(PostsStore);
  });

  it('should initialize with default state', () => {
    expect(store.posts()).toEqual([]);
    expect(store.isLoading()).toBeFalse();
    expect(store.activePostId()).toBeNull();
    expect(store.activePropertyIndex()).toBe(0);
  });

  describe('activePostId', () => {
    it('should set activePostId and reset activePropertyIndex on setActivePost', () => {
      store.setActivePost(10);
      expect(store.activePostId()).toBe(10);
      expect(store.activePropertyIndex()).toBe(0);
    });
  })

  describe('nextProperty', () => {
    it('should increment activePropertyIndex modulo 4', () => {
      store.nextProperty();
      expect(store.activePropertyIndex()).toBe(1);
      store.nextProperty();
      store.nextProperty();
      store.nextProperty();
      expect(store.activePropertyIndex()).toBe(0);
    });
  })

  describe('resetActivePost', () => {
    it('should reset activePostId and activePropertyIndex on resetActivePost', () => {
      store.setActivePost(5);
      store.nextProperty();
      store.resetActivePost();
      expect(store.activePostId()).toBeNull();
      expect(store.activePropertyIndex()).toBe(0);
    });
  })

  describe('loadPosts', () => {
    it('should load posts successfully and update state', fakeAsync(() => {
      postsServiceMock.fetchPosts.and.returnValue(of(mockPosts));

      store.loadPosts();

      expect(store.posts()).toEqual(mockPosts);
      expect(store.isLoading()).toBeFalse();
    }));

    it('should handle error when loading posts and show snackbar', (done) => {
      const error = new HttpErrorResponse({ error: 'error', status: 500 });
      const expectedMessage = 'Error loading posts: ' + error.message;
      postsServiceMock.fetchPosts.and.returnValue(throwError(() => error));

      store.loadPosts();

      setTimeout(() => {
        expect(snackbarMock.open).toHaveBeenCalledWith(
          expectedMessage,
          undefined,
          jasmine.any(Object)
        );
        expect(store.isLoading()).toBeFalse();
        done();
      });
    });
  })
});
