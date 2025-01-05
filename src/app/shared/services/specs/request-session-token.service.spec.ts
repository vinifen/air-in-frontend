import { TestBed } from '@angular/core/testing';

import { RequestSessionTokenService } from './request-session-token.service';

describe('RequestSessionTokenService', () => {
  let service: RequestSessionTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestSessionTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
