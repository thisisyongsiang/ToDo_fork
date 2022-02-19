import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AdminService } from '../admin.service';
import { User } from '../user.model';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  overallData={numberOfUsers:0,
  totalTasksCreated:0,
  totalTasksDeleted:0};
  users:User[]=[];
  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsersStats()
    .subscribe(users=>{
      this.users=[...users.map<User>(user=>{
        return {
          user:user.user,
          created:user.created,
          deleted:user.deleted
        }
      })]
      this.getOverallData();
    })
  }
  private getOverallData():void{
    this.overallData.numberOfUsers=this.users.length;
    let totalTasksCreated=0;
    let totalTasksDeleted=0;
    this.users.forEach(elem=>{
      totalTasksCreated+=elem.created;
      totalTasksDeleted+=elem.deleted;
    })
    this.overallData.totalTasksCreated=totalTasksCreated;
    this.overallData.totalTasksDeleted=totalTasksDeleted;
  }
}
