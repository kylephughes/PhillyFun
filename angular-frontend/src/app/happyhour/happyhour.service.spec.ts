import { TestBed } from '@angular/core/testing';

import { HappyhourService } from './happyhour.service';

describe('HappyhourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HappyhourService = TestBed.get(HappyhourService);
    expect(service).toBeTruthy();
  });
});
