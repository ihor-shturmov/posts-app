import { Component, computed, inject, Signal } from '@angular/core';
import { PostsFacade } from '../../core/facades/posts.facade';
import { Posts } from '../../core/models/post.model';
import { PostSquareComponent } from '../post-square/post-square.component';

@Component({
  selector: 'app-post-grid',
  imports: [
    PostSquareComponent,
  ],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss'
})
export class PostGridComponent {
  protected readonly facade: PostsFacade = inject(PostsFacade);

  rows: Signal<Posts[]> = computed(() => this.chunk(this.facade.posts(), 10));

  onSquareClicked(postId: number): void {
    if (this.facade.activePostId() !== postId) {
      this.facade.postClicked(postId);
    } else {
      this.facade.changeProperty();
    }
  }

  private chunk(arr: Posts, size: number): Posts[] {
    const result: Posts[] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}
