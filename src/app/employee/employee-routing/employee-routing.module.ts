import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';

const routes: Routes = [
  {path:"employee", canActivate:[CanActivateGuardService], data: {expectedRole: "Employee"}, children: [
    {path:"task", component: TasksComponent},
  ]},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
