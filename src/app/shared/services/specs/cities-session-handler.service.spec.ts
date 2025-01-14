import { TestBed } from '@angular/core/testing';

import { CitiesSessionHandlerService } from '../cities-session-handler.service';

describe('CitiesSessionHandlerService', () => {
  let service: CitiesSessionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesSessionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
