import { AccountsService } from './ethereum/accounts.service';
import { TodoContractService } from './ethereum/todo-contract.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from './todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tasks: Task[];
  title = 'EthereumTodoList';
  accountNumber;

  taskForm = new FormGroup({
    task: new FormControl('', [Validators.required]),
  });

  constructor(
    private accountService: AccountsService,
    private todoContractService: TodoContractService
  ) {}

  ngOnInit(): void {
    this.taskForm.markAllAsTouched();
    this.initAccount().then(() => {
      this.getTasks();
    });
  }

  async initAccount(): Promise<void> {
    this.accountNumber = await this.accountService.currentAccount();
  }

  async getTasks(): Promise<void> {
    this.tasks = [];
    this.tasks = await this.todoContractService.getTasks();
  }

  async addTask(): Promise<void> {
    const newTask = await this.todoContractService.addTask(
      this.taskForm.get('task').value,
      this.accountNumber
    );

    if (newTask) {
      this.tasks.push(newTask);
      this.taskForm.get('task').setValue('');
    }
  }

  async deleteTask(taskId: number): Promise<void> {
    const success = await this.todoContractService.deleteTask(
      taskId,
      this.accountNumber
    );

    if (success) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
  }

  onChange(taskId: string, checked: boolean): void {
    this.todoContractService.markDone(taskId, checked, this.accountNumber);
  }
}
