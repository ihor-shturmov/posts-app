import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postsResolver } from './posts.resolver';
import { PostsFacade } from '../facades/posts.facade';

describe('postsResolver', () => {
  const executeResolver: ResolveFn<void> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => postsResolver(...resolverParameters));
  const facadeSpy = jasmine.createSpyObj<PostsFacade>('PostsFacade', ['fetchPosts']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PostsFacade, useValue: facadeSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should call fetchPosts on PostsFacade when resolved', () => {
    executeResolver(null as any, null as any);
    expect(facadeSpy.fetchPosts).toHaveBeenCalled();
  });
});
