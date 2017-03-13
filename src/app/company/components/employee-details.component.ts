import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {Employee} from "./employee";
import {EmployeeService} from "../services/employee.service";

@Component({
    selector: "employee-details",
    templateUrl: "/app/company/templates/employee-details.component.html",
    providers: [EmployeeService],
    styleUrls: ["app/company/styles/employee-details.css"]
})

export class EmployeeDetailsComponent implements OnInit {
    employeeDetailsForm: FormGroup;
    @Input() employeeList: Employee[];
    @Input() employeeDetails: Employee;

    constructor(private _formBuilder: FormBuilder,
                private _employeeService: EmployeeService) {}

    ngOnInit() {
        this.employeeDetailsForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'email': ['', Validators.required],
            'position': ['', Validators.required]
        });
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

    onUpdateEmployee() {
        let employee: Employee = this.employeeDetails;
        employee.firstName = this.employeeDetailsForm.value.firstName;
        employee.lastName = this.employeeDetailsForm.value.lastName;
        employee.email = this.employeeDetailsForm.value.email;
        employee.position = this.employeeDetailsForm.value.position;

        this._employeeService.updateEmployee(employee)
            .subscribe(
                data => this.updateEmployeeList(),
                error => console.log(error),
                () => console.log("Employee was updated!")
            );
    }
}