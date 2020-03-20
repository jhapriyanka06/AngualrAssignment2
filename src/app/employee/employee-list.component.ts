import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from './employee.model';
import {ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pageTitle="Employee Details";
  errorMessage:string;
  employeedetails:Employee[]=[];
  employee:Employee[];
  employees:Employee;

    constructor(private employeeService: EmployeeService,
      private route:ActivatedRoute,
      private router:Router) { }

    ngOnInit(): void {
      const id=+this.route.snapshot.paramMap.get('id');

      this.employeeService.getEmployees().subscribe({
        next: employee => {
          this.employee = employee;
          this.employeedetails = this.employee;
        },
       });
   }


   deleteEmployee(employee:Employee): void {

    if (employee.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the employee: ${employee.firstname}?`)) {
        this.employeeService.deleteEmployee(employee.id).subscribe({

          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
      }
    }
  }
    onSaveComplete(): void {

   this.employeeService.getEmployees().subscribe({
    next: employee => {
      this.employee = employee;
      this.employeedetails = this.employee;
    },
   });

  }
 }
