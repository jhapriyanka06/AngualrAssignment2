import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Employee } from './employee.model';

export class EmployeeData implements InMemoryDbService {

  createDb() {
    const employee: Employee[] = [
      {
        id:1,
        firstname:"Priyanka",
        lastname:"Jha",
        mail:"jha68974@gmail.com",
        address:"jharkhand",
        contact:987654321,
        experience:"Fresher",
        gender:"female",
        qulaification:"UG",
        username:"pjha",
        pwd:"1234",
        Coding:"Java"

      },
      {
        id:2,
        firstname:"Sweta",
        lastname:"Kumari",
        mail:"Sweta974@gmail.com",
        address:"jharkhand",
        contact:123456789,
        experience:"Fresher",
        gender:"female",
        qulaification:"UG",
        username:"skri",
        pwd:"123",
        Coding:"Python"

      },
      {
        id:3,
        firstname:"Shusnavi",
        lastname:"Gupta",
        mail:"shus1625@gmail.com",
        address:"Bihar",
        contact:98789321,
        experience:"1-2 years",
        gender:"female",
        qulaification:"PG",
        username:"shush",
        pwd:"1234",
        Coding:"C#"

      }
    ];
    return { employee };
  }
}
