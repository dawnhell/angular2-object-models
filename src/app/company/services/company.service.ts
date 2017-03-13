import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

import {Company} from "../components/company";

@Injectable()
export class CompanyService {
    public _counter = 1000;
    constructor(private _http: Http) {};

    getCompanyList(): Observable<Company[]> {
        return this._http.get("/companyList")
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    postCompanyList(company: Company): Observable<Company[]> {
        company.id = this._counter;
        this._counter = this._counter + 1;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(company);

        return this._http.post("/addCompany", data, options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }
}
