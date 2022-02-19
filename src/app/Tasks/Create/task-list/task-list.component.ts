import { Component, OnInit,Input, OnDestroy,ViewChild, ElementRef} from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit ,OnDestroy {

  private taskSubscribtion: Subscription = new Subscription;
  @ViewChild("editTask") editTask!: ElementRef;

  taskList:Task[]=[];
  taskListToDisplay:Task[]=[];
  taskStatus=false;
  numberNonCompletedTask =0;
  taskToEdit:Task={} as Task;
  taskTitleToEdit="";
  numberOfCompleted=0;
  displayFilter="all";

  constructor(public taskService:TaskService) {

   }


  // onClick(task:Task){
  //     task.completed= !task.completed;
  //     this.taskService.UpdateTask(task);
  //  }
   onTaskStatusChange(task:Task){
    this.taskService.UpdateTask(task);
   }
  ngOnInit(): void {
    this.taskService.getTasks();
    this.GetNumberOfTasksLeft()
    this.taskSubscribtion=this.taskService.getTaskIsUpdatedListener()
    .subscribe((tasks:Task[])=>{
      this.taskList=tasks;
      this.getDisplayList();
      this.GetNumberOfTasksLeft();
    });
  }
  ngOnDestroy(): void {
      this.taskSubscribtion.unsubscribe();
  }
  DeleteTask(task:Task){
      this.taskService.DeleteTask(task);
  }
  //on double click, change template displayed. and give focus to input template
  onDoubleClick(task:Task){
    this.taskToEdit=task;
    this.taskTitleToEdit=task.title;
  }
  onInputBlur(){
    this.taskToEdit={} as Task;
  }
  onEnterEdit(){
    this.taskToEdit.title=this.taskTitleToEdit;
    this.taskService.UpdateTask(this.taskToEdit);
    this.taskToEdit={} as Task;
  }
  onClearCompleted(){
    this.taskService.DeleteCompletedTask();
  }
  onDisplayFilterChange(){
    console.log(this.displayFilter);
    this.getDisplayList();
  }
  //method to get number of tasks left
  private GetNumberOfTasksLeft():void{
    this.numberNonCompletedTask=0;
      this.taskList.forEach(element => {
        if(!element.completed)this.numberNonCompletedTask+=1;
      });
      this.numberOfCompleted=this.taskList.length-this.numberNonCompletedTask;
  }
  private getDisplayList(){
    if(this.displayFilter==='all'){
      this.taskListToDisplay=this.taskList;
    }
    else if(this.displayFilter==='active'){
      this.taskListToDisplay=this.taskList.filter(task=>!task.completed);
    }
    else if(this.displayFilter==='completed'){
      this.taskListToDisplay=this.taskList.filter(task=>task.completed);
    }
  }
  //this is called everytime view is changed

  ngAfterViewChecked(){
    //this ensures that the edit task input box is in focus when created
    if(this.editTask){
      this.editTask.nativeElement.focus();
    }
  }

}
