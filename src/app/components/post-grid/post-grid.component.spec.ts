import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGridComponent } from './post-grid.component';
import { PostsFacade } from '../../core/facades/posts.facade';
import { signal, WritableSignal } from '@angular/core';
import { Post, Posts } from '../../core/models/post.model';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PostGridComponent', () => {
  let component: PostGridComponent;
  let fixture: ComponentFixture<PostGridComponent>;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
  ];

  const posts = signal<Posts>(mockPosts);
  const activePostId: WritableSignal<number | null> = signal(null);
  const activePropertyIndex = signal(0);

  let facade: jasmine.SpyObj<PostsFacade> = jasmine.createSpyObj<PostsFacade>('PostsFacade', [
    'fetchPosts',
    'postClicked',
    'changeProperty',
  ], {
    posts,
    activePostId,
    activePropertyIndex,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostGridComponent],
      providers: [{ provide: PostsFacade, useValue: facade }, provideAnimations()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSquareClicked', () => {
    it('should call postClicked when clicked post is different from active', () => {
      activePostId.set(2);
      component.onSquareClicked(1);
      expect(facade.postClicked).toHaveBeenCalledWith(1);
    });

    it('should call changeProperty when clicked post is same as active', () => {
      activePostId.set(1);
      component.onSquareClicked(1);
      expect(facade.changeProperty).toHaveBeenCalled();
    });
  });
});
