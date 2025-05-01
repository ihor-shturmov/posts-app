import { Component, inject } from '@angular/core';
import { PostsFacade } from '../../core/facades/posts.facade';
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

  onSquareClicked(postId: number): void {
    if (this.facade.activePostId() !== postId) {
      this.facade.postClicked(postId);
    } else {
      this.facade.changeProperty();
    }
  }
}
