import { Component, computed, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-post-square',
  imports: [],
  template: `
    <div class="square-content" (click)="squareClicked.emit(post().id)">
      {{ displayValue() }}
    </div>
  `,
  styleUrl: './post-square.component.scss'
})
export class PostSquareComponent {
  post: InputSignal<Post> = input.required<Post>();
  isActive: InputSignal<boolean> = input(false);
  activePropertyIndex: InputSignal<number> = input(0);

  squareClicked: OutputEmitterRef<number> = output();

  displayValue = computed(() => {
    const props: (keyof Post)[] = ['title', 'userId', 'id', 'body'];
    return this.isActive() ? this.post()[props[this.activePropertyIndex()]] : this.post().title;
  });
}
