import { TodoContractService } from './todo-contract.service';
import { AccountsService } from './accounts.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Web3
import { WEB3 } from './tokens';
const Web3 = require('web3');

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AccountsService,
    TodoContractService,
    {
      provide: WEB3,
      useFactory: (provider: any) =>
        new Web3(Web3.givenProvider || 'ws://localhost:7545'),
    },
  ],
})
export class EthereumModule {}
