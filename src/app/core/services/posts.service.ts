import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Posts } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  fetchPosts(): Observable<Posts> {
    return this.http.get<Posts>(this.apiUrl);
  }
}
