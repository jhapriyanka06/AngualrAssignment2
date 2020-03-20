import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../data/employee.service';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  Qualifiacation:Observable<string[]>;
  Experiences:Observable<string[]>;
  Codes:Observable<string[]>;
  employee:Employee;
  pageTitle="Edit Page"
  messageService: any;
  errorMessage:string;

  constructor(private dataservice:EmployeeService,
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.Qualifiacation=this.dataservice.getQualifications();
    this.Experiences=this.dataservice.getExperiences();
    this.Codes=this.dataservice.getCodes();
    const id=+this.route.snapshot.paramMap.get('id');
    this.getEmp(id);
  }
  onSubmit(form: NgForm){
    console.log(form.value);

  }
  getEmp(id:number):void{
    this.dataservice.getEmp(id).subscribe({
         next:employee  => this.onEmployeeRetrieved(employee),
         error:err => this.errorMessage=err
    });
}
  onEmployeeRetrieved(employee: Employee): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = 'No Employee found';
    } else {
      if (this.employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${this.employee.firstname}-${this.employee.lastname}`;
      }
    }
  }

  saveProduct(): void {
    if(true === true){
      if (this.employee.id === 0) {
        this.dataservice.createEmployee(this.employee).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      } else {
        this.dataservice.updateEmployee(this.employee).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    }
  }
  onSaveComplete(): void {
   /* if (message) {
      this.messageService.addMessage(message);
   }*/
   this.router.navigate(['/employee']);
  }

}

