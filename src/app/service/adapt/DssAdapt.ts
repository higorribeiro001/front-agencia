import { DssInterface } from "@/data/types";

export default class DssAdapt {
    externalDssAdapt: DssInterface;

    constructor(externalDssAdapt: DssInterface) {
        this.externalDssAdapt = externalDssAdapt;
    }

    adapt() {
        return this.externalDssAdapt;
    }
}