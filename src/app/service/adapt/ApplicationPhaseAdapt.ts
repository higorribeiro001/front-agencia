export default class ApplicationPhaseAdapt {
    externalApplicationPhaseAdapt: ApplicationPhaseInterface;

    constructor(externalApplicationPhaseAdapt: ApplicationPhaseInterface) {
        this.externalApplicationPhaseAdapt = externalApplicationPhaseAdapt;
    }

    adapt() {
        return this.externalApplicationPhaseAdapt;
    }
}