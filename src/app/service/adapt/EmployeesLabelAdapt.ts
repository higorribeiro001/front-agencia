import { EmployeeLabelInterface } from "@/data/types";

export default class EmployeesLabelAdapt {
    externalEmployeesLabelAdapt: EmployeeLabelInterface[];

    constructor(externalEmployeesLabelAdapt: EmployeeLabelInterface[]) {
        this.externalEmployeesLabelAdapt = externalEmployeesLabelAdapt;
    }

    adapt() {
        return this.externalEmployeesLabelAdapt;
    }
}