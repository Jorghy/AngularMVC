import { Component, OnInit } from '@angular/core';
import { DepartmentDataModel, DepartmentService } from '../../Services/department.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeDataModel, EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  private mode = "create";
  private depID: string;
  department: DepartmentDataModel;
  title = "Create Department";
  employees: EmployeeDataModel;

  constructor(public departmentService: DepartmentService, public employeeService: EmployeeService, public route: ActivatedRoute) {
    this.getAllEmployee();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("depID")) {
        this.mode = "edit";
        this.depID = paramMap.get("depID");
        this.departmentService.getDepartmentByID(this.depID).subscribe(departmentData => {
          this.department = departmentData;
        });
        this.title = "Edit Department";
      }
      else {
        this.mode = "create";
        this.depID = null;
      }
    });
  }

  getAllEmployee() {
    this.departmentService.getAllEmployee()
      .subscribe(data => this.employees = data);
  }

  onSaveDepartment(form: NgForm) {
    if (form.invalid) {
      alert("Form is invalid!");
      return;
    }
    if (this.mode === "create") {
      this.departmentService.addDepartment(form.value.name, Number.parseInt(form.value.leaderId));
    }
    else {
      this.departmentService.updateDepartment(Number.parseInt(this.depID), form.value.name, Number.parseInt(form.value.leaderId));
    }
    form.resetForm();
  }

}
