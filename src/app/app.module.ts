import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {ListComponent} from "./company/components/list.component";
import {BossListComponent} from "./company/components/boss-list.component";
import {BossDetailsComponent} from "./company/components/boss-details.component";
import {EmployeeListComponent} from "./company/components/employee-list.component";
import {EmployeeDetailsComponent} from "./company/components/employee-details.component";
import {CompanyListComponent} from "./company/components/company-list.component";
import {CompanyDetailsComponent} from "./company/components/company-details.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        ListComponent,
        BossListComponent,
        BossDetailsComponent,
        EmployeeListComponent,
        EmployeeDetailsComponent,
        CompanyListComponent,
        CompanyDetailsComponent
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}