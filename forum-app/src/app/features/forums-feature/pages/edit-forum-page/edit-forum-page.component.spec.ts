import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditForumPageComponent } from './edit-forum-page.component';

describe('NewForumPageComponent', () => {
  let component: EditForumPageComponent;
  let fixture: ComponentFixture<EditForumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditForumPageComponent]
    });
    fixture = TestBed.createComponent(EditForumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
