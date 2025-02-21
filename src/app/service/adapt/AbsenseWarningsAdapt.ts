import { AbsenseWarningsInterface } from "@/data/types";

export default class AbsenseWarningsAdapt {
    externalAbsenseWarningsAdapt: AbsenseWarningsInterface;

    constructor(externalAbsenseWarningsAdapt: AbsenseWarningsInterface) {
        this.externalAbsenseWarningsAdapt = externalAbsenseWarningsAdapt;
    }

    adapt() {
        return this.externalAbsenseWarningsAdapt;
    }
}