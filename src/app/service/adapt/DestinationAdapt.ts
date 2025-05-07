export default class DestinationAdapt {
    externalDestinationAdapt: DestinationInterface;

    constructor(externalDestinationAdapt: DestinationInterface) {
        this.externalDestinationAdapt = externalDestinationAdapt;
    }

    adapt() {
        return this.externalDestinationAdapt;
    }
}