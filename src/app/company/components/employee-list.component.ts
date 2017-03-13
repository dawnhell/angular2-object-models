import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Employee} from "./employee";
import {EmployeeService} from "../services/employee.service";

@Component({
    selector: "employee-list",
    templateUrl: "/app/company/templates/employee-list.component.html",
    providers: [EmployeeService],
    styleUrls: ["app/company/styles/employee-list.css"]
})

export class EmployeeListComponent implements OnInit {
    employeeList: Employee[];
    selectedEmployee: Employee;
    public addNewForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _employeeService: EmployeeService) {};

    ngOnInit() {
        this.getEmployeeJson();
        this.addNewForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required]
        });
    }

    onAddNewEmployee(addForm: any) {
        this._employeeService.postEmployeeList(addForm.firstName, addForm.lastName, "", "")
            .subscribe(
                data => this.getEmployeeJson(),
                error => console.log(error),
                () => console.log("Finished!")
            );
    }

    getEmployeeJson() {
        this._employeeService.getEmployeeList()
            .subscribe(
                data => this.employeeList = data,
                error => console.log(error),
                () => console.log("Employee GET finished!")
            );
    }

    updateEmployeeList() {
        this.getEmployeeJson();
    }

    onSelectEmployee(employee: Employee) {
        this.selectedEmployee = employee;
    }

    onDeleteEmployee(employee: Employee) {
        this._employeeService.deleteEmployee(employee).subscribe(
            data => {
                this.updateEmployeeList();
                if (this.selectedEmployee === employee) {
                    this.selectedEmployee.firstName = " ";
                    this.selectedEmployee.lastName = " ";
                    this.selectedEmployee.email = " ";
                    this.selectedEmployee.position = " ";
                }
            },
            error => console.log(error),
            () => console.log("Employee was deleted!")
        );
    }
}