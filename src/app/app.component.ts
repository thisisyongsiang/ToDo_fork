import { Component } from '@angular/core';
import{Task} from './Tasks/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks:Task[]=[];

  onTaskCreated(task: Task){
    this.tasks.push(task);
  }
}
