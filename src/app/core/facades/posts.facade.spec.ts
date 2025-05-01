import { TestBed } from '@angular/core/testing';
import { PostsFacade } from './posts.facade';
import { PostsStore, PostsStoreInstance } from '../store/posts.store';
import { Signal, signal } from '@angular/core';
import { Posts } from '../models/post.model';

describe('PostsFacade', () => {
  let facade: PostsFacade;
  let storeMock: jasmine.SpyObj<PostsStoreInstance>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<PostsStoreInstance>('PostsStore', [
      'loadPosts',
      'setActivePost',
      'nextProperty',
    ], {
      posts: signal([]) as Signal<Posts>,
      activePostId: signal(null),
      activePropertyIndex: signal(0),
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: PostsStore, useValue: storeMock },
        PostsFacade,
      ],
    });

    facade = TestBed.inject(PostsFacade);
  });

  it('should expose signals from store', () => {
    expect(facade.posts()).toEqual([]);
    expect(facade.activePostId()).toBeNull();
    expect(facade.activePropertyIndex()).toBe(0);
  });

  it('should delegate fetchPosts to store.loadPosts', () => {
    facade.fetchPosts();
    expect(storeMock.loadPosts).toHaveBeenCalled();
  });

  it('should delegate postClicked to store.setActivePost', () => {
    facade.postClicked(7);
    expect(storeMock.setActivePost).toHaveBeenCalledWith(7);
  });

  it('should delegate changeProperty to store.nextProperty', () => {
    facade.changeProperty();
    expect(storeMock.nextProperty).toHaveBeenCalled();
  });
});
