export default class LogisticAdapt {
    externalLogisticAdapt: LogisticInterface;

    constructor(externalLogisticAdapt: LogisticInterface) {
        this.externalLogisticAdapt = externalLogisticAdapt;
    }

    adapt() {
        return this.externalLogisticAdapt;
    }
}