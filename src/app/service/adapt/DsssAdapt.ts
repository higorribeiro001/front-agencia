import { DsssInterface } from "@/data/types";

export default class DsssAdapt {
    externalDsssAdapt: DsssInterface;

    constructor(externalDsssAdapt: DsssInterface) {
        this.externalDsssAdapt = externalDsssAdapt;
    }

    adapt() {
        return this.externalDsssAdapt;
    }
}