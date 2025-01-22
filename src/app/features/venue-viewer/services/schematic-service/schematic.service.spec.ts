import { TestBed } from '@angular/core/testing';

import { SchematicService } from './schematic.service';

describe('SchematicService', () => {
  let service: SchematicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchematicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
