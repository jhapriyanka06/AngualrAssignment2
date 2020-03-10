import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {EmployeeModule} from './employee/employee.module';
import { EmployeeComponent } from './employee/employee.component';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found.component';
import { from } from 'rxjs';
import { RouterModule} from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { WelcomeComponent } from './Welcome.component';
import { EmployeeData } from './employee/employee-data';
@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
   EmployeeModule,
   InMemoryWebApiModule.forRoot(EmployeeData, { delay: 1000 }),
   RouterModule.forRoot([
     {path:'welcome', component:WelcomeComponent},
     {path:'', redirectTo:'welcome', pathMatch:'full'},
     {path:'**', component:PageNotFoundComponent}
   ])
  ],
  declarations: [
    AppComponent,
   EmployeeComponent,
   WelcomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
