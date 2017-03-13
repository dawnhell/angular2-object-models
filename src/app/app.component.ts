import {Component, OnInit} from "@angular/core";

@Component({
    selector: "my-app",
    templateUrl: "./app/app.html",
    styleUrls: ['./app/app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log("Application component initialized ...");
    }
}