export default class DestinationsAdapt {
    externalDestinationsAdapt: DestinationsInterface;

    constructor(externalDestinationsAdapt: DestinationsInterface) {
        this.externalDestinationsAdapt = externalDestinationsAdapt;
    }

    adapt() {
        return this.externalDestinationsAdapt;
    }
}