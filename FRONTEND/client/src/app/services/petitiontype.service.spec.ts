import { TestBed } from '@angular/core/testing';

import { PetitionTypeService } from './petitiontype.service';

describe('PetitionTypeService', () => {
  let service: PetitionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
