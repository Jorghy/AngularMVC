import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeDataModel } from "./employee.service";

export class DepartmentService {
  appuri: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseurl: string) {
    this.appuri = baseurl;
  }

  getAllDepartment(): Observable<DepartmentDataModel> {
    return this.http.get<DepartmentDataModel>(this.appuri + "api/department");
  }

  getDepartmentByID(id: string) {
    return this.http.get<DepartmentDataModel>(this.appuri + "api/department/" + id);
  }

  getAllEmployee() {
    return this.http.get<EmployeeDataModel>(this.appuri + "api/employee");
  }

  addDepartment(Name: string, Leader: number) {
    const department: DepartmentDataModel = { id: 0, name: Name, leaderId: Leader };
    this.http.post<{ data: DepartmentDataModel }>(this.appuri + "api/department", department)
      .subscribe(responseData => {
        department.id = responseData.data.id;
      });
  }

  updateDepartment(id: number, Name: string, Leader: number) {
    const department: DepartmentDataModel = { id: id, name: Name, leaderId: Leader };
    this.http.put(this.appuri + "api/department/" + id, department).subscribe(response => {
      console.log(response);
    });
  }

  deleteDepartment(depID: string) {
    this.http.delete(this.appuri + "api/department/" + depID)
      .subscribe(response => {
        alert("Sikeres törlés");
        window.location.reload();
      });
  }

}

export class DepartmentDataModel {
  id: number;
  name: string;
  leaderId: number;
}
