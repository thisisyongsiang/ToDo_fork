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
  public user='';
  //get task from server
  getTasks(){
    this.httpClient.get<Task[]>
    ('http://localhost:3000/'+this.user)
    .pipe(map(res=>{
      return res.map(task=>{
        return{
          title:task.title,
          dateTime:task.dateTime,
          completed:task.completed,
          id:task.id
        }
      })
    }))
    .subscribe(data=>{
      this.tasks=data;
      this.taskIsUpdated.next([...this.tasks]);
    })
  }
  getTaskIsUpdatedListener(){
    return this.taskIsUpdated.asObservable();
  }
  //add newly created task in server
  addTasks(task:Task){
    this.tasks.push(task);
    this.httpClient.post<{message:string}>
    ('http://localhost:3000/'+this.user,task)
    .subscribe((res)=>{
      this.tasks.push(task);
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
    //add newly created task in server
  addTasksTitleDateTime(taskInfo:string,dateTime:string){
    const task:Task = {id:"",title:taskInfo,dateTime:dateTime,completed:false};
    this.httpClient.post<{id:string}>
    ('http://localhost:3000/'+this.user,task)
    .subscribe((res)=>{
      task.id=res.id;
      this.tasks.push(task);
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
  //delete task from server
  DeleteTask(task:Task){
    this.httpClient.delete("http://localhost:3000/"+this.user+'/'+task.id)
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
    this.httpClient.patch("http://localhost:3000/"+this.user+'/'+task.id,task)
    .subscribe((res)=>{
      const updatedTaskIndex=this.tasks.findIndex(t=>t.id===task.id);
      this.tasks[updatedTaskIndex]=task;
      this.taskIsUpdated.next([...this.tasks]);
    })
  }
  //if allcomplete is true, make all task completed, else make all task uncompleted
  CompleteAllTask(allComplete:boolean){
    this.httpClient.patch("http://localhost:3000/"+this.user+"/completed",
    {allComplete})
    .subscribe((res)=>{
      this.tasks.forEach(task => {
        task.completed=allComplete;
      });
      this.taskIsUpdated.next([...this.tasks]);
    });
  }
  DeleteCompletedTask(){

    console.log('deleting');
    this.httpClient.delete("http://localhost:3000/"+this.user+"/task/completed")
    .subscribe(()=>{
      const updatedTaskList =this.tasks.filter(t=>!t.completed);
      this.tasks=updatedTaskList;
      this.taskIsUpdated.next([...this.tasks]);
    })
  }
  constructor(private httpClient:HttpClient) { }
}
