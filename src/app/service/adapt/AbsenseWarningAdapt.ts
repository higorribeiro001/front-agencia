import { AbsenseWarningInterface } from "@/data/types";

export default class AbsenseWarningAdapt {
    externalAbsenseWarningAdapt: AbsenseWarningInterface;

    constructor(externalAbsenseWarningAdapt: AbsenseWarningInterface) {
        this.externalAbsenseWarningAdapt = externalAbsenseWarningAdapt;
    }

    adapt() {
        return this.externalAbsenseWarningAdapt;
    }
}