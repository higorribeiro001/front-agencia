export default class ApplicationPhasesAdapt {
    externalApplicationPhasesAdapt: ApplicationPhasesInterface;

    constructor(externalApplicationPhasesAdapt: ApplicationPhasesInterface) {
        this.externalApplicationPhasesAdapt = externalApplicationPhasesAdapt;
    }

    adapt() {
        return this.externalApplicationPhasesAdapt;
    }
}