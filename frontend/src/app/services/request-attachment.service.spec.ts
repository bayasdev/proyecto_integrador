import { TestBed } from '@angular/core/testing';

import { RequestAttachmentService } from './request-attachment.service';

describe('RequestAttachmentService', () => {
  let service: RequestAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
