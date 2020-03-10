import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from './employee.model';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pageTitle="Employee Details";
  errorMessage:string;
  employeedetails:Employee[]=[];
  employee:Employee[];

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

 }
