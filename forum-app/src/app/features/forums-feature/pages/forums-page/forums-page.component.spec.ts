import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsPageComponent } from './forums-page.component';

describe('ForumsPageComponent', () => {
  let component: ForumsPageComponent;
  let fixture: ComponentFixture<ForumsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForumsPageComponent]
    });
    fixture = TestBed.createComponent(ForumsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
