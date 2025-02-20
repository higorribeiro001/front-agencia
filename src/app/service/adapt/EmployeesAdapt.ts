import { EmployeesInterface } from "@/data/types";

export default class EmployeesAdapt {
    externalEmployeesAdapt: EmployeesInterface;

    constructor(externalEmployeesAdapt: EmployeesInterface) {
        this.externalEmployeesAdapt = externalEmployeesAdapt;
    }

    adapt() {
        return this.externalEmployeesAdapt;
    }
}