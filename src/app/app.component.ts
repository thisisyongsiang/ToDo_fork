import { Component, OnInit } from '@angular/core';
import{Task} from './Tasks/task.model';
import { v4 as uuid } from 'uuid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowser } from '@angular/platform-browser';
import { TaskService } from './Tasks/task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  constructor(public taskService:TaskService){
  }

  //find or set username in cookie
  ngOnInit(): void {
    let username = document.cookie.split('; ')
    .find(item=>item.startsWith('username=')
    );
    if(username)username = username.split('=')[1];
    else{
      username = uuid();
      document.cookie='username='+username;
    }
    this.taskService.user=username;
  }
}
