import { TestBed } from '@angular/core/testing';

import { TicTacGameServiceService } from './tic-tac-game-service.service';

describe('TicTacGameServiceService', () => {
  let service: TicTacGameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicTacGameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
