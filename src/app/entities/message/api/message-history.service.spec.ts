import { TestBed } from '@angular/core/testing';

import { MessageHistoryService } from './message-history.service';

describe('MessageHistoryService', () => {
  let service: MessageHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
