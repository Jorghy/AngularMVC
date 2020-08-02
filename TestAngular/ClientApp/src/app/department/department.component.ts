import { Component, OnInit } from '@angular/core';
import { DepartmentDataModel, DepartmentService } from '../../Services/department.service';
import { EmployeeDataModel } from '../../Services/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public departlist: DepartmentDataModel;
  public leader: EmployeeDataModel;

  constructor(private serviceDepartment: DepartmentService) {
    this.getAllDepartment();
  }

  ngOnInit() {
  }

  getAllDepartment() {
    this.serviceDepartment.getAllDepartment()
      .subscribe(data => this.departlist = data);
  }

  deleteDepartment(depID: string) {
    this.serviceDepartment.deleteDepartment(depID);
  }
}
