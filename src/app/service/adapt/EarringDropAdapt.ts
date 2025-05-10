export default class EarringDropAdapt {
    externalEarringDropAdapt: EarringDropInterface;

    constructor(externalEarringDropAdapt: EarringDropInterface) {
        this.externalEarringDropAdapt = externalEarringDropAdapt;
    }

    adapt() {
        return this.externalEarringDropAdapt;
    }
}