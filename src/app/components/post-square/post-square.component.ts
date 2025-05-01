import { Component, computed, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-post-square',
  imports: [],
  template: `
    <div [@fadeInOut]="displayValue()"
         class="square-content"
         [class.active]="isActive()"
         (click)="squareClicked.emit(post().id)">
      {{ displayValue() }}
    </div>
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 }))
      ]),
    ])
  ],
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
