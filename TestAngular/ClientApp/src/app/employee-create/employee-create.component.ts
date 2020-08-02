import { Component, OnInit } from '@angular/core';
import { EmployeeDataModel, EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  private mode = "create";
  private empID: string;
  employee: EmployeeDataModel;
  title = "Create Employee";

  constructor(public employeeService: EmployeeService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("empID")) {
        this.mode = "edit";
        this.empID = paramMap.get("empID");
        this.employeeService.getEmployeeByID(this.empID).subscribe(employeeData => {
          this.employee = employeeData;
        });
        this.title = "Edit Employee";
      }
      else {
        this.mode = "create";
        this.empID = null;
      }
    });
  }

  onSaveEmployee(form: NgForm) {
    if (form.invalid) {
      alert("Form is invalid");
      return;
    }
    if (this.mode === "create") {
      this.employeeService.addEmployee(form.value.name, form.value.address, form.value.salary, form.value.createdDate);
    } else {
      this.employeeService.updateEmployee(Number.parseInt(this.empID), form.value.name, form.value.address, form.value.salary, form.value.createdDate);
    }
    form.resetForm();
  }

}
