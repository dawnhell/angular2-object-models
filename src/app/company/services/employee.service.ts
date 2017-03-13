import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";
import {Employee} from "../components/employee";

@Injectable()
export  class EmployeeService {
    public _counter = 100;
    constructor(private _http: Http) {};

    getEmployeeList(): Observable<Employee[]> {
        return this._http.get("/employeeList")
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    createNewEmployee(firstName, lastName, email, position) {
        let newEmployee = {
            id: this._counter,
            firstName: firstName,
            lastName: lastName,
            email: email,
            position: position
        };
        this._counter = this._counter + 1;
        return newEmployee;
    }

    postEmployeeList(firstName: string, lastName: string, email: string, position: string): Observable<Employee[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(this.createNewEmployee(firstName, lastName, email, position));

        return this._http.post("/addEmployee", data, options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    deleteEmployee(employee: Employee): Observable<Employee[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(employee);

        return this._http.post("/deleteEmployee", data, options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    updateEmployee(employee: Employee): Observable<Employee[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(employee);

        return this._http.post("/updateEmployee", data, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}