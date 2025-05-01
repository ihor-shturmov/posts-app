import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        }
      ],
    });

    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchPosts', () => {
    it('should call the method with appropriate params', () => {
      service.fetchPosts();

      expect(httpClientSpy.get).toHaveBeenCalledOnceWith('https://jsonplaceholder.typicode.com/posts');
    });
  });
});
