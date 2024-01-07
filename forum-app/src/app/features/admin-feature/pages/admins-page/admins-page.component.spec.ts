import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsPageComponent } from './admins-page.component';

describe('AdminsPageComponent', () => {
  let component: AdminsPageComponent;
  let fixture: ComponentFixture<AdminsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminsPageComponent]
    });
    fixture = TestBed.createComponent(AdminsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
