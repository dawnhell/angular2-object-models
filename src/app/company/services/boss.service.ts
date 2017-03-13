import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {Boss} from "../components/boss";

@Injectable()
export class BossService {
    public _counter = 10;
    constructor(private _http: Http) {};

    getBossList(): Observable<Boss[]> {
        return this._http.get("/bossList")
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    createNewBoss(firstName, lastName, company, email) {
        let newBoss = {
            id: this._counter,
            firstName: firstName,
            lastName: lastName,
            company: company,
            email: email
        };
        this._counter = this._counter + 1;
        return newBoss;
    }

    postBossList(firstName: string, lastName: string, company: string, email: string): Observable<Boss[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(this.createNewBoss(firstName, lastName, company, email));

        return this._http.post("/addBoss", data, options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    deleteBoss(boss: Boss): Observable<Boss[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(boss);

        return this._http.post("/deleteBoss", data, options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    updateBoss(boss: Boss): Observable<Boss[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(boss);

        return this._http.post("/updateBoss", data, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}