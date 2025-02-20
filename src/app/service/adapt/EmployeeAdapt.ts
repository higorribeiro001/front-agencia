import { EmployeeInterface } from "@/data/types";

export default class EmployeeAdapt {
    externalEmployeeAdapt: EmployeeInterface;

    constructor(externalEmployeeAdapt: EmployeeInterface) {
        this.externalEmployeeAdapt = externalEmployeeAdapt;
    }

    adapt() {
        return this.externalEmployeeAdapt;
    }
}