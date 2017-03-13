import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Boss} from "./boss";
import {BossService} from "../services/boss.service";

@Component({
    selector: "boss-list",
    templateUrl: "/app/company/templates/boss-list.component.html",
    providers: [BossService],
    styleUrls: ["app/company/styles/boss-list.css"]
})

export class BossListComponent implements OnInit {
    bossList: Boss[];
    selectedBoss: Boss;
    public addBossForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _bossService: BossService) {}

    ngOnInit() {
        this.getBossJson();
        this.addBossForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required]
        });
    }

    onAddNewBoss(addForm: any) {
        this._bossService.postBossList(addForm.firstName, addForm.lastName, "", "")
            .subscribe(
                data => this.getBossJson(),
                error => console.log(error),
                () => console.log("Finished!")
            );
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

    onSelectBoss(boss: Boss) {
        this.selectedBoss = boss;
    }

    onDeleteBoss(boss: Boss) {
        this._bossService.deleteBoss(boss).subscribe(
            data => {
                this.updateBossList();
                if (this.selectedBoss === boss) {
                    this.selectedBoss.firstName = " ";
                    this.selectedBoss.lastName = " ";
                    this.selectedBoss.company = " ";
                    this.selectedBoss.email = " ";
                }
            },
            error => console.log(error),
            () => console.log("Boss was deleted!")
        );
    }
}