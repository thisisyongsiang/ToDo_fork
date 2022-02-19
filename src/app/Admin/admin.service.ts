import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User}from'./user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
const apiUrl=environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private users:User[]=[];
  constructor(private httpClient:HttpClient) { }

  getUsersStats():Observable<User[]>{
    return this.httpClient.get<User[]>(apiUrl+'admin/users');
  }
}
