import { Component, OnInit } from '@angular/core';
import { EmployeeDataModel, EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public emplist: EmployeeDataModel;

  constructor(private serviceEmployee: EmployeeService) {
    this.getAllEmployee();
  }

  ngOnInit() {
  }

  getAllEmployee() {
    this.serviceEmployee.getAllEmployee()
      .subscribe(data => this.emplist = data);
  }

  deleteEmployee(empID: string) {
    this.serviceEmployee.deleteEmployee(empID);
  }

}
