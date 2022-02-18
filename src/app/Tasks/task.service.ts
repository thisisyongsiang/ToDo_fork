import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks: Task[]=[];
  private taskIsUpdated=new Subject<Task[]>();

  //get task from server
  getTasks(){
    this.httpClient.get<{message:string,tasks: any[]}>
    ('http://localhost:3000/')
    .pipe(map(data=>{
      return data.tasks.map(task=>{
        return {
          title:task.title,
          dateTime:task.dateTime,
          completed:task.completed,
          id:task._id
        };
      });
    }))
    .subscribe((mappedData)=>{
      this.tasks=mappedData;
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
  getTaskIsUpdatedListener(){
    return this.taskIsUpdated.asObservable();
  }
  //add newly created task in server
  addTasks(task:Task){
    this.tasks.push(task);
    this.httpClient.post<{message:string}>
    ('http://localhost:3000',task)
    .subscribe((res)=>{
      this.tasks.push(task);
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
    //add newly created task in server
  addTasksTitleDateTime(taskInfo:string,dateTime:string){
    const task:Task = {id:"",title:taskInfo,dateTime:dateTime,completed:false};
    this.httpClient.post<{message:string,taskId:string}>
    ('http://localhost:3000',task)
    .subscribe((res)=>{
      console.log(res.message);
      task.id=res.taskId;
      this.tasks.push(task);
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
  //delete task from server
  DeleteTask(task:Task){
    this.httpClient.delete("http://localhost:3000/"+task.id)
    .subscribe(()=>{
      // this.tasks.forEach(x=>{console.log(x.id)});
      const updatedTaskList =this.tasks.filter(t=>t.id!==task.id);
      this.tasks=updatedTaskList;
      // this.tasks.splice(this.tasks.indexOf(task));
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
  //Update Task i.e. change status of task in server
  UpdateTask(task:Task){
    this.httpClient.put("http://localhost:3000/"+task.id,task)
    .subscribe((res)=>{
      const updatedTaskIndex=this.tasks.findIndex(t=>t.id===task.id);
      this.tasks[updatedTaskIndex]=task;
      this.taskIsUpdated.next([...this.tasks]);
    })
  }
  //if allcomplete is true, make all task completed, else make all task uncompleted
  CompleteAllTask(allComplete:boolean){
    this.httpClient.patch("http://localhost:3000",{allComplete})
    .subscribe((res)=>{
      this.tasks.forEach(task => {
        task.completed=allComplete;
      });
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
  DeleteCompletedTask(){
    console.log('ge');
    this.httpClient.delete("http://localhost:3000")
    .subscribe(()=>{
      const updatedTaskList =this.tasks.filter(t=>!t.completed);
      this.tasks=updatedTaskList;
      this.taskIsUpdated.next([...this.tasks]);
    })
  }
  constructor(private httpClient:HttpClient) { }
}
