import { TestBed } from '@angular/core/testing';

import { TotalOrdenesService } from './total-ordenes.service';

describe('TotalOrdenesService', () => {
  let service: TotalOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
