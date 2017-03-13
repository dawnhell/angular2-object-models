import {Component, OnInit} from "@angular/core";

import {CompanyService} from "../services/company.service";
import {Company} from "./company";

@Component({
    selector: "company-details",
    templateUrl: "/app/company/templates/company-details.component.html",
    providers: [CompanyService],
    styleUrls: ["app/company/styles/company-details.css"]
})

export class CompanyDetailsComponent implements OnInit {
    companyList: Company[];
    isEmpty: boolean = true;

    constructor(private _companyService: CompanyService) {}

    ngOnInit() {
        this._companyService.getCompanyList()
            .subscribe(
                data => {
                    this.companyList = data;
                    if (data.length) {
                        this.isEmpty = false;
                    }
                },
                error => console.log(error),
                () => console.log("Company list Get finished")
            );
    }

    refreshList() {
        this._companyService.getCompanyList()
            .subscribe(
                data => {
                    this.companyList = data;
                    if (data.length) {
                        this.isEmpty = false;
                    }
                },
                error => console.log(error),
                () => console.log("Company list Get finished")
            );
    }
}