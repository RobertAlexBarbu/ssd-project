import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrDividerComponent } from './or-divider.component';

describe('OrDividerComponent', () => {
  let component: OrDividerComponent;
  let fixture: ComponentFixture<OrDividerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrDividerComponent]
    });
    fixture = TestBed.createComponent(OrDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
