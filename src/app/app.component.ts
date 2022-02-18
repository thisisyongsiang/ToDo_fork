import { Component } from '@angular/core';
import{Task} from './Tasks/task.model';
import { v4 as uuid } from 'uuid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowser } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(): void {
    if(!document.cookie){
      document.cookie="username = "+uuid();
      console.log('set cookie');
    }
    console.log(document.cookie);
    console.log('which cookie');

    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
