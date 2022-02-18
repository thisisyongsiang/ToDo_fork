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

}
