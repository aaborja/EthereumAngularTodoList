import { Task } from './../todo.model';
import { Injectable, Inject } from '@angular/core';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { WEB3 } from './tokens';

const tokenAbi = require('../../../build/contracts/Todo.json');

@Injectable({
  providedIn: 'root',
})
export class TodoContractService {
  private todoContract;

  constructor(@Inject(WEB3) private web3: Web3) {
    this.todoContract = TruffleContract(tokenAbi);
    this.todoContract.setProvider(this.web3.currentProvider);
  }

  async addTask(newTask: string, account: string): Promise<Task> {
    const instance = await this.todoContract.deployed();

    const createdTask = await instance.addTask(newTask, this.setFrom(account));
    const args = createdTask.logs[0].args;
    const task: Task = {
      task: args[1],
      done: args[3],
      id: args[0].toNumber(),
      dateTimeCreated: new Date(args[2].toNumber()),
    };
    return task;
  }

  async deleteTask(taskId: number, account: string): Promise<boolean> {
    const instance = await this.todoContract.deployed();

    await instance.deleteTask(taskId, this.setFrom(account));
    return true;
  }

  async markDone(taskId: string, checked: boolean, account: string) {
    const instance = await this.todoContract.deployed();

    await instance.markDone(taskId, checked, this.setFrom(account));
  }

  async getTasks(): Promise<any> {
    const tasks = [];
    const todoInstance = await this.todoContract.deployed();
    const todoCount = await todoInstance.idCount();

    for (let index = 1; index <= todoCount.toNumber(); ++index) {
      const task = await todoInstance.tasks(index);

      if (task[0].toNumber() > 0) {
        tasks.push({
          id: task[0].toNumber(),
          task: task[1],
          dateTimeCreated: new Date(task[2].toNumber()),
          done: task[3],
        });
      }
    }

    return tasks;
  }

  private setFrom(address: string): any {
    return { from: address };
  }
}
