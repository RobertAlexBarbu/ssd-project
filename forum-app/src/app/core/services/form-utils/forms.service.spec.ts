import { TestBed } from '@angular/core/testing';

import { FormUtilsService } from './form-utils.service';

describe('FormsService', () => {
  let service: FormUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
