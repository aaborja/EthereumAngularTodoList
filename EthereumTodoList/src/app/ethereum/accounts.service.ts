import { WEB3 } from './tokens';
import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(@Inject(WEB3) private web3: Web3) {}

  getAccounts(): Promise<any> {
    return this.web3.eth.getAccounts();
  }

  async currentAccount(): Promise<string> {
    if (this.web3.eth.defaultAccount) {
      return this.web3.eth.defaultAccount;
    } else {
      const accounts = await this.web3.eth.getAccounts();
      this.web3.eth.defaultAccount = accounts[0];
      return accounts[0];
    }
  }
}
