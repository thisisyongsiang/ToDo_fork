import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[]=[];
  private taskIsUpdated=new Subject<Task[]>();

  //get task from server
  getTasks(){
    return [...this.tasks];
  }
  getTaskIsUpdatedListener(){
    return this.taskIsUpdated.asObservable();
  }
  //add newly created task
  addTasks(task:Task){
    this.tasks.push(task);
    this.taskIsUpdated.next([...this.tasks]);
  }
  addTasksTitleDateTime(title:string,dateTime:string){
    const task:Task = {title:title,dateTime:dateTime,completed:false};
    this.tasks.push(task);
    this.taskIsUpdated.next([...this.tasks]);
  }
  //delete task from server
  DeleteTask(task:Task){

  }
  //Edit Task i.e. change status of task in server
  EditTask(task:Task){

  }

  constructor() { }
}
