import { TestBed } from '@angular/core/testing';

import { ServTiendaService } from './serv-tienda.service';

describe('ServTiendaService', () => {
  let service: ServTiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServTiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
