import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPageComponent } from './forum-page.component';

describe('OneForumPageComponent', () => {
  let component: ForumPageComponent;
  let fixture: ComponentFixture<ForumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForumPageComponent]
    });
    fixture = TestBed.createComponent(ForumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
