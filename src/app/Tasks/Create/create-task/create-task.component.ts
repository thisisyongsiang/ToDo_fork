import {Component, EventEmitter,OnInit, Output} from '@angular/core'
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { Subscription } from 'rxjs';
@Component({
  selector : 'app-create-task',
  templateUrl :'./create-task.component.html',
  styleUrls : ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  inputTask='';
  inputTime='';
  allCompleted=false;
  private taskSubscribtion: Subscription = new Subscription;
  // @Output() TaskCreated=new EventEmitter<Task>();


  constructor(public taskService :TaskService) { }

  ngOnInit(): void {
    this.taskSubscribtion=this.taskService.getTaskIsUpdatedListener()
    .subscribe((tasks:Task[])=>{
      let allcomplete=true;
      tasks.forEach(task=>{
        allcomplete=allcomplete&&task.completed;
      })
      if (tasks.length==0)allcomplete=false;
      this.allCompleted=allcomplete;
    });
  }
  ngOnDestroy(): void {
    this.taskSubscribtion.unsubscribe();
}
  onCreateTask(){
    if (this.inputTask=='')return;
    this.inputTime= new Date().toString();
    // const task:Task = {
    //   id:"null",
    //   title: this.inputTask,
    //   dateTime:this.inputTime,
    //   completed:false
    // };
    // this.TaskCreated.emit(task);
    // this.taskService.addTasks(task);
    this.taskService.addTasksTitleDateTime(this.inputTask,this.inputTime);
    this.inputTask='';
  }
  onCheckBoxChanged(){
    this.taskService.CompleteAllTask(this.allCompleted);
  }
}
