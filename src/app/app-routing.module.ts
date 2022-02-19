import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './Tasks/Create/create-task/create-task.component';
import { AdminViewComponent } from './Admin/admin-view/admin-view.component';
const routes: Routes = [
  {path:'',component:CreateTaskComponent},
  {path:'admin',component:AdminViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
