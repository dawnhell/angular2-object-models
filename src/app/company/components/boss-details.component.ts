import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {BossService} from "../services/boss.service";
import {Boss} from "./boss";

@Component({
    selector: "boss-details",
    templateUrl: "/app/company/templates/boss-details.component.html",
    providers: [BossService],
    styleUrls: ["app/company/styles/boss-details.css"]
})

export class BossDetailsComponent implements OnInit {
    bossDetailsForm: FormGroup;
    @Input() bossList: Boss[];
    @Input() bossDetails: Boss;

    constructor(private _formBuilder: FormBuilder,
                private _bossService: BossService) {}

    ngOnInit() {
        this.bossDetailsForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'company': ['', Validators.required],
            'email': ['', Validators.required]
        });
    }

    getBossJson() {
        this._bossService.getBossList()
            .subscribe(
                data => this.bossList = data,
                error => console.log(error),
                () => console.log("Boss GET finished!")
            );
    }

    updateBossList() {
        this.getBossJson();
    }

    onUpdateBoss() {
        let boss: Boss = this.bossDetails;
        boss.firstName = this.bossDetailsForm.value.firstName;
        boss.lastName = this.bossDetailsForm.value.lastName;
        boss.company = this.bossDetailsForm.value.company;
        boss.email = this.bossDetailsForm.value.email;

        this._bossService.updateBoss(boss)
            .subscribe(
                data => this.updateBossList(),
                error => console.log(error),
                () => console.log("Boss was updated!")
            );
    }
}