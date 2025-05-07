export default class EarringsAdapt {
    externalEarringsAdapt: EarringsInterface;

    constructor(externalEarringsAdapt: EarringsInterface) {
        this.externalEarringsAdapt = externalEarringsAdapt;
    }

    adapt() {
        return this.externalEarringsAdapt;
    }
}