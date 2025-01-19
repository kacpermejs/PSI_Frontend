import { TestBed } from '@angular/core/testing';

import { ClientEventService } from './client-event.service';

describe('ClientEventService', () => {
  let service: ClientEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
