import {Component, EventEmitter,OnInit, Output} from '@angular/core'
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector : 'app-create-task',
  templateUrl :'./create-task.component.html',
  styleUrls : ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  inputTask='';
  inputTime='';

  // @Output() TaskCreated=new EventEmitter<Task>();


  constructor(public taskService :TaskService) { }

  ngOnInit(): void {
  }

  onCreateTask(){
    if (this.inputTask=='')return;
    this.inputTime= new Date().toString();
    const task:Task = {
      title: this.inputTask,
      dateTime:this.inputTime,
      completed:false
    };
    // this.TaskCreated.emit(task);
    this.taskService.addTasks(task);
    this.inputTask='';
  }

}
