import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";

export class EmployeeService {
  appuri: string = "";
  private employees: EmployeeDataModel[] = [];
  private employeesUpdated = new Subject<EmployeeDataModel[]>();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.appuri = baseurl;
  }

  getAllEmployee(): Observable<EmployeeDataModel> {
    return this.http.get<EmployeeDataModel>(this.appuri + "api/employee");
  }

  getEmployeeByID(empid: string) {
    return this.http.get<EmployeeDataModel>(this.appuri + "api/employee/" + empid);
  }

  getEmployeesUpdatedListener() {
    return this.employeesUpdated.asObservable();
  }

  addEmployee(Name: string, Address: string, Salary: number, CreateDate: Date) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const employee: EmployeeDataModel = { id: 0, name: Name, address: Address, salary: Salary, createdate: CreateDate };
    const body = JSON.stringify(employee);
    //alert(employee.name + " " + employee.address);
    this.http.post<{data: EmployeeDataModel}>(this.appuri + "api/employee", employee, {headers})
      .subscribe((responseData) => {
        employee.id = responseData.data.id;
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
      });
  }

  updateEmployee(id: number, Name: string, Address: string, Salary: number, CreateDate: Date) {
    const employee: EmployeeDataModel = { id: id, name: Name, address: Address, salary: Salary, createdate: CreateDate };
    this.http.put(this.appuri + "api/employee/" + id, employee).subscribe(response => {
      const updatedEmployee = [...this.employees];
      const oldEmployeeIndex = updatedEmployee.findIndex(e => e.id === employee.id);
      updatedEmployee[oldEmployeeIndex] = employee;
      this.employees = updatedEmployee;
      this.employeesUpdated.next([...this.employees]);
    });
  }

  deleteEmployee(empID: string) {
    this.http.delete(this.appuri + "api/employee/" + empID)
      .subscribe(() => {
        const updatedEmployees = this.employees.filter(employee => employee.id !== Number.parseInt(empID));
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
        alert("Sikeres törlés");
        window.location.reload();
      });
  }

}

export class EmployeeDataModel {
  id: number;
  name: string;
  address: string;
  salary: number;
  createdate: Date;
}
