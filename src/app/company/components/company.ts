import {Boss} from "./boss";
import {Employee} from "./employee";

export class Company {
    constructor(
        public id: number,
        public companyName: string,
        public bossList: Boss[],
        public employeeList: Employee[]
    ) {}
}