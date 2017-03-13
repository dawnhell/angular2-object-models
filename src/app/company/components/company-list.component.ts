import {Component, OnInit} from "@angular/core";

import {Company} from "./company";
import {Boss} from "./boss";
import {Employee} from "./employee";
import {BossService} from "../services/boss.service";
import {EmployeeService} from "../services/employee.service";
import {CompanyService} from "../services/company.service";

@Component({
    selector: "company-list",
    templateUrl: "/app/company/templates/company-list.component.html",
    providers: [BossService, EmployeeService, CompanyService],
    styleUrls: ["app/company/styles/company-list.css"]
})

export class CompanyListComponent implements OnInit {
    company: Company = {
        id: 0,
        companyName: "",
        bossList: [],
        employeeList: []
    };
    bossList: Boss[];
    employeeList: Employee[];
    companyName: string;

    constructor(
        private _bossService: BossService,
        private _employeeService: EmployeeService,
        private _companyService: CompanyService
    ) {}

    ngOnInit() {
        this._bossService.getBossList()
            .subscribe(
                data => this.bossList = data,
                error => console.log(error),
                () => console.log("Boss list Get finished")
            );

        this._employeeService.getEmployeeList()
            .subscribe(
                data => this.employeeList = data,
                error => console.log(error),
                () => console.log("Employee list Get finished")
            );

    }

    onCreateCompany() {
        this.company.companyName = this.companyName;
        this.company.bossList = this.bossList.filter(temp => temp.selected);
        this.company.employeeList = this.employeeList.filter(temp => temp.selected);
        this._companyService.postCompanyList(this.company)
            .subscribe(
                data => console.log("Company has been created"),
                error => console.log(error),
                () => console.log("Company POST finished")
            );

        this.refreshList();
        this.companyName = "";
    }

    refreshList() {
        this._bossService.getBossList()
            .subscribe(
                data => this.bossList = data,
                error => console.log(error),
                () => console.log("Boss list Get finished")
            );

        this._employeeService.getEmployeeList()
            .subscribe(
                data => this.employeeList = data,
                error => console.log(error),
                () => console.log("Employee list Get finished")
            );
    }
}