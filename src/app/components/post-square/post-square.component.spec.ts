import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSquareComponent } from './post-square.component';

describe('PostSquareComponent', () => {
  let component: PostSquareComponent;
  let fixture: ComponentFixture<PostSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
