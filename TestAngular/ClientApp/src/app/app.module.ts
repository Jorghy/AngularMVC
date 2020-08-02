import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from '../Services/employee.service';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from '../Services/department.service';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EmployeeComponent,
    DepartmentComponent,
    EmployeeCreateComponent,
    DepartmentCreateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'employee-data', component: EmployeeComponent },
      { path: 'employee-data/create', component: EmployeeCreateComponent},
      { path: 'employee-data/create/:empID', component: EmployeeCreateComponent },
      { path: 'department-data', component: DepartmentComponent },
      { path: 'department-data/create', component: DepartmentCreateComponent },
      { path: 'department-data/create/:depID', component: DepartmentCreateComponent }
    ])
  ],
  providers: [EmployeeService, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
