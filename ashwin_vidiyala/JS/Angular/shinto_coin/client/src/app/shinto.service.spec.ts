import { TestBed, inject } from '@angular/core/testing';

import { ShintoService } from './shinto.service';

describe('ShintoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShintoService]
    });
  });

  it('should be created', inject([ShintoService], (service: ShintoService) => {
    expect(service).toBeTruthy();
  }));
});
