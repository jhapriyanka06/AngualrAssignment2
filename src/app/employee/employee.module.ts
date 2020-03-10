import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'employee',component:EmployeeListComponent},
      {path:'employee/:id/edit', component:EmployeeComponent},
      {path:'employee/:id/delete',component:EmployeeComponent}
    ])
  ],
  declarations: [
    EmployeeListComponent
  ]
})
export class EmployeeModule { }
