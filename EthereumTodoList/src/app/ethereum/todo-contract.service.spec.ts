import { TestBed } from '@angular/core/testing';

import { TodoContractService } from './todo-contract.service';

describe('TodoContractService', () => {
  let service: TodoContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
