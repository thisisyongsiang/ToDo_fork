import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit ,OnDestroy {
  // @Input() taskList:Task[]=[];
  taskList:Task[]=[];
  private taskSubscribtion: Subscription = new Subscription;
  isSelected=false;
  taskStatus="taskNotCompleted";
  numberNonCompletedTask =0;

  constructor(public taskService:TaskService) {

   }

  onClick(task:Task){
      task.completed= !task.completed;
      this.taskService.EditTask(task);
      this.GetNumberOfTasksLeft()
   }
  ngOnInit(): void {
    this.taskList=this.taskService.getTasks();
    this.GetNumberOfTasksLeft()
    this.taskSubscribtion=this.taskService.getTaskIsUpdatedListener()
    .subscribe((tasks:Task[])=>{
      this.taskList=tasks;
      this.numberNonCompletedTask++;
    });
  }
  ngOnDestroy(): void {
      this.taskSubscribtion.unsubscribe();
  }
  DeleteTask(task:Task){
      this.taskService.DeleteTask(task);
  }
  private GetNumberOfTasksLeft():void{
    this.numberNonCompletedTask=0;
      this.taskList.forEach(element => {
        if(!element.completed)this.numberNonCompletedTask+=1;
      });
  }
}
