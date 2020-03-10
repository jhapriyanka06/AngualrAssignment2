import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../employee/employee.model';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl='app/employee';
  employee:Employee;
  constructor( private http:HttpClient) { }

  getQualifications():Observable<string[]>{
    return of (['10th','12th','UG','PG']);
  }
  getExperiences():Observable<string[]>{
    return of (['Fresher','1-2 years','3 years', '>3 years']);
  }
  getCodes():Observable<string[]>{
    return of (['C,C++','JAVA','C#','PHP','Python']);
  }
  getEmp(id: number): Observable<Employee> {
    if (id === 0) {
      return of(this.initializeEmployee());
    }
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        tap(data => console.log('getEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    employee.id = null;
    return this.http.post<Employee>(this.employeeUrl,employee, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + employee.id)),
        // Return the product on an update
        map(() => employee),
        catchError(this.handleError)
      );
  }
  deleteEmployee(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete<Employee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }



  private initializeEmployee(): Employee {
    // Return an initialized object
    return {
      id: 0,
      firstname:null,
      lastname:null,
      mail:null,
      address:null,
      contact:null,
      experience:null,
      gender:null,
      qulaification:null,
      username:null,
      pwd:null,
      Coding:null

    };
  }

  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );

  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
