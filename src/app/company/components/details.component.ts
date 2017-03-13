import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Employee} from "./employee";
import {EmployeeService} from "../services/employee.service";

@Component({
    selector: "employee-details",
    templateUrl: "/app/company/templates/employee-details.component.html",
    styleUrls: ["app/company/styles/employee-details.css"],
    providers: [EmployeeService]
})

export class DetailsComponent implements OnInit {
    detailsForm: FormGroup;
    @Input() employeeList: Employee[];
    @Input() employeeDetails: Employee;

    constructor(private _formBuilder: FormBuilder,
                private _employeeService: EmployeeService) {}

    ngOnInit() {
        this.detailsForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'email': ['', Validators.required],
            'position': ['', Validators.required]
        });
    }

    getJson() {
        this._employeeService.getEmployeeList()
            .subscribe(
                data => this.employeeList = data,
                error => console.log(error),
                () => console.log("GET finished!")
            );
    }

    updateList() {
        this.getJson();
    }

    onUpdateEmployee() {
        let employee: Employee = this.employeeDetails;
        employee.firstName = this.detailsForm.value.firstName;
        employee.lastName = this.detailsForm.value.lastName;
        employee.email = this.detailsForm.value.email;
        employee.position = this.detailsForm.value.position;

        this._employeeService.updateEmployee(employee)
            .subscribe(
                data => this.updateList(),
                error => console.log(error),
                () => console.log("Element was updated!")
            );
    }
}