import { TestBed } from '@angular/core/testing';

import { EventDetailsStoreService } from './event-details-store.service';

describe('EventDetailsStoreService', () => {
  let service: EventDetailsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDetailsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
