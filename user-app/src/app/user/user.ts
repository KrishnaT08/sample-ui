export class User {

  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;

  constructor(id: string, firstName: string, lastName: string, employeeId: string, email: string){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.employeeId = employeeId;
    this.email = email;
  }

}
